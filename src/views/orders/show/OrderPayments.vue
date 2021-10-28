<script>
import { formatDate } from '@/utils/formatters'

const PAYMENT_STATE = {
  null: 'PENDENTE',
  0: 'RECUSADO'
}

export default {
  props: {
    payments: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    formatDate,
    getPaymentState (payment) {
      return PAYMENT_STATE[payment.is_confirmed]
    }
  }
}
</script>

<template>
  <ul
    v-if="payments.length"
    class="list-group list-group-flush"
  >
    <li
      v-for="payment in payments"
      :key="payment.id"
      class="list-group-item text-subtitle"
      :class="{
        'list-group-item-danger': payment.is_confirmed === 0,
        'list-group-item-warning': payment.is_confirmed === null,
      }"
    >
      <b>{{ $helpers.toBRL(payment.value) }}</b>
      em
      <b>{{ formatDate(payment.date) }}</b>
      via
      <b>{{ payment.payment_via.name }}</b>
      <span
        v-if="!payment.is_confirmed"
        class="fw-bold"
      >
        - [{{ getPaymentState(payment) }}]
      </span>
    </li>
  </ul>
  <div
    v-else
    class="text-secondary text-center py-3"
  >
    Nenhum pagamento registrado
  </div>
</template>
