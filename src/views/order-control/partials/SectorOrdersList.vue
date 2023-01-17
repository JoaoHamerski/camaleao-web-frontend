<script>
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { ToggleOrder } from '@/graphql/Order.gql'

import SectorOrdersListImage from './SectorOrdersListImage.vue'
import SectorOrdersListInfo from './SectorOrdersListInfo.vue'
import SectorOrdersListStatus from './SectorOrdersListStatus.vue'

export default {
  components: {
    SectorOrdersListImage,
    SectorOrdersListInfo,
    SectorOrdersListStatus
  },
  props: {
    canCloseOrders: {
      type: Boolean,
      default: false
    },
    status: {
      type: Object,
      default: () => ({})
    },
    orders: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      isStatusLoading: {
        id: '',
        value: false
      },
      isLoading: {
        id: '',
        value: false
      },
      icons: {
        faCheck
      }
    }
  },
  methods: {
    orderHasPendencies (order) {
      return order.total_owing > 0
    },
    async onCloseOrderClick ({id}) {
      this.isLoading = {
        id,
        value: true
      }

      try {
        await this.$apollo.mutate({
          mutation: ToggleOrder,
          variables: {
            id
          }
        })

        this.$toast.success('Pedido fechado!')
      } catch (error) {
        const message = error.graphQLErrors[0].extensions.reason

        this.$toast.error(message)
      }

      this.isLoading = {
        id: '',
        value: false
      }
    },
    onStatusLoading (loading) {
      this.isStatusLoading = loading
    }
  }
}
</script>

<template>
  <div>
    <div
      v-for="order in orders"
      :key="order.id"
      class="card mb-1"
    >
      <div class="card-body position-relative card-sector-body p-1 row flex-column flex-sm-row gx-2">
        <AppLoading v-show="isStatusLoading.id === order.id && isStatusLoading.value" />
        <div class="col col-sm-3">
          <SectorOrdersListImage :image="order.art_paths" />
        </div>
        <div class="col">
          <SectorOrdersListInfo :order="order" />
          <SectorOrdersListStatus
            :order="order"
            :status="status"
            :concluded-status="order.concluded_status"
            @loading="onStatusLoading"
          />
        </div>
        <div
          v-if="canCloseOrders"
          class="text-end"
        >
          <AppButton
            rounded
            :loading="isLoading.id === order.id && isLoading.value"
            :color="orderHasPendencies(order) ? 'secondary' : 'success'"
            outlined
            btn-class="btn-sm"
            :icon="icons.faCheck"
            :disabled-message="orderHasPendencies(order) && 'Não é possível fechar pedido com pendência financeira'"
            @click.prevent="onCloseOrderClick(order)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-sector-body {
  min-height: 170px;
}
</style>
