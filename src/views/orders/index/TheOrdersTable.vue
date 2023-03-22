<script>
import { orders } from '@/constants/route-names'

export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    headers () {
      return [
        { text: 'Cliente', value: 'client.name' },
        { text: 'Cód. pedido', value: 'code' },
        { text: 'Quantidade', value: 'quantity' },
        { text: 'Valor total', value: 'price', format: 'currencyBRL' },
        { text: 'Total pago', value: 'total_paid', format: 'currencyBRL' },
        { text: 'Estampa', value: 'print_date', format: 'datetime', align: 'center' },
        { text: 'Costura', value: 'seam_date', format: 'datetime', align: 'center' },
        { text: 'Entrega', value: 'delivery_date', format: 'datetime', align: 'center' }
      ]
    }
  },
  methods: {
    tableRowRoute (order) {
      if (!order.client) {
        return {
          name: orders.showPreRegistered,
          params: this.$helpers.getRouteParams({ order })
        }
      }

      return {
        name: orders.show,
        params: this.$helpers.getRouteParams({ order, client: order.client })
      }
    },
    orderClass (order) {
      if (order.states.includes('PRE-REGISTERED')) {
        return 'table-warning'
      }

      if (order.states.includes('CLOSED')) {
        return 'table-secondary'
      }

      if (order.states.includes('PAID')) {
        return 'table-success'
      }

      return ''
    }
  }
}
</script>

<template>
  <AppTable
    :headers="headers"
    :items="items"
    :row-class="orderClass"
    :route="tableRowRoute"
  />
</template>
