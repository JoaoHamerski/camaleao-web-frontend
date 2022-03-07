<script>
import { vias } from '@/graphql/Via.gql'
import { order } from '@/graphql/Order.gql'
import { cashFlowEntries } from '@/graphql/CashFlow.gql'
import { paymentCreate, paymentUpdate } from '@/graphql/Payment.gql'

import { orderQueryVariables } from '../show/TheOrder'

import Form from '@/utils/Form'
import { maskCurrencyBRL, maskDate } from '@/utils/masks'
import { handleError, handleSuccess } from '@/utils/forms'

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
      form: new Form({
        value: 'R$ ',
        date: '',
        payment_via_id: '',
        note: ''
      }),
      maskCurrencyBRL: maskCurrencyBRL(),
      maskDate,
      isLoading: false
    }
  },
  computed: {
    clientKey () {
      return this.$route.params.clientKey
    },
    orderKey () {
      return this.$route.params.orderKey
    },
    paymentKey () {
      return this.payment?.id
    }
  },
  watch: {
    payment (payment) {
      if (!payment) {
        this.form.payment_via_id = ''
        this.form.note = ''

        return
      }

      this.form.payment_via_id = payment.via.id
      this.form.note = payment.note
    }
  },
  methods: {
    payRest () {
      this.form.value = this.$helpers.toBRL(this.order.total_owing)
    },
    async store () {
      try {
        await this.$apollo.mutate({
          mutation: paymentCreate,
          variables: {
            input: {
              order_id: this.order.id,
              ...this.form.data()
            }
          },
          refetchQueries: [
            { query: order, variables: orderQueryVariables(this) },
            { query: cashFlowEntries, variables: { page: 1, first: 10, where: {} } }
          ]
        })

        handleSuccess(this, { message: 'Pagamento registrado!', resetForm: true })
      } catch (error) {
        handleError(this, error)
      }
    },
    async update () {
      try {
        await this.$apollo.mutate({
          mutation: paymentUpdate,
          variables: {
            id: this.payment.id,
            input: {
              order_id: this.order.id,
              ...this.form.data()
            }
          },
          refetchQueries: [
            { query: order, variables: orderQueryVariables(this) }
          ]
        })

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
        await this.store()
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
  >
    <template v-if="!isEdit">
      <AppInput
        id="value"
        v-model="form.value"
        name="value"
        :error="form.errors.get('value')"
        :mask="maskCurrencyBRL"
      >
        Valor

        <template #append>
          <AppButton
            outlined
            :tooltip="$helpers.toBRL(order.total_owing)"
            @click.prevent="payRest"
          >
            Restante
          </AppButton>
        </template>
      </AppInput>

      <AppInput
        id="date"
        v-model="form.date"
        placeholder="dd/mm/aaaa"
        name="date"
        type="date"
        today-button
        :mask="maskDate"
        :error="form.errors.get('date')"
      >
        Data de pagamento
      </AppInput>
    </template>

    <AppSimpleSelect
      id="payment_via_id"
      v-model="form.payment_via_id"
      name="payment_via_id"
      :options="vias"
      label-prop="name"
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
