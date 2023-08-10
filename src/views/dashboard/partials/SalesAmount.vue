<script>
import {
  faDollarSign,
  faCalendarDay,
  faCalendarWeek,
  faCalendarAlt,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons'

import { GetSalesAmount } from '@/graphql/Dashboard.gql'
import { isEmpty } from 'lodash-es'

import SalesAmountItem from './SalesAmountItem.vue'
import SalesAmountChart from './SalesAmountChart.vue'

export default {
  components: {
    SalesAmountItem,
    SalesAmountChart
  },
  apollo: {
    dashboardSalesAmount: {
      query: GetSalesAmount
    }
  },
  data: () => ({
    dashboardSalesAmount: {},
    icons: {
      faDollarSign,
      faCalendarDay,
      faCalendarWeek,
      faCalendarAlt,
      faExclamationCircle
    }
  }),
  computed: {
    isLoading () {
      return !!this.$apollo.queries.dashboardSalesAmount.loading
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
        :icon="icons.faDollarSign"
        fixed-width
      />
      Volume de vendas
    </template>
    <template #body>
      <div
        v-show="isLoading"
        class="py-5"
      >
        <AppLoading />
      </div>

      <div
        v-if="!isEmpty(dashboardSalesAmount)"
        class="row mb-3"
      >
        <div class="col-12 col-md mb-2 mb-md-0">
          <SalesAmountItem
            label="Dia"
            :value="dashboardSalesAmount.current.day"
            :previous-value="dashboardSalesAmount.previous.day"
            :icon="icons.faCalendarDay"
          />
        </div>

        <div class="col-12 col-md mb-2 mb-md-0">
          <SalesAmountItem
            label="Semana"
            :value="dashboardSalesAmount.current.week"
            :previous-value="dashboardSalesAmount.previous.week"
            :icon="icons.faCalendarWeek"
          />
        </div>

        <div class="col-12 col-md">
          <SalesAmountItem
            label="Mês"
            :value="dashboardSalesAmount.current.month"
            :previous-value="dashboardSalesAmount.previous.month"
            :icon="icons.faCalendarAlt"
          />
        </div>
      </div>
      <div>
        <SalesAmountChart />
      </div>
      <div class="text-secondary extra-small">
        <FontAwesomeIcon
          :icon="icons.faExclamationCircle"
          fixed-width
        />
        Dados baseados na data de cadastro dos pedidos.
      </div>
    </template>
  </AppContainer>
</template>
