<script>
import { GetExpenses } from '@/graphql/Expense.gql'
import { expenseTypes } from '@/graphql/ExpenseType.gql'
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
      query: GetExpenses,
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
      modalReport: {
        value: false,
        src: ''
      },
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
    onReportGenerated (src) {
      this.modalReport.src = src
      this.modalReport.value = true
    },
    onCloseModalReport () {
      this.modalReport.src = ''
    },
    onSearch (search) {
      this.search = search
    }
  }
}
</script>

<template>
  <div class="mt-5">
    <AppFileModal
      id="expensesReport"
      v-model="modalReport.value"
      :src="modalReport.src"
      title="Relatório das despesas"
      @hidden="onCloseModalReport"
    />

    <TheExpensesReportCard
      class="mb-2"
      @report-generated="onReportGenerated"
    />

    <TheExpensesHeader
      :vias="vias"
      :expense-types="expenseTypes"
      @search="onSearch"
    />

    <TheExpensesBody
      :vias="vias"
      :expense-types="expenseTypes"
      :expenses="expenses.data"
      :pagination="expenses.paginatorInfo"
      :page.sync="page"
      :is-loading="isLoading"
    />
  </div>
</template>
