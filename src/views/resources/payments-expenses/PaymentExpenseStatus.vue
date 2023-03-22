<script>
import roles from '@/constants/roles'

const PaymentExpenseStatusConfirmation = () => import(
  '@/views/resources/payments-expenses/PaymentExpenseStatusConfirmation.vue'
)

const PaymentExpenseStateInfo = () => import(
  '@/views/resources/payments-expenses/PaymentExpenseStateInfo.vue'
)

export default {
  props: {
    entry: {
      type: Object,
      required: true
    },
    isExpense: undefined
  },
  data () {
    return {
      roles
    }
  },
  computed: {
    showConfirmationButtons () {
      if (this.isExpense) {
        return this.$helpers.canView(roles.GERENCIA)
          && this.entry.is_confirmed === null
      }

      return this.$helpers.canView(roles.GERENCIA, roles.ATENDIMENTO)
          && this.entry.is_confirmed === null
    },
    getComponentAttrs () {
      if (this.showConfirmationButtons) {
        return {
          isExpense: this.isExpense ?? this.entry.is_expense,
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
