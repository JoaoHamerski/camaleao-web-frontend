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
      query: GetModelsSalesAmount,
      variables () {
        return {
          date: this.date
        }
      }
    }
  },
  data: () => ({
    dashboardSalesAmountModels: [],
    icons: {
      faTshirt,
      faExclamationCircle
    },
    date: 'MONTH'
  }),
  computed: {
    isLoading () {
      return !!this.$apollo.queries.dashboardSalesAmountModels.loading
    },
    datesOptions () {
      return [
        { text: 'MÊS', value: 'MONTH' },
        { text: 'ANO', value: 'YEAR' },
        { text: 'GERAL', value: 'ALL_TIME' },
      ]
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

      <AppLinksList
        v-model="date"
        :options="datesOptions"
        class="mb-2"
      />

      <div
        v-if="dashboardSalesAmountModels.length"
        class="row row-cols row-cols-md-4 mb-3"
      >
        <SalesAmountModelsItem
          v-for="item in dashboardSalesAmountModels"
          :key="`model_${item.model.id}`"
          :item="item"
          class="mb-3"
        />
      </div>
      <div
        v-else
        class="text-secondary small text-center py-4"
      >
        Nenhum dado encontrado
      </div>

      <div class="extra-small text-secondary">
        <FontAwesomeIcon
          :icon="icons.faExclamationCircle"
          fixed-width
        /> Dados baseados em todos os pedidos com modelos cadastrados baseado na data de cadastro.
      </div>
    </template>
  </AppContainer>
</template>
