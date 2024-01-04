<script>
import { faChartBar } from '@fortawesome/free-solid-svg-icons';

import SalesAmount from '../partials/SalesAmount.vue'
import MonthSalesUsers from '../partials/MonthSalesUsers.vue';

export default {
  metaInfo: {
    title: 'Dashboard'
  },
  components: {
    SalesAmount,
    MonthSalesUsers
  },
  data: () => ({
    icons: {
      faChartBar
    }
  })
}
</script>

<template>
  <div class="my-5">
    <AppCard>
      <template #header>
        <h6 class="fw-bold mb-0">
          <FontAwesomeIcon
            :icon="icons.faChartBar"
            fixed-width
          />
          Dashboard
        </h6>
      </template>
      <template #body>
        <SalesAmount class="mb-3" />
        <MonthSalesUsers class="mb-3" />
      </template>
    </AppCard>
  </div>
</template>
