<script>
import { DateTime } from 'luxon'

import { formatDatetime } from '@/utils/formatters'
import { faTruck } from '@fortawesome/free-solid-svg-icons'
import orderStatesMixin from '@/views/orders/orderStatesMixin'

export default {
  mixins: [orderStatesMixin],
  props: {
    order: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      icons: {
        faTruck
      }
    }
  },
  computed: {
    isExpiredDeliveryDate () {
      const dateCurrent = DateTime.fromISO(DateTime.now().toISODate())
      const dateDelivery = DateTime.fromISO(this.order.delivery_date)

      return dateDelivery < dateCurrent
    },
    isNearDeliveryDate () {
      const dateCurrent = DateTime.fromISO(DateTime.now().toISODate())
      const dateFuture = dateCurrent.plus({days: 2})
      const dateDelivery = DateTime.fromISO(this.order.delivery_date)

      return dateFuture >= dateDelivery || dateDelivery === dateCurrent
    },
    titleBackgroundClass () {
      if (this.isExpiredDeliveryDate) {
        return 'bg-link-danger'
      }

      if (this.isNearDeliveryDate) {
        return 'bg-link-camaleao'
      }

      if (this.isOrderPreRegistered) {
        return 'bg-link-warning'
      }

      return 'bg-link-primary'
    },
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
        class="text-decoration-none text-white badge clickable"
        target="_blank"
        :class="titleBackgroundClass"
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

        <template v-if="order.delivery_date">
          <span class="mx-2">&bull;</span>
          <span>
            <FontAwesomeIcon :icon="icons.faTruck" />
            {{ formatDatetime(order.delivery_date, 'dd/MM') }}
          </span>
        </template>
      </a>
    </h5>
    <div>
      <span
        v-if="isExpiredDeliveryDate"
        class="badge small bg-danger me-2"
      >
        <FontAwesomeIcon
          :icon="icons.faTruck"
          fixed-width
        />
        Entrega atrasada
      </span>
      <span
        class="badge small bg-warning"
      >
        {{ order.status.text }}
      </span>
    </div>
  </div>
</template>
