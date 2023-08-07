<script>
import { GetMonthProduction } from '@/graphql/Dashboard.gql'
import { isEmpty } from 'lodash-es';
import {
  faTshirt,
  faCut,
  faTruck,
  faTruckLoading,
  faBoxes,
  faDolly
} from '@fortawesome/free-solid-svg-icons';

import MonthProductionItem from './MonthProductionItem.vue';
import DashboardItem from './DashboardItem.vue';
import MonthProductionDataInfo from './MonthProductionDataInfo.vue'

export default {
  components: {
    MonthProductionItem,
    DashboardItem,
    MonthProductionDataInfo
  },
  apollo: {
    dashboardProduction: {
      query: GetMonthProduction
    }
  },
  data: () => ({
    dashboardProduction: {},
    icons: {
      faTshirt,
      faCut,
      faTruck,
      faTruckLoading,
      faBoxes,
      faDolly
    }
  }),
  computed: {
    isLoading () {
      return !!this.$apollo.queries.dashboardProduction.loading
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
        :icon="icons.faDolly"
        fixed-width
      />
      Produção
    </template>

    <template #body>
      <div
        v-show="isLoading"
        class="py-5"
      >
        <AppLoading />
      </div>

      <div
        v-if="!isEmpty(dashboardProduction)"
        class="production-items"
      >
        <div>
          <MonthProductionItem :item="dashboardProduction.estampados">
            <template #label>
              <FontAwesomeIcon
                :icon="icons.faTshirt"
                fixed-width
                class="text-primary"
              />
              Estampados no dia
            </template>
          </MonthProductionItem>
        </div>

        <div>
          <MonthProductionItem :item="dashboardProduction.costurados">
            <template #label>
              <FontAwesomeIcon
                :icon="icons.faCut"
                fixed-width
                class="text-primary"
              />
              Costurados no dia
            </template>
          </MonthProductionItem>
        </div>

        <div>
          <DashboardItem>
            <template #label>
              <FontAwesomeIcon
                :icon="icons.faBoxes"
                fixed-width
                class="text-primary"
              />
              Produção no mês
            </template>
            <template #text>
              <h1 class="fw-bold">
                {{ $helpers.toNumber(dashboardProduction.month_production.orders_count) }}
              </h1>
            </template>
            <template #text-secondary>
              <div v-if="dashboardProduction.month_production.receipt">
                Receita: {{ $helpers.toBRL(dashboardProduction.month_production.receipt) }}
              </div>
            </template>
          </DashboardItem>
        </div>

        <div>
          <DashboardItem>
            <template #label>
              <FontAwesomeIcon
                :icon="icons.faTruck"
                fixed-width
                class="text-primary"
              />
              Pedidos atrasados
            </template>
            <template #text>
              <h1 class="text-danger fw-bold">
                {{ $helpers.toNumber(dashboardProduction.late_orders) }}
              </h1>
            </template>
          </DashboardItem>
        </div>

        <div>
          <DashboardItem>
            <template #label>
              <FontAwesomeIcon
                :icon="icons.faTruckLoading"
                fixed-width
                class="text-primary"
              />
              Aguardando retirada
            </template>
            <template #text>
              <h1 class="fw-bold">
                {{ $helpers.toNumber(dashboardProduction.waiting_for_withdrawal_orders) }}
              </h1>
            </template>
          </DashboardItem>
        </div>
      </div>
      <div>
        <MonthProductionDataInfo />
      </div>
    </template>
  </AppContainer>
</template>

<style scoped lang="scss">
@import "@/sass/_bootstrap-utilities.scss";

.production-items {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}

@include media-breakpoint-down (sm) {
  .production-items {
    grid-template-columns: repeat(1, 1fr);
    div {
      margin-bottom: .5rem;
    }
  }
}
</style>
