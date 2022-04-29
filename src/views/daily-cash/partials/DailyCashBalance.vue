<script>
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
      dailyCashBalance: {}
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
  <div
    class="d-flex justify-content-around table-responsive position-relative"
  >
    <AppLoading v-show="isQueryLoading" />
    <template v-if="!isEmpty(dailyCashBalance)">
      <DailyCashBalanceItem :balance="dailyCashBalance.balance_of_day">
        BALANÇO DO DIA
      </DailyCashBalanceItem>
      <DailyCashBalanceItem :balance="dailyCashBalance.balance_of_week">
        BALANÇO DA SEMANA
      </DailyCashBalanceItem>
      <DailyCashBalanceItem :balance="dailyCashBalance.balance_of_month">
        BALANÇO DO MÊS
      </DailyCashBalanceItem>
    </template>
  </div>
</template>
