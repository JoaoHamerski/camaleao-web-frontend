<script>
import ProductionPanelOrdersTable from './ProductionPanelOrdersTable.vue'

export default {
  components: {
    ProductionPanelOrdersTable
  },
  props: {
    orders: {
      type: Array,
      default: () => []
    },
    total: {
      type: Number,
      required: true
    }
  },
  computed: {
    totalShowingOrders () {
      return this.orders.length
    },
    hasOrders () {
      return !!this.orders.length
    },
  },
  methods: {
    seeAllOrdersClick () {
      this.$emit('show-sector')
    },

  }
}
</script>
<template>
  <div class="sector-orders-body custom-scrollbar">
    <div
      v-if="orders.length"
      class="small"
    >
      Exibindo {{ orders.length }} de {{ total }} pedidos.
      <template v-if="total > totalShowingOrders">
        <b
          class="link-primary clickable"
          @click="seeAllOrdersClick"
        >Ver todos</b>.
      </template>
    </div>

    <ProductionPanelOrdersTable
      v-show="hasOrders"
      :orders="orders"
    />

    <div
      v-show="!hasOrders"
      class="text-center text-secondary small"
    >
      Nenhum pedido encontrado
    </div>
  </div>
</template>

<style scoped>
.sector-orders-body {
  height: 130px;
  max-height: 130px;
  overflow-y: auto;
}
</style>
