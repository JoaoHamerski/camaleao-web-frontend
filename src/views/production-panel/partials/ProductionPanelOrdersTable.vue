<script>
export default {
  props: {
    orders: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    headers () {
      return [
        {text: 'Cód.', value: 'code'},
        {text: 'Peças', value: 'quantity'},
      ]
    }
  },
  methods: {
    rowClass () {
      return 'small'
    },
    tableRowRoute (order) {
      return {
        name: 'orders.show',
        params: this.$helpers.getRouteParams({
          order,
          client: order.client
        })
      }
    }
  }
}
</script>

<template>
  <AppTable
    table-class="table-sm"
    :row-class="rowClass"
    :items="orders"
    :headers="headers"
    :route="tableRowRoute"
    open-in-new-tab
  />
</template>
