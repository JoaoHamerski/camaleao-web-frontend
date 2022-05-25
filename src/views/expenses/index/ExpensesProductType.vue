<script>
import { faCalendarAlt, faFunnelDollar } from '@fortawesome/free-solid-svg-icons'
import { GetProductTypeExpensesByMonth } from '@/graphql/Expense.gql'

export default {
  apollo: {
    productTypesExpensesByMonth: {
      query: GetProductTypeExpensesByMonth
    }
  },
  data () {
    return {
      productTypesExpensesByMonth: [],
      icons: {
        faCalendarAlt,
        faFunnelDollar
      }
    }
  },
  computed: {
    isLoadingQuery () {
      return !!this.$apollo.queries.productTypesExpensesByMonth.loading
    }
  }
}
</script>
<template>
  <!-- eslint-disable vue/no-v-html -->
  <div>
    <AppContainer
      color="danger"
      :collapsible="$isMobile"
    >
      <template #title>
        <FontAwesomeIcon
          :icon="icons.faCalendarAlt"
          fixed-width
        />
        Despesas de produtos no mês
      </template>
      <template #body>
        <AppLoading v-show="isLoadingQuery" />

        <div
          v-if="productTypesExpensesByMonth.length"
          class="row"
        >
          <div
            v-for="type in productTypesExpensesByMonth"
            :key="type.name"
            class="col-12 col-sm-3 mb-2"
          >
            <div class="text-subtitle fw-bold">
              <FontAwesomeIcon
                :icon="icons.faFunnelDollar"
                fixed-width
                class="text-danger"
              />
              {{ type.name }}
            </div>
            <div
              class="text-danger"
              v-html="$helpers.toBRL(-type.expense, true)"
            />
          </div>
        </div>
        <div
          v-else
          class="text-center text-subtitle text-secondary my-4"
        >
          Nenhuma despesa neste mês
        </div>
      </template>
    </AppContainer>
  </div>
</template>
