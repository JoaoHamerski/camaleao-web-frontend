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
  <div>
    <AppLoading v-show="isQueryLoading" />
    <div
      v-if="!isEmpty(dailyCashBalance)"
      class="d-flex justify-content-center justify-content-sm-around flex-column flex-sm-row"
    >
      <DailyCashBalanceItem :balance="dailyCashBalance.balance_of_day">
        BALANÇO DO DIA
      </DailyCashBalanceItem>
      <DailyCashBalanceItem
        :balance="dailyCashBalance.balance_of_week"
        class="my-3 my-sm-0"
      >
        BALANÇO DA SEMANA
      </DailyCashBalanceItem>
      <DailyCashBalanceItem :balance="dailyCashBalance.balance_of_month">
        BALANÇO DO MÊS
      </DailyCashBalanceItem>
    </div>
  </div>
</template>
