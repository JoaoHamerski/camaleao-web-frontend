<script>
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
  chimera: {
    _vias () {
      return {
        method: 'GET',
        url: 'api/vias',
        on: {
          success ({ data }) {
            this.vias = data.data
          }
        }
      }
    },
    _expenses () {
      return {
        method: 'GET',
        url: 'api/expenses',
        params: {
          page: this.page,
          search: this.search
        },
        on: {
          success ({ data }) {
            this.expenses = data.data
            this.pagination = data.meta
          }
        }
      }
    },
    _expenseTypes () {
      return {
        method: 'GET',
        url: 'api/expense-types/',
        on: {
          success ({ data }) {
            this.expenseTypes = data.data
          }
        }
      }
    }
  },
  data () {
    return {
      page: 1,
      search: '',
      vias: [],
      expenses: [],
      expenseTypes: [],
      pagination: {}
    }
  },
  computed: {
    isLoading () {
      return this.$chimera._expenses.loading
    }
  },
  methods: {
    onSearch (search) {
      this.search = search
    },
    refreshExpenses () {
      this.$chimera._expenses.reload()
    },
    refreshExpenseTypes () {
      this.$chimera._expenseTypes.reload()
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
      :expenses="expenses"
      :pagination="pagination"
      :page.sync="page"
      :is-loading="isLoading"
      @refresh-expenses="refreshExpenses"
    />
  </div>
</template>
