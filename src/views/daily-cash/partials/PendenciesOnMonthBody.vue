<script>
import {
  faTshirt,
  faDollarSign,
  faHandHoldingUsd
} from '@fortawesome/free-solid-svg-icons'

import { GetDailyCashBalancePendenciesOrders } from '@/graphql/DailyCash.gql'
import PendenciesOrderCard from './PendenciesOrderCard.vue'

export default {
  components: {
    PendenciesOrderCard
  },
  props: {
    month: {
      type: String,
      required: true
    }
  },
  apollo: {
    dailyCashBalancePendenciesOrders: {
      query: GetDailyCashBalancePendenciesOrders,
      variables () {
        return {
          month: this.month.toUpperCase(),
          first: 12,
          page: this.page
        }
      }
    }
  },
  data () {
    return {
      page: 1,
      icons: {
        faTshirt,
        faHandHoldingUsd,
        faDollarSign
      },
      dailyCashBalancePendenciesOrders: {
        data: [],
        paginatorInfo: {}
      }
    }
  },
  computed: {
    totalOwing () {
      return this.dailyCashBalancePendenciesOrders.data.reduce(
        (total, item) => total + item.total_owing, 0
      )
    },
    isQueryLoading () {
      return !!this.$apollo.queries.dailyCashBalancePendenciesOrders.loading
    }
  }
}
</script>

<template>
  <div class="position-relative">
    <div class="text-center">
      <AppPaginator
        v-model="page"
        :pagination="dailyCashBalancePendenciesOrders.paginatorInfo"
      />
    </div>
    <AppLoading
      v-if="isQueryLoading"
      class="py-5 my-5"
    />
    <template v-else-if="dailyCashBalancePendenciesOrders.data.length">
      <div class="mb-2 fw-bold">
        Nesta página:
        <span class="text-danger">
          <FontAwesomeIcon
            :icon="icons.faHandHoldingUsd"
            fixed-width
          />
          {{ $helpers.toBRL(totalOwing) }}
        </span>
      </div>
      <div class="row">
        <div
          v-for="order in dailyCashBalancePendenciesOrders.data"
          :key="order.key"
          class="col-sm-2 col"
        >
          <PendenciesOrderCard
            :order="order"
          />
        </div>
      </div>
    </template>
    <div
      v-else
      class="text-center text-secondary mt-5 pt-5"
    >
      Nenhum pedido encontrado
    </div>
  </div>
</template>
