<script>
import { faCalendarAlt, faFunnelDollar } from '@fortawesome/free-solid-svg-icons'
import {
  GetProductTypeExpensesByMonth,
  GetEmployeeExpensesByMonth
} from '@/graphql/Expense.gql'
import { GetExpenseTypes } from '@/graphql/ExpenseType.gql'
import { GetConfig } from '@/graphql/Config.gql'
import ExpenseSubtypeOverview from './partias/ExpensesSubtypeOverview.vue'

export default {
  components: {
    ExpenseSubtypeOverview
  },
  apollo: {
    productTypesExpensesByMonth: {
      query: GetProductTypeExpensesByMonth
    },
    employeeExpensesByMonth: {
      query: GetEmployeeExpensesByMonth
    },
    expenseTypes: {
      query: GetExpenseTypes
    },
    expenseProductType: {
      query: GetConfig,
      variables: {
        name: 'app',
        key: 'product_types_expense',
        encoded: false
      },
      update ({ configGet }) {
        return configGet
      }
    },
    expenseEmployee: {
      query: GetConfig,
      variables: {
        name: 'app',
        key: 'employee_expense',
        encoded: false
      },
      update ({ configGet }) {
        return configGet
      }
    }
  },
  data () {
    return {
      productTypesExpensesByMonth: {},
      employeeExpensesByMonth: {},
      expenseTypes: [],
      expenseProductType: null,
      expenseEmployee: null,
      icons: {
        faCalendarAlt,
        faFunnelDollar
      }
    }
  },
  computed: {
    expenseTypeOfProduct () {
      return this.expenseTypes.find((expense) => expense.id === this.expenseProductType)
    },
    expenseTypeOfEmployee () {
      return this.expenseTypes.find((expense) => expense.id === this.expenseEmployee)
    },
    productTypeTitle () {
      const expenseName = this.expenseTypeOfProduct?.name || 'N/A'

      return `Despesas de ${expenseName} no mês`
    },
    expenseTitle () {
      const expenseName = this.expenseTypeOfEmployee?.name || 'N/A'

      return `Despesas de ${expenseName} no mês`
    },
    isLoadingProductTypesQuery () {
      return !!this.$apollo.queries.productTypesExpensesByMonth.loading
    },
    isLoadingEmployeeQuery () {
      return !!this.$apollo.queries.employeeExpensesByMonth.loading
    }
  }
}
</script>
<template>
  <div>
    <ExpenseSubtypeOverview
      class="mb-3"
      :title="productTypeTitle"
      :expenses-types-total="productTypesExpensesByMonth"
      :loading="isLoadingProductTypesQuery"
    />

    <ExpenseSubtypeOverview
      :title="expenseTitle"
      :expenses-types-total="employeeExpensesByMonth"
      :loading="isLoadingEmployeeQuery"
    />
  </div>
</template>
