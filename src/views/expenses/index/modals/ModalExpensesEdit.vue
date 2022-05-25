<script>

import { isEmpty } from 'lodash-es'
import { formatCurrencyBRL, formatDatetime } from '@/utils/formatters'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import ExpensesForm from '../ExpensesForm.vue'

export default {
  components: {
    ExpensesForm
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    expense: {
      type: Object,
      default: () => ({})
    },
    expenseTypes: {
      type: Array,
      default: () => ([])
    },
    vias: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      expenseToEdit: ({}),
      icons: {
        faEdit
      }
    }
  },
  methods: {
    isEmpty,
    formatExpenseToEdit () {
      const expense = this.expense

      this.expenseToEdit = {
        id: expense.id,
        description: expense.description,
        expense_type_id: expense.type.id,
        value: formatCurrencyBRL(expense.value),
        expense_via_id: expense.via.id,
        product_type_id: expense.product_type.id,
        receipt_path: expense.receipt_path,
        date: expense.date
      }
    },
    onModalHidden () {
      this.expenseToEdit = {}
    },
    onEditSuccess () {
      this.$emit('success')
    }
  }
}
</script>

<template>
  <AppModal
    id="modalExpenseEdit"
    :value="value"
    @show="formatExpenseToEdit"
    @hidden="onModalHidden"
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faEdit"
        fixed-width
      />
      Editar despesa
    </template>

    <template #body>
      <ExpensesForm
        v-if="!isEmpty(expenseToEdit)"
        key="registerForm"
        :is-edit="true"
        :vias="vias"
        :expense="expenseToEdit"
        :expense-types="expenseTypes"
        @success="onEditSuccess"
      />
    </template>
  </AppModal>
</template>
