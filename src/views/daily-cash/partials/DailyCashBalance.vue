<script>
import {
  faCalendarDay,
  faCalendarWeek,
  faCalendarAlt,
  faBalanceScale
} from '@fortawesome/free-solid-svg-icons'

import { isEmpty } from 'lodash-es'
import { GetDailyCashBalance } from '@/graphql/DailyCash.gql'
import DailyCashBalanceItem from './DailyCashBalanceItem.vue'

export default {
  components: {
    DailyCashBalanceItem
  },
  apollo: {
    dailyCashBalance: {
      query: GetDailyCashBalance
    }
  },
  data () {
    return {
      dailyCashBalance: {},
      icons: {
        faBalanceScale,
        faCalendarDay,
        faCalendarWeek,
        faCalendarAlt
      }
    }
  },
  computed: {
    isQueryLoading () {
      return !!this.$apollo.queries.dailyCashBalance.loading
    }
  },
  methods: {
    isEmpty
  }
}
</script>
<template>
  <AppContainer
    collapsible
    :value="true"
  >
    <template #title>
      <FontAwesomeIcon :icon="icons.faBalanceScale" />
      Balanço
    </template>
    <template #body>
      <AppLoading v-show="isQueryLoading" />
      <div
        v-if="!isEmpty(dailyCashBalance)"
        class="d-flex justify-content-center justify-content-sm-around flex-column flex-sm-row"
      >
        <DailyCashBalanceItem :balance="dailyCashBalance.balance_of_day">
          <FontAwesomeIcon
            class="text-primary me-1"
            fixed-width
            :icon="icons.faCalendarDay"
          />
          <span class="text-black-50">DIA</span>
        </DailyCashBalanceItem>
        <DailyCashBalanceItem
          :balance="dailyCashBalance.balance_of_week"
          class="my-3 my-sm-0"
        >
          <FontAwesomeIcon
            class="text-primary me-1"
            fixed-width
            :icon="icons.faCalendarWeek"
          />
          <span class="text-black-50">SEMANA</span>
        </DailyCashBalanceItem>
        <DailyCashBalanceItem :balance="dailyCashBalance.balance_of_month">
          <FontAwesomeIcon
            class="text-primary me-1"
            fixed-width
            :icon="icons.faCalendarAlt"
          />
          <span class="text-black-50">MÊS</span>
        </DailyCashBalanceItem>
      </div>
    </template>
  </AppContainer>
</template>
