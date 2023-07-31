<script>
import {
  faDollarSign,
  faCalendarDay,
  faCalendarWeek,
  faCalendarAlt
} from '@fortawesome/free-solid-svg-icons'

import { GetSalesAmount } from '@/graphql/Dashboard.gql'
import { isEmpty } from 'lodash-es'

import SalesAmountItem from './SalesAmountItem.vue'

export default {
  components: {
    SalesAmountItem
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
      faCalendarAlt
    }
  }),
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
        v-if="!isEmpty(dashboardSalesAmount)"
        class="row"
      >
        <div class="col">
          <SalesAmountItem
            label="Dia"
            :value="dashboardSalesAmount.current.day"
            :previous-value="dashboardSalesAmount.previous.day"
            :icon="icons.faCalendarDay"
          />
        </div>

        <div class="col">
          <SalesAmountItem
            label="Semana"
            :value="dashboardSalesAmount.current.week"
            :previous-value="dashboardSalesAmount.previous.week"
            :icon="icons.faCalendarWeek"
          />
        </div>

        <div class="col">
          <SalesAmountItem
            label="Mês"
            :value="dashboardSalesAmount.current.month"
            :previous-value="dashboardSalesAmount.previous.month"
            :icon="icons.faCalendarAlt"
          />
        </div>
      </div>
    </template>
  </AppContainer>
</template>
