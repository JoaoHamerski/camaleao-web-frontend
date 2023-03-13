<script>
import { faThList } from '@fortawesome/free-solid-svg-icons'

import { GetBudgets } from '@/graphql/Budget.gql'

import BudgetTable from '../partials/BudgetTable.vue'
import BudgetEditModal from '../partials/BudgetEditModal.vue'

export default {
  components: {
    BudgetTable,
    BudgetEditModal,
  },
  apollo: {
    budgets: {
      query: GetBudgets,
      variables () {
        return {
          first: 10,
          page: this.page
        }
      }
    }
  },
  data () {
    return {
      page: 1,
      budgetEditModal: {
        value: false,
        budget: {}
      },
      budgets: {
        paginatorInfo: {},
        data: [],
      },
      icons: {
        faThList
      }
    }
  },
  computed: {
    isQueryLoading () {
      return !!this.$apollo.queries.budgets.loading
    }
  },
  methods: {
    onEdit (budget) {
      this.budgetEditModal.budget = budget
      this.budgetEditModal.value = true
    },
    onEditSuccess () {
      this.budgetEditModal.value = false
      this.budgetEditModal.budget = {}
    }
  }
}
</script>

<template>
  <div>
    <BudgetEditModal
      v-model="budgetEditModal.value"
      :budget="budgetEditModal.budget"
      @success="onEditSuccess"
    />

    <AppCard class="mt-2">
      <template #header>
        <h6 class="mb-0 fw-bold">
          <FontAwesomeIcon
            :icon="icons.faThList"
            fixed-width
          />
          Orçamentos gerados
        </h6>
      </template>
      <template #body>
        <AppLoading v-show="isQueryLoading" />
        <BudgetTable
          :budgets="budgets.data"
          @edit="onEdit"
        />
      </template>
    </AppCard>

    <AppPaginator
      v-model="page"
      class="mt-2"
      :pagination="budgets.paginatorInfo"
    />
  </div>
</template>
