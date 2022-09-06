<script>
import { formatDatetime } from '@/utils/formatters'

export default {
  props: {
    order: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    orderUrl () {
      return this.$helpers.getUrl('orders.show', {
        client: this.order.client.id,
        order: this.order.id
      })
    }
  },
  methods: {
    formatDatetime
  }
}
</script>

<template>
  <div class="d-flex justify-content-between align-items-baseline mt-2 fw-bold">
    <h5>
      <a
        :href="orderUrl"
        class="text-decoration-none text-white badge bg-link-primary clickable"
        target="_blank"
      >
        <span class="fw-bold">
          {{ order.code }}
        </span>
        <span class="mx-2">&bull;</span>
        <span>{{ order.client.name }}</span>
        <span class="mx-2">&bull;</span>
        <span>{{ formatDatetime(order.created_at, 'dd/MM') }}</span>
      </a>
    </h5>
    <span class="badge bg-warning">
      {{ order.status.text }}
    </span>
  </div>
</template>
