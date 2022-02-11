<script>
import { expenses } from '@/graphql/Expense.gql'
import { expenseTypes } from '@/graphql/ExpenseTypes.gql'
import { vias } from '@/graphql/Via.gql'

import TheExpensesReportCard from './TheExpensesReportCard'
import TheExpensesBody from './TheExpensesBody'
import TheExpensesHeader from './TheExpensesHeader'

export default {
  metaInfo () {
    return {
      title: 'Despesas'
    }
  },
  components: {
    TheExpensesReportCard,
    TheExpensesBody,
    TheExpensesHeader
  },
  apollo: {
    vias: {
      query: vias
    },
    expenseTypes: {
      query: expenseTypes
    },
    expenses: {
      query: expenses,
      variables () {
        return {
          descriptionLike: `%${this.search}%`,
          page: this.page
        }
      }
    }
  },
  data () {
    return {
      page: 1,
      search: '',
      vias: [],
      expenses: {
        data: [],
        paginatorInfo: {}
      },
      expenseTypes: []
    }
  },
  computed: {
    isLoading () {
      return !!this.$apollo.queries.expenses.loading
    }
  },
  methods: {
    onSearch (search) {
      this.search = search
    },
    refreshExpenses () {
      this.$apollo.queries.expenses.refetch()
    },
    refreshExpenseTypes () {
      this.$apollo.queries.expenseTypes.refetch()
    },
    refreshAll () {
      this.refreshExpenseTypes()
      this.refreshExpenses()
    }
  }
}
</script>

<template>
  <div class="mt-5">
    <TheExpensesReportCard class="mb-2" />

    <TheExpensesHeader
      :vias="vias"
      :expense-types="expenseTypes"
      @search="onSearch"
      @refresh-all="refreshAll"
      @refresh-expenses="refreshExpenses"
      @refresh-expense-types="refreshExpenseTypes"
    />

    <TheExpensesBody
      :vias="vias"
      :expense-types="expenseTypes"
      :expenses="expenses.data"
      :pagination="expenses.paginatorInfo"
      :page.sync="page"
      :is-loading="isLoading"
      @refresh-expenses="refreshExpenses"
    />
  </div>
</template>
