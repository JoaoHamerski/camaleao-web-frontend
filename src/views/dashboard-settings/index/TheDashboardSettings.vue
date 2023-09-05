<script>
import { GetStatus } from '@/graphql/Status.gql'
import  DashboardProductionSettings from './partials/DashboardProductionSettings.vue'
import { faChartBar } from '@fortawesome/free-solid-svg-icons'

export default {
  components: {
    DashboardProductionSettings
  },
  metaInfo: {
    title: 'Dashboard'
  },
  apollo: {
    status: {
      query: GetStatus,
    }
  },
  data: () => ({
    icons: {
      faChartBar,
    },
    status: [],
  }),
  computed: {
    isQueryLoading () {
      return this.$apollo.queries.status.loading
    }
  }
}
</script>

<template>
  <AppCard
    color="camaleao"
    class="my-5"
  >
    <template #header>
      <h6 class="fw-bold mb-0">
        <FontAwesomeIcon
          :icon="icons.faChartBar"
          fixed-width
        />
        Configurações do Dashboard
      </h6>
    </template>

    <template #body>
      <AppLoading v-show="isQueryLoading" />
      <DashboardProductionSettings
        v-if="!isQueryLoading"
        :status="status"
      />
    </template>
  </AppCard>
</template>
