<script>
import {
  faUser,
  faDollarSign,
  faHandHoldingUsd,
  faCalendarAlt,
  faDotCircle,
  faCheckCircle,
  faTshirt
} from '@fortawesome/free-solid-svg-icons'
import { formatDatetime } from '@/utils/formatters'

import OrderListItem from '../OrderListItem'

export default {
  components: {
    OrderListItem
  },
  props: {
    order: {
      type: Object,
      default: () => ({})
    },
    clientUrl: {
      type: String,
      default: ''
    },
    isOrderPreRegistered: {
      type: Boolean,
      default: false
    },
    isOrderPaid: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      icons: {
        faUser,
        faDollarSign,
        faHandHoldingUsd,
        faCalendarAlt,
        faDotCircle,
        faCheckCircle,
        faTshirt
      }
    }
  },
  methods: {
    formatDatetime
  }
}
</script>
<template>
  <ul class="list-group list-group-flush text-subtitle">
    <OrderListItem
      v-if="order.client"
      v-tippy="{placement: $isMobile ? 'bottom' : 'right'}"
      :icon="icons.faUser"
      class="fw-bold border-x-0"
      content="Cliente"
    >
      <a
        :href="clientUrl"
        class="text-decoration-none"
      >
        {{ order.client.name }}
      </a>
    </OrderListItem>
    <OrderListItem
      v-if="order.quantity"
      v-tippy="{placement: 'bottom'}"
      :icon="icons.faTshirt"
      content="Quantidade"
      class="fw-bold"
    >
      {{ order.quantity }} peças
    </OrderListItem>
    <OrderListItem
      v-if="order.reminder && isOrderPreRegistered"
      class="border-x-0"
    >
      <div class="small fw-bold">
        Lembrete:
      </div>
      <div>
        {{ order.reminder }}
      </div>
    </OrderListItem>
    <OrderListItem
      v-if="order.price"
      v-tippy="{placement: $isMobile ? 'bottom' : 'right'}"
      :icon="icons.faDollarSign"
      class="fw-bold border-x-0"
      content="Valor do pedido"
    >
      {{ $helpers.toBRL(order.price) }}
    </OrderListItem>

    <OrderListItem
      v-if="order.price !== null"
      v-tippy="{placement: $isMobile ? 'bottom' : 'right'}"
      class="fw-bold border-x-0"
      :class="isOrderPaid ? 'text-success' : 'text-danger'"
      :icon="icons.faHandHoldingUsd"
      content="Falta pagar"
    >
      {{
        isOrderPaid && order.total_owing !== null
          ? 'Pedido pago'
          : $helpers.toBRL(order.total_owing)
      }}
    </OrderListItem>

    <OrderListItem
      v-if="order.status"
      v-tippy="{placement: $isMobile ? 'bottom' : 'right'}"
      content="Status do pedido"
      class="border-x-0"
      :icon="order.status.is_available ? icons.faCheckCircle : icons.faDotCircle"
      :class="order.status.is_available ? 'text-success fw-bold' : 'text-warning fw-bold'"
    >
      {{ order.status.text }}
    </OrderListItem>

    <OrderListItem
      v-tippy="{placement: $isMobile ? 'bottom' : 'right'}"
      content="Data de cadastro"
      class="border-x-0"
      :icon="icons.faCalendarAlt"
    >
      {{ formatDatetime(order.created_at) }}
    </OrderListItem>
  </ul>
</template>

<style lang="scss" scoped>
.list-group-compact {
  font-size: .8rem;

  .list-group-item {
    padding: .25rem .5rem;
  }
}
</style>
