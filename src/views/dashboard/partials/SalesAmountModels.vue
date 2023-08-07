<script>
import { faTshirt } from '@fortawesome/free-solid-svg-icons';
import { GetModelsSalesAmount } from '@/graphql/Dashboard.gql'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import SalesAmountModelsItem from './SalesAmountModelsItem.vue';

export default {
  components: {
    SalesAmountModelsItem
  },
  apollo: {
    dashboardSalesAmountModels: {
      query: GetModelsSalesAmount
    }
  },
  data: () => ({
    dashboardSalesAmountModels: [],
    icons: {
      faTshirt,
      faExclamationCircle
    }
  }),
  computed: {
    isLoading () {
      return !!this.$apollo.queries.dashboardSalesAmountModels.loading
    }
  }
}
</script>

<template>
  <AppContainer>
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faTshirt"
        fixed-width
      />
      Volume de vendas por modelo
    </template>

    <template #body>
      <div
        v-show="isLoading"
        class="py-5"
      >
        <AppLoading />
      </div>

      <div class="row row-cols row-cols-md-4 mb-3">
        <SalesAmountModelsItem
          v-for="item in dashboardSalesAmountModels"
          :key="`model_${item.model.id}`"
          :item="item"
          class="mb-3"
        />
      </div>

      <div class="extra-small text-secondary">
        <FontAwesomeIcon
          :icon="icons.faExclamationCircle"
          fixed-width
        /> Dados baseados em todos os pedidos com modelos cadastrados desde o início.
      </div>
    </template>
  </AppContainer>
</template>
