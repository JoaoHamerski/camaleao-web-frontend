<script>
import { GetExpenses } from '@/graphql/Expense.gql'

import TheExpensesReportCard from './TheExpensesReportCard.vue'
import TheExpensesBody from './TheExpensesBody.vue'
import TheExpensesHeader from './TheExpensesHeader.vue'

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
  <div class="py-5">
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
      @search="onSearch"
    />

    <TheExpensesBody
      :expenses="expenses.data"
      :pagination="expenses.paginatorInfo"
      :page.sync="page"
      :is-loading="isLoading"
    />
  </div>
</template>
