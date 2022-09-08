<script>
import { formatDatetime } from '@/utils/formatters'
import orderStatesMixin from '@/views/orders/orderStatesMixin'

export default {
  mixins: [orderStatesMixin],
  props: {
    order: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    orderUrl () {
      if (this.isOrderPreRegistered && !this.order.client) {
        return this.$helpers.getUrl('orders.show.pre-registered', {
          order: this.order.id
        })
      }

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
  <div class="d-flex justify-content-between flex-column flex-sm-row align-items-baseline mt-2 fw-bold">
    <h5>
      <a
        :href="orderUrl"
        class="text-decoration-none text-white badge bg-link-primary clickable"
        target="_blank"
        :class="{
          'bg-link-primary': !isOrderPreRegistered,
          'bg-link-warning': isOrderPreRegistered
        }"
      >
        <template v-if="!order.code && !order.client">
          [PRE-REGISTRO]
        </template>
        <template v-else>
          <span class="fw-bold">
            {{ order.code }}
          </span>
          <span class="mx-2">&bull;</span>
          <span>{{ order.client.name }}</span>
        </template>

        <span class="mx-2">&bull;</span>
        <span>{{ formatDatetime(order.created_at, 'dd/MM') }}</span>
      </a>
    </h5>
    <span
      class="badge small bg-warning"
    >
      {{ order.status.text }}
    </span>
  </div>
</template>
