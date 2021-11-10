<script>
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { formatCurrencyBRL, formatDate } from '@/utils/formatters'
import PaymentForm from './PaymentForm'

export default {
  components: {
    PaymentForm
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
    modalId: {
      type: String,
      required: true
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
      formatDate,
      icons: {
        faDollarSign
      }
    }
  },
  methods: {
    submitted () {
      this.$emit('refresh')
      this.$emit('close-modal')
    }
  }
}
</script>

<template>
  <AppModal
    :id="modalId"
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
        <b>{{ formatDate(payment.date) }}</b>
      </div>
      <PaymentForm
        :is-edit="isEdit"
        :payment="payment"
        :total-owing="totalOwing"
        @submitted="submitted"
      />
    </template>
  </AppModal>
</template>
