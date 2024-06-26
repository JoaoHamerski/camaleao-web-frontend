<script>
import * as accounting from 'accounting-js'
import { GetVias } from '@/graphql/Via.gql'
import { CreatePayment, UpdatePayment } from '@/graphql/Payment.gql'
import { GetEntries } from '@/graphql/Entry.gql'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { isEmpty } from 'lodash-es'
import Form from '@/utils/Form'
import { formatDatetime, formatCurrencyBRL } from '@/utils/formatters'
import { maskCurrencyBRL, maskDate } from '@/utils/masks'
import { handleError, handleSuccess } from '@/utils/forms'

import SelectClientsFind from '@/views/resources/SelectClientsFind.vue'
import SelectEntriesFind from '@/views/resources/SelectEntriesFind.vue'

export default {
  components: {
    SelectClientsFind,
    SelectEntriesFind
  },
  apollo: {
    vias: {
      query: GetVias
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
      icons: {
        faQuestionCircle
      },
      vias: [],
      clients: {
        items: [],
        isLoading: false
      },
      bank_entry: '',
      form: new Form({
        bank_uid: '',
        value: 'R$ ',
        credit: 'R$ ',
        bonus: 'R$ ',
        date: '',
        payment_via_id: '',
        note: '',
        sponsorship_client_id: '',
        is_sponsor: false,
        is_shipping: false,
        add_rest_to_credits: false,
        use_client_balance: false,
        use_client_bonus: false,
      }),
      maskCurrencyBRL: maskCurrencyBRL({numeralPositiveOnly: true}),
      maskDate,
      isLoading: false
    }
  },
  computed: {
    paymentMatchesBankEntry () {
      if (!this.isEdit) {
        return true
      }

      if (isEmpty(this.bank_entry)) {
        return true
      }

      return +this.payment.value === +this.bank_entry.value
    },
    isLoadingQuery () {
      return !!this.$apollo.queries.vias.loading
    },
    isFromBankEntry () {
      return !isEmpty(this.bank_entry)
    },
    orderRest () {
      const credit = accounting.unformat(this.form.credit, ',')
      return (this.order.total_owing - credit).toFixed(2)
    },
    showEntriesInput () {
      if (!this.isEdit) {
        return true
      }

      return this.payment.is_confirmed === null
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
    formatCurrencyBRL,
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
      this.form.value = this.$helpers.toBRL(this.orderRest)
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
          },
          refetchQueries: [GetEntries],
          awaitRefetchQueries: true
        })

        this.bank_entry = ''

        this.$helpers.clearCacheFrom([
          { fieldName: 'clientBalances' },
          { fieldName: 'entries' },
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
          },
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
    },
    onSelectEntry (entry) {
      if (this.isEdit) {
        this.form.set({
          bank_uid: entry.bank_uid,
          payment_via_id: entry.via_id,
          note: entry.description
        })

        return
      }

      this.form.set({
        bank_uid: entry.bank_uid,
        value: formatCurrencyBRL(entry.value),
        date: entry.date,
        note: entry.description,
        payment_via_id: entry.via_id
      })
    },
    onIsShippingPaymentCheckbox () {
      this.form.add_rest_to_credits = false
    },
    onIsSponsorValueChange () {
      this.form.use_client_balance = false
      this.form.use_client_bonus = false
    },
    onUseBalanceChange (value) {
      if (value) {
        this.form.add_rest_to_credits = false
        this.form.is_sponsor = false
      }
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

    <AppAlert
      v-if="form.errors.get('bank_uid')"
      color="warning"
      small
    >
      {{ form.errors.get('bank_uid') }}
    </AppAlert>

    <SelectEntriesFind
      v-if="showEntriesInput"
      v-model="bank_entry"
      @select="onSelectEntry"
    />

    <div
      v-if="!paymentMatchesBankEntry"
      class="small text-danger mb-4"
    >
      O valor da entrada bancária e pagamento devem ser iguais.
    </div>

    <template v-if="!isEdit">
      <AppContainer class="mb-2">
        <template #title>
          Valor de pagamento
        </template>
        <template #body>
          <template v-if="!form.is_sponsor">
            <AppCheckbox
              v-if="order.client.balance && !bank_entry"
              id="clientCredit"
              v-model="form.use_client_balance"
              name="clientCredit"
              :disabled="form.use_client_bonus"
              @input="onUseBalanceChange"
            >
              Usar saldo do cliente
            </AppCheckbox>
            <AppCheckbox
              v-if="order.client.bonus > 0 && !bank_entry"
              id="clientBonus"
              v-model="form.use_client_bonus"
              name="clientBonus"
              :disabled="form.use_client_balance"
              @input="onUseBalanceChange"
            >
              Usar bônus do cliente
            </AppCheckbox>
          </template>
          <AppInput
            v-if="form.use_client_balance && !bank_entry"
            id="credit"
            key="credit"
            v-model="form.credit"
            name="credit"
            :error="form.errors.get('credit')"
            :mask="maskCurrencyBRL"
            numeric
            :disabled="isFromBankEntry"
          >
            <template #hint>
              <template v-if="!form.is_sponsor">
                Disponível: {{ $helpers.toBRL(order.client.balance) }}
              </template>
              <template v-else-if="!form.sponsorship_client_id">
                Disponível: [selecione o patrocinador]
              </template>
              <template v-else>
                Disponível: <span v-if="form.sponsorship_client_id">
                  {{ $helpers.toBRL(form.sponsorship_client_id.balance) }}
                </span>
              </template>
            </template>
            Valor a ser usado
          </AppInput>

          <AppInput
            v-if="form.use_client_bonus && !bank_entry"
            id="bonus"
            key="bonus"
            v-model="form.bonus"
            name="bonus"
            :error="form.errors.get('bonus')"
            :mask="maskCurrencyBRL"
            numeric
            :disabled="isFromBankEntry"
          >
            <template #hint>
              <template v-if="!form.is_sponsor">
                Disponível: {{ $helpers.toBRL(order.client.bonus) }}
              </template>
              <template v-else-if="!form.sponsorship_client_id">
                Disponível: [selecione o patrocinador]
              </template>
              <template v-else>
                Disponível: <span v-if="form.sponsorship_client_id">
                  {{ $helpers.toBRL(form.sponsorship_client_id.bonus) }}
                </span>
              </template>
            </template>
            Valor a ser usado
          </AppInput>

          <AppInput
            v-if="!form.use_client_balance && !form.use_client_bonus"
            id="value"
            key="value"
            v-model="form.value"
            name="value"
            :error="form.errors.get('value')"
            :mask="maskCurrencyBRL"
            numeric
            :disabled="isFromBankEntry"
          >
            Valor
            <template #append>
              <AppButton
                :disabled="isFromBankEntry"
                outlined
                :tooltip="$helpers.toBRL(orderRest)"
                @click.prevent="onPayRestClick"
              >
                Restante
              </AppButton>
            </template>
          </AppInput>
          <div class="d-flex align-items-center mb-3">
            <AppCheckbox
              id="rest"
              v-model="form.add_rest_to_credits"
              name="rest"
              :disabled="form.is_shipping || form.use_client_bonus || form.use_client_balance"
              :default-margin="false"
            >
              Adicionar resto ao saldo do {{ form.is_sponsor ? 'patrocinador' : 'cliente' }}
            </AppCheckbox>
            <FontAwesomeIcon
              v-tippy
              class="text-secondary ms-2"
              :icon="icons.faQuestionCircle"
              content="Caso o valor supere o que resta pagar"
            />
          </div>
          <AppCheckbox
            id="is_sponsor"
            v-model="form.is_sponsor"
            :disabled="form.use_client_bonus || form.use_client_balance"
            name="is_sponsor"
            @input="onIsSponsorValueChange"
          >
            Patrocínio
          </AppCheckbox>
          <div class="d-flex align-items-center mb-3">
            <AppCheckbox
              id="shipping_payment"
              v-model="form.is_shipping"
              name="shipping_payment"
              :default-margin="false"
              @input="onIsShippingPaymentCheckbox"
            >
              Adicionar como frete
            </AppCheckbox>
            <FontAwesomeIcon
              v-tippy
              class="text-secondary ms-2"
              :icon="icons.faQuestionCircle"
              content="O valor será somado ao preço final do pedido"
            />
          </div>
          <SelectClientsFind
            v-show="form.is_sponsor"
            id="sponsorship_client_id"
            v-model="form.sponsorship_client_id"
            :error="form.errors.get('sponsorship_client_id')"
          >
            Cliente patrocinador
          </SelectClientsFind>
        </template>
      </AppContainer>
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
      :disabled-message="form.is_sponsor ? 'Não é necessário informar a data em patrocínios' : false"
      :disabled="isFromBankEntry"
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
          :disabled="!paymentMatchesBankEntry"
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
