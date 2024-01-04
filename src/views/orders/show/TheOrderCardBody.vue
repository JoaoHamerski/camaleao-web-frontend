<script>
import { formatDatetime } from '@/utils/formatters'
import roles from '@/constants/roles'

import OrderReminder from './partials/OrderReminder.vue'
import OrderNotes from './partials/order-notes/OrderNotes.vue'
import OrderPayments from './partials/order-payments/OrderPayments.vue'
import OrderFiles from './partials/order-files/OrderFiles.vue'
import OrderStatusProgress from './partials/order-status/OrderStatusProgress.vue'
import OrderActivities from './partials/OrderActivities.vue'
import OrderBodyDetails from './partials/order-body/OrderBodyDetails.vue'
import OrderBodyProducts from './partials/order-body/OrderBodyProducts.vue'
import OrderBodyTotalValue from './partials/order-body/OrderBodyTotalValue.vue'

export default {
  components: {
    OrderNotes,
    OrderPayments,
    OrderFiles,
    OrderReminder,
    OrderStatusProgress,
    OrderActivities,
    OrderBodyDetails,
    OrderBodyProducts,
    OrderBodyTotalValue
  },
  props: {
    order: {
      type: Object,
      required: true
    },
    isOrderPreRegistered: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      roles
    }
  },
  computed: {
    showReminder () {
      return this.isOrderPreRegistered && this.order.reminder
    },
  },
  methods: {
    formatDatetime
  }
}
</script>

<template>
  <div>
    <OrderReminder v-if="showReminder">
      {{ order.reminder }}
    </OrderReminder>

    <OrderBodyDetails :order="order" />
    <OrderBodyProducts :order="order" />
    <OrderBodyTotalValue :order="order" />

    <OrderStatusProgress
      v-if="order.has_order_control"
      class="mt-3"
      :order="order"
    />

    <OrderNotes
      class="mt-3"
      :order-id="order.id"
      :notes="order.notes"
    />

    <OrderPayments
      class="mt-3"
      :payments="order.payments"
      @open-modal="$emit('open-modal', $event)"
    />

    <OrderFiles
      class="mt-3"
      :order="order"
    />

    <OrderActivities
      v-if="$helpers.canView(roles.GERENCIA)"
      :order="order"
      class="mt-3"
    />
  </div>
</template>
