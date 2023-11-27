<script>
import { getUrl } from '@/utils/helpers';
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
        {value: 'client', text: 'Cliente'},
        {value: 'order', text: 'Pedido'},
        {value: 'value', text: 'Bônus', format: 'currencyBRL'},
        {value: 'created_at', text: 'Data', format: 'datetime', formatting: 'f'}
      ]
    }
  },
  methods: {
    getUrl
  }
}
</script>

<template>
  <AppTable
    :items="items"
    :headers="headers"
  >
    <template #[`items.client`]="{ item }">
      <a
        target="_blank"
        class="text-decoration-none"
        :href="getUrl('clients.show', {client: item.order.client.id})"
      >{{ item.order.client.name }}</a>
    </template>

    <template #[`items.order`]="{ item }">
      <a
        target="_blank"
        class="text-decoration-none"
        :href="getUrl('orders.show', {client: item.order.client.id, order: item.order.id})"
      >{{ item.order.code }}</a>
    </template>
  </AppTable>
</template>
