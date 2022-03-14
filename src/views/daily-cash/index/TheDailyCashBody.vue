<script>

import DailyPaymentConfirmationErrorModal from './partials/DailyPaymentConfirmationErrorModal'
import TheDailyCashBodyTable from './TheDailyCashBodyTable'
import TheDailyCashBodyDate from './TheDailyCashBodyDate'

export default {
  components: {
    TheDailyCashBodyTable,
    TheDailyCashBodyDate,
    DailyPaymentConfirmationErrorModal
  },
  props: {
    payments: {
      type: Array,
      default: () => ([])
    },
    date: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      modalError: {
        value: false,
        payment: ({})
      }
    }
  },
  methods: {
    onDailyPaymentSuccess () {
      this.$emit('daily-payment-success')
    },
    onDailyPaymentError (payment) {
      this.modalError.payment = payment
      this.modalError.value = true
    }
  }
}
</script>

<template>
  <div>
    <DailyPaymentConfirmationErrorModal
      v-model="modalError.value"
      :payment="modalError.payment"
    />

    <TheDailyCashBodyDate :date="date" />

    <hr class="bg-secondary">

    <TheDailyCashBodyTable
      :items="payments"
      @payment-success="onDailyPaymentSuccess"
      @payment-error="onDailyPaymentError"
    />
  </div>
</template>
