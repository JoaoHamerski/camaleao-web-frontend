<script>
import roles from '@/constants/roles'

const PaymentExpenseStatusConfirmation = () => import(
  /* webpackChunkName: "daily-cash" */
  '@/views/resources/payments-expenses/PaymentExpenseStatusConfirmation.vue'
)

const PaymentExpenseStateInfo = () => import(
  /* webpackChunkName: "daily-cash" */
  '@/views/resources/payments-expenses/PaymentExpenseStateInfo.vue'
)

export default {
  props: {
    entry: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      roles
    }
  },
  computed: {
    showConfirmationButtons () {
      return this.$helpers.canView(roles.GERENCIA) && this.entry.is_confirmed === null
    },
    getComponentAttrs () {
      if (this.showConfirmationButtons) {
        return {
          isExpense: this.entry.is_expense,
          entry: this.entry
        }
      }

      return {
        confirmation: this.entry.is_confirmed
      }
    },
    getComponent () {
      if (this.showConfirmationButtons) {
        return PaymentExpenseStatusConfirmation
      }

      return PaymentExpenseStateInfo
    }
  }
}
</script>
<template>
  <Component
    :is="getComponent"
    v-bind="getComponentAttrs"
  />
</template>
