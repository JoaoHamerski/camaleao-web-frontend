<script>
import PaymentConfirmErrorModal from '@/views/resources/payments/PaymentConfirmErrorModal.vue'
import TheDailyCashBodyTable from './TheDailyCashBodyTable.vue'
import TheDailyCashBodyDate from './TheDailyCashBodyDate.vue'
import ModalPaymentForm from '@/views/resources/payments/ModalPaymentForm.vue'
import ModalShowPaymentVouchers from './partials/ModalShowPaymentVouchers.vue'

export default {
  components: {
    TheDailyCashBodyTable,
    TheDailyCashBodyDate,
    PaymentConfirmErrorModal,
    ModalPaymentForm,
    ModalShowPaymentVouchers
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
      },
      modalPaymentVouchers: {
        value: false,
        payment: null
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
    },
    onShowPaymentVouchers (item) {
      this.modalPaymentVouchers.value = true
      this.modalPaymentVouchers.payment = item
    }
  }
}
</script>

<template>
  <div>
    <PaymentConfirmErrorModal
      v-model="modalError.value"
      :payment="modalError.payment"
    />

    <ModalPaymentForm
      v-model="modalEdit.value"
      :payment="modalEdit.payment"
      :order="modalEdit.payment.order"
      :is-edit="true"
      @success="onPaymentSuccess"
      @hidden="onModalEditHidden"
    />

    <ModalShowPaymentVouchers
      v-model="modalPaymentVouchers.value"
      :payment="modalPaymentVouchers.payment"
    />

    <TheDailyCashBodyDate :date="date" />

    <hr class="bg-secondary">

    <TheDailyCashBodyTable
      :items="payments"
      @payment-success="onDailyPaymentSuccess"
      @payment-error="onDailyPaymentError"
      @payment-edit="onDailyPaymentEdit"
      @show-payment-voucher="onShowPaymentVouchers"
    />
  </div>
</template>
