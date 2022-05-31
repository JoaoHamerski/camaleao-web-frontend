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
    totalPrice () {
      return this.dailyCashBalancePendenciesOrders.data.reduce(
        (total, item) => total + +item.price, 0
      )
    },
    totalShirts () {
      return this.dailyCashBalancePendenciesOrders.data.reduce(
        (total, item) => total + +item.quantity, 0
      )
    },
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
    <AppLoading v-show="isQueryLoading" />
    <div class="text-center">
      <AppPaginator
        v-model="page"
        :pagination="dailyCashBalancePendenciesOrders.paginatorInfo"
      />
    </div>
    <div
      v-if="dailyCashBalancePendenciesOrders.data.length"
      class="mb-2 fw-bold"
    >
      Nesta página:
      <span>
        <FontAwesomeIcon
          :icon="icons.faTshirt"
          fixed-width
        />
        {{ $helpers.plural(totalShirts, 'f', 'CAMISA', null, true) }}

      </span>

      &bull;

      <span class="text-danger">
        <FontAwesomeIcon
          :icon="icons.faHandHoldingUsd"
          fixed-width
        />
        {{ $helpers.toBRL(totalOwing) }}
      </span>

      &bull;

      <span class="text-success">
        <FontAwesomeIcon
          :icon="icons.faDollarSign"
          fixed-width
        />
        {{ $helpers.toBRL(totalPrice) }}
      </span>
    </div>
    <div
      v-if="dailyCashBalancePendenciesOrders.data.length"
      class="row"
    >
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
    <div
      v-else
      class="text-center text-secondary mt-5 pt-5"
    >
      Nenhum pedido encontrado
    </div>
  </div>
</template>
