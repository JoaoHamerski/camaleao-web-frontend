<script>
import { GetClientsForForm } from '@/graphql/Resources.gql'
import { vias } from '@/graphql/Via.gql'
import { CreatePayment, UpdatePayment } from '@/graphql/Payment.gql'

import Form from '@/utils/Form'
import { formatDatetime, formatPhone } from '@/utils/formatters'
import { maskCurrencyBRL, maskDate } from '@/utils/masks'
import { handleError, handleSuccess } from '@/utils/forms'
import{ isNumeric } from '@/utils/helpers'

const whereClientsClause = (query) => {
  if (query.startsWith('(')) {
    return {
      column: 'PHONE',
      operator: 'LIKE',
      value: `${stripNonDigits(query)}%`
    }
  }

  if (isNumeric(query)) {
    return {
      column: 'PHONE',
      operator: 'LIKE',
      value: `%${query}%`
    }
  }

  return {
    column: 'NAME',
    operator: 'LIKE',
    value: `%${query}%`
  }
}

export default {
  apollo: {
    vias: {
      query: vias
    }
  },
  props: {
    order: {
      type: Object,
      default: () => {}
    },
    payment: {
      type: Object,
      default: () => {}
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      vias: [],
      clients: {
        items: [],
        isLoading: false
      },
      form: new Form({
        value: 'R$ ',
        date: '',
        payment_via_id: '',
        note: '',
        sponsorship_client_id: '',
        is_sponsor: false,
      }),
      maskCurrencyBRL: maskCurrencyBRL(),
      maskDate,
      isLoading: false
    }
  },
  computed: {
    isLoadingQuery () {
      return !!this.$apollo.queries.vias.loading
    }
  },
  watch: {
    vias: {
      handler(vias) {
        if (vias.length) {
          this.$nextTick(() => {
            this.populateForm()
          })
        }
      },
      immediate: true
    }
  },
  activated () {
    if (this.vias.length) {
      this.populateForm()
    }
  },
  methods: {
    customLabelClients ({ name, phone }) {
      return `${name} ${phone ? ' - ' + formatPhone(phone) : ''}`
    },
    async asyncFindClients (query) {
      if (!query.length) {
        this.clients.items = []
        return
      }

      this.clients.isLoading = true

      const { data: { clients: { data } } } = await this.$apollo.query({
        query: GetClientsForForm,
        variables: {
          where: whereClientsClause(query),
          page: 1
        }
      })

      this.clients.isLoading = false
      this.clients.items = data
    },
    populateForm () {
      if (!this.payment) {
        this.form.payment_via_id = ''
        this.form.note = ''

        return
      }

      this.form.set({
        payment_via_id: this.payment.via.id,
        note: this.payment.note,
        date: formatDatetime(this.payment.date)
      })
    },
    onPayRestClick () {
      this.form.value = this.$helpers.toBRL(this.order.total_owing)
    },
    getFormattedForm () {
      const form = this.form.data()

      form.sponsorship_client_id = form.sponsorship_client_id?.id || ''

      return form
    },
    async create () {
      const data = this.getFormattedForm()

      try {
        await this.$apollo.mutate({
          mutation: CreatePayment,
          variables: {
            input: {
              order_id: this.order.id,
              ...data
            }
          }
        })

        this.$helpers.clearCacheFrom([
          { fieldName: 'payments' },
          { fieldName: 'cashFlowEntries' }
        ])

        handleSuccess(this, { message: 'Pagamento registrado!', resetForm: true })
      } catch (error) {
        handleError(this, error)
      }
    },
    async update () {
      const data = this.getFormattedForm()

      try {
        await this.$apollo.mutate({
          mutation: UpdatePayment,
          variables: {
            id: this.payment.id,
            input: {
              order_id: this.order.id,
              ...data
            }
          }
        })

        this.$helpers.clearCacheFrom({fieldName: 'dailyCash'})

        handleSuccess(this, { message: 'Pagamento atualizado!' })
      } catch (error) {
        handleError(this, error)
      }
    },
    async onSubmit () {
      this.isLoading = true

      if (this.isEdit) {
        await this.update()
      } else {
        await this.create()
      }

      this.isLoading = false
    }
  }
}
</script>

<template>
  <AppForm
    :on-submit="onSubmit"
    :form="form"
    class="position-relative"
  >
    <AppLoading v-show="isLoadingQuery" />

    <template v-if="!isEdit">
      <AppInput
        id="value"
        v-model="form.value"
        name="value"
        :error="form.errors.get('value')"
        :mask="maskCurrencyBRL"
        numeric
      >
        Valor

        <template #append>
          <AppButton
            outlined
            :tooltip="$helpers.toBRL(order.total_owing)"
            @click.prevent="onPayRestClick"
          >
            Restante
          </AppButton>
        </template>
      </AppInput>
      <AppCheckbox
        id="is_sponsor"
        v-model="form.is_sponsor"
        name="is_sponsor"
      >
        Patrocínio
      </AppCheckbox>
      <AppSelect
        v-show="form.is_sponsor"
        id="sponsorship_client_id"
        v-model="form.sponsorship_client_id"
        name="sponsorship_client_id"
        :options="clients.items"
        placeholder="Procure por nome ou telefone"
        :error="form.errors.get('sponsorship_client_id')"
        :custom-label="customLabelClients"
        :searchable="true"
        :internal-search="false"
        :loading="clients.isLoading"
        @open="form.errors.clear('sponsorship_client_id')"
        @search-change="asyncFindClients"
      >
        Cliente patrocinador
      </AppSelect>
    </template>

    <AppInput
      id="date"
      v-model="form.date"
      placeholder="dd/mm/aaaa"
      name="date"
      type="date"
      numeric
      today-button
      :mask="maskDate"
      :error="form.errors.get('date')"
    >
      Data de pagamento
    </AppInput>

    <AppSimpleSelect
      id="payment_via_id"
      v-model="form.payment_via_id"
      name="payment_via_id"
      :options="vias"
      label-prop="name"
      value-prop="id"
      :error="form.errors.get('payment_via_id')"
    >
      Via
    </AppSimpleSelect>

    <AppInput
      id="note"
      v-model="form.note"
      name="note"
      placeholder="Anotação extra do pagamento..."
      :error="form.errors.get('note')"
    >
      Observação
    </AppInput>

    <div class="row mt-4">
      <div class="col">
        <AppButton
          type="submit"
          color="success"
          class="fw-bold"
          block
          :loading="isLoading"
        >
          {{ isEdit ? 'ATUALIZAR' : 'REGISTRAR' }}
        </AppButton>
      </div>

      <div class="col">
        <AppButton
          type="button"
          color="light"
          block
          data-bs-dismiss="modal"
        >
          Cancelar
        </AppButton>
      </div>
    </div>
  </AppForm>
</template>
