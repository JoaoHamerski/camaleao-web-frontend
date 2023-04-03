<script>
import roles from '@/constants/roles'

import PaymentConfirmErrorModal from '@/views/resources/payments/PaymentConfirmErrorModal.vue'
import PaymentExpenseTable, { headers } from '@/views/resources/payments-expenses/PaymentExpenseTable.vue'
import TheDailyCashBodyDate from './TheDailyCashBodyDate.vue'


export default {
  components: {
    PaymentExpenseTable,
    TheDailyCashBodyDate,
    PaymentConfirmErrorModal,
    DailyCashBalance: () => import('../partials/daily-cash-balance/DailyCashBalance.vue'),
    PendenciesOfMonthOrdersModal: () => import('../partials/daily-cash-pendencies/PendenciesOfMonthOrdersModal.vue'),
    DailyCashDetailedFlow: () => import('../partials/daily-cash-detailed-flow/DailyCashDetailedFlow.vue')
  },
  props: {
    entries: {
      type: Array,
      default: () => ([])
    },
    date: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      roles,
      headers,
      modalError: {
        value: false,
        payment: {}
      },
      modalEdit: {
        value: false,
        item: null
      },
      modalPaymentVouchers: {
        value: false,
        payment: null
      },
      modalPendencyOrders: {
        value: false,
        date: ''
      }
    }
  },
  methods: {
    onDailyPaymentError(payment) {
      this.modalError.payment = payment
      this.modalError.value = true
    },
    onOpenPendencyOrders(date) {
      this.modalPendencyOrders.value = true
      this.modalPendencyOrders.date = date
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

    <PendenciesOfMonthOrdersModal
      v-model="modalPendencyOrders.value"
      :date="modalPendencyOrders.date"
    />

    <DailyCashBalance
      v-if="$helpers.canView(roles.GERENCIA)"
      class="mt-3 mb-5"
      @open-pendency-orders="onOpenPendencyOrders"
    />

    <DailyCashDetailedFlow
      v-if="$helpers.canView(roles.GERENCIA)"
      @open-pendency-orders="onOpenPendencyOrders"
    />

    <TheDailyCashBodyDate
      :date="date"
      class="pt-5"
    />

    <hr class="bg-secondary">

    <PaymentExpenseTable
      :items="entries"
      :headers="headers"
    />
  </div>
</template>
