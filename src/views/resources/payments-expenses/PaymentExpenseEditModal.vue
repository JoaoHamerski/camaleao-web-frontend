<script>
const ExpensesForm = () => import('@/views/expenses/index/ExpensesForm.vue')
const PaymentForm = () => import('@/views/resources/payments/PaymentForm.vue')

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    entry: {
      type: Object,
      default: null
    }
  },
  computed: {
    getComponentProps () {
      console.log(this.entry)
      if (this.isExpense) {
        return {
          expense: {
            id: this.entry.id,
            date: this.entry.date,
            description: this.entry.description,
            value: this.$helpers.toBRL(this.entry.value),
            expense_via_id: this.entry.via.id,
            expense_type_id: this.entry.type.id,
            product_type_id: this.entry?.product_type?.id || '',
            employee_id: this.entry?.employee?.id || '',
            receipt_path: this.entry.receipt_path,
          }
        }
      }

      console.log(this.entry)
      return {
        order: this.entry.order,
        payment: {
          id: this.entry.id,
          via: this.entry.via,
          note: this.entry.note,
          value: this.entry.value,
          date: this.entry.date,
          is_confirmed: this.entry.is_confirmed
        }
      }
    },
    getComponent () {
      if (this.isExpense) {
        return ExpensesForm
      }

      return PaymentForm
    },
    isExpense () {
      return this.entry.is_expense
    }
  },
  methods: {
    onEditSuccess () {
      this.$emit('success')
    }
  }
}
</script>
<template>
  <AppModal
    id="dailyCashEditModal"
    :value="value"
    v-on="$listeners"
  >
    <template #title>
      <template v-if="entry">
        Alterar {{ isExpense ? 'Despesa' : 'Pagamento' }}
      </template>
    </template>

    <template
      v-if="entry"
      #body
    >
      <Component
        :is="getComponent"
        :is-edit="true"
        v-bind="getComponentProps"
        @success="onEditSuccess"
      />
    </template>
  </AppModal>
</template>
