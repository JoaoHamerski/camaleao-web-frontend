<script>
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { GetDashboardMonthSalesUsers } from '@/graphql/Dashboard.gql'

import MonthSalesUsersItem from './MonthSalesUsersItem.vue';

export default {
  components: {
    MonthSalesUsersItem
  },
  apollo: {
    dashboardMonthSalesUsers: {
      query: GetDashboardMonthSalesUsers
    }
  },
  data: () => ({
    dashboardMonthSalesUsers: [],
    icons: {
      faCalendarAlt
    }
  })
}
</script>

<template>
  <AppContainer>
    <template #title>
      <FontAwesomeIcon :icon="icons.faCalendarAlt" />
      Vendas no mês
    </template>

    <template #body>
      <div class="col-12 col-lg-7">
        <h5 class="mb-3">
          Vendas no mês atual
        </h5>
        <template v-for="monthSale in dashboardMonthSalesUsers">
          <MonthSalesUsersItem
            :key="monthSale.user.id"
            :month-sale="monthSale"
          />
        </template>
      </div>
    </template>
  </AppContainer>
</template>
