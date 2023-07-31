<script>
import SalesAmount from '../partials/SalesAmount.vue'
import { faChartBar } from '@fortawesome/free-solid-svg-icons';

export default {
  metaInfo: {
    title: 'Dashboard'
  },
  components: {
    SalesAmount
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
        <SalesAmount />
      </template>
    </AppCard>
  </div>
</template>
