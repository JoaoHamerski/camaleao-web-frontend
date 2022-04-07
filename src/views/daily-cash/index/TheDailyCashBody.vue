<script>
import PaymentConfirmErrorModal from '@/views/resources/payments/PaymentConfirmErrorModal.vue'
import TheDailyCashBodyTable from './TheDailyCashBodyTable.vue'
import TheDailyCashBodyDate from './TheDailyCashBodyDate.vue'
import ModalPaymentForm from '@/views/resources/payments/ModalPaymentForm.vue'

export default {
  components: {
    TheDailyCashBodyTable,
    TheDailyCashBodyDate,
    PaymentConfirmErrorModal,
    ModalPaymentForm
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
