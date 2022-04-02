<script>

import DailyPaymentConfirmationErrorModal from './partials/DailyPaymentConfirmationErrorModal'
import TheDailyCashBodyTable from './TheDailyCashBodyTable'
import TheDailyCashBodyDate from './TheDailyCashBodyDate'
import ModalPaymentEdit from '@/views/orders/partials/ModalOrderPayment.vue'

export default {
  components: {
    TheDailyCashBodyTable,
    TheDailyCashBodyDate,
    DailyPaymentConfirmationErrorModal,
    ModalPaymentEdit
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
        payment: {}
      },
      modalEdit:  {
        value: false,
        payment: {}
      }
    }
  },
  methods: {
    onDailyPaymentSuccess () {
      this.$emit('daily-payment-success')
    },
    onDailyPaymentEdit (payment) {
      this.modalEdit.payment = payment
      this.modalEdit.value = true
    },
    onDailyPaymentError (payment) {
      this.modalError.payment = payment
      this.modalError.value = true
    },
    onPaymentSuccess () {
      this.modalEdit.payment = {}
      this.modalEdit.value = false
    },
    onModalEditHidden () {
      this.modalEdit.payment = {}
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

    <ModalPaymentEdit
      v-model="modalEdit.value"
      :payment="modalEdit.payment"
      :order="modalEdit.payment.order"
      :is-edit="true"
      @success="onPaymentSuccess"
      @hidden="onModalEditHidden"
    />

    <TheDailyCashBodyDate :date="date" />

    <hr class="bg-secondary">

    <TheDailyCashBodyTable
      :items="payments"
      @payment-success="onDailyPaymentSuccess"
      @payment-error="onDailyPaymentError"
      @payment-edit="onDailyPaymentEdit"
    />
  </div>
</template>
