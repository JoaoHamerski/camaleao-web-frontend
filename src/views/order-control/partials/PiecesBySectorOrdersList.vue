<script>
export default {
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
    headers () {
      return [
        {text: 'Cód.', value: 'code'},
        {text: 'Peças', value: 'quantity'},
      ]
    }
  },
  methods: {
    seeAllOrdersClick () {
      this.$emit('show-sector')
    }
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
    <table
      v-show="hasOrders"
      class="table table-sm"
    >
      <thead>
        <tr>
          <th>Cód.</th>
          <th>Peças</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="order in orders"
          :key="order.id"
          class="small"
        >
          <td>{{ order.code }}</td>
          <td>{{ order.quantity }}</td>
        </tr>
      </tbody>
    </table>
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
