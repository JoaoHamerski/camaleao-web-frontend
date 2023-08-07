<script>
import { GetClientsSegmentation } from '@/graphql/Dashboard.gql'
import { isEmpty } from 'lodash-es';
import { faUsers, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import ClientsSegmentationItem from './ClientsSegmentationItem.vue';

export default {
  components: {
    ClientsSegmentationItem
  },
  apollo: {
    dashboardClientsSegmentation: {
      query: GetClientsSegmentation
    }
  },
  data: () => ({
    dashboardClientsSegmentation: {},
    icons: {
      faUsers,
      faExclamationCircle
    }
  }),
  computed: {
    isLoading () {
      return !!this.$apollo.queries.dashboardClientsSegmentation.loading
    }
  },
  methods: {
    isEmpty
  }
}
</script>

<template>
  <AppContainer>
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faUsers"
        fixed-width
      />
      Segmentação de clientes
    </template>

    <template #body>
      <div
        v-show="isLoading"
        class="py-5"
      >
        <AppLoading />
      </div>
      <div
        v-if="!isEmpty(dashboardClientsSegmentation)"
        class="row row-cols row-cols-md-4 mb-3"
      >
        <ClientsSegmentationItem
          label="Novos clientes"
          :data="dashboardClientsSegmentation.new_clients"
        />

        <ClientsSegmentationItem
          label="Clientes recorrentes"
          :data="dashboardClientsSegmentation.recurrent_clients"
        />
      </div>
      <div class="extra-small text-secondary">
        <FontAwesomeIcon
          :icon="icons.faExclamationCircle"
          fixed-width
        />
        Dados baseados em clientes e pedidos cadastrados desde o início.
      </div>
    </template>
  </AppContainer>
</template>
