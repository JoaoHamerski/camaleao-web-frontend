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
    DailyCashBalance: () => import('../partials/DailyCashBalance.vue'),
    PendenciesOnMonthOrdersModal: () => import('../partials/PendenciesOnMonthOrdersModal.vue'),
    DailyCashDetailedFlow: () => import('../partials/DailyCashDetailedFlow.vue')
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
  data () {
    return {
      roles,
      headers,
      modalError: {
        value: false,
        payment: {}
      },
      modalEdit:  {
        value: false,
        item: null
      },
      modalPaymentVouchers: {
        value: false,
        payment: null
      },
      modalPendencyOrders: {
        value: false,
        month: 'current'
      }
    }
  },
  methods: {
    onDailyPaymentError (payment) {
      this.modalError.payment = payment
      this.modalError.value = true
    },
    onOpenPendencyOrders ({ month }) {
      this.modalPendencyOrders.value = true
      this.modalPendencyOrders.month = month
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

    <PendenciesOnMonthOrdersModal
      v-if="$helpers.canView(roles.GERENCIA)"
      v-model="modalPendencyOrders.value"
      :month="modalPendencyOrders.month"
    />

    <DailyCashBalance
      v-if="$helpers.canView(roles.GERENCIA)"
      class="mt-3 mb-5"
      @open-pendency-orders="onOpenPendencyOrders"
    />

    <DailyCashDetailedFlow v-if="$helpers.canView(roles.GERENCIA)" />

    <TheDailyCashBodyDate :date="date" />

    <hr class="bg-secondary">

    <PaymentExpenseTable
      :items="entries"
      :headers="headers"
    />
  </div>
</template>
