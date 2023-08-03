<script>
import { faChartBar } from '@fortawesome/free-solid-svg-icons';

import SalesAmount from '../partials/SalesAmount.vue'
import SalesAmountCities from '../partials/SalesAmountCities.vue';
import SalesAmountModels from '../partials/SalesAmountModels.vue';
import ClientsSegmentation from '../partials/ClientsSegmentation.vue';

export default {
  metaInfo: {
    title: 'Dashboard'
  },
  components: {
    SalesAmount,
    SalesAmountCities,
    SalesAmountModels,
    ClientsSegmentation
  },
  data: () => ({
    icons: {
      faChartBar
    }
  })
}
</script>

<template>
  <div class="mt-5">
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
        <SalesAmountCities class="mb-3" />
        <SalesAmountModels class="mb-3" />
        <ClientsSegmentation class="mb-3" />
      </template>
    </AppCard>
  </div>
</template>
