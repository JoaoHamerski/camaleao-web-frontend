<script>
import PaymentExpenseStatus from '@/views/resources/payments-expenses/PaymentExpenseStatus.vue'

export default {
  components: {
    PaymentExpenseStatus
  },
  props: {
    expense: {
      type: Object,
      required: true
    }
  }
}
</script>
<template>
  <PaymentExpenseStatus
    :entry="expense"
    :is-expense="true"
  />
</template>
