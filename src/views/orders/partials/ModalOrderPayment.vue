<script>
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { formatCurrencyBRL, formatDatetime } from '@/utils/formatters'
import OrderPaymentForm from './OrderPaymentForm'

export default {
  components: {
    OrderPaymentForm
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    totalOwing: {
      type: [String, Number],
      default: ''
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    payment: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      formatCurrencyBRL,
      formatDatetime,
      icons: {
        faDollarSign
      }
    }
  },
  methods: {
    onSuccess () {
      this.$emit('success')
    }
  }
}
</script>

<template>
  <AppModal
    id="paymentModal"
    color="success"
    :value="value"
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faDollarSign"
        class="me-2"
      />{{ isEdit ? 'Alterar pagamento' : 'Novo pagamento' }}
    </template>

    <template #body>
      <div
        v-if="payment"
        class="text-center my-3"
      >
        Pagamento de
        <b>{{ formatCurrencyBRL(payment.value) }}</b>
        em
        <b>{{ formatDatetime(payment.date) }}</b>
      </div>
      <OrderPaymentForm
        :is-edit="isEdit"
        :payment="payment"
        :total-owing="totalOwing"
        @success="onSuccess"
      />
    </template>
  </AppModal>
</template>
