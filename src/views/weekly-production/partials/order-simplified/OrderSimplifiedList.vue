<script>
import { faUser, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
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
    formatDatetime: {
      type: Function,
      default: () => {}
    },
    clientUrl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      icons: {
        faUser,
        faCalendarAlt
      }
    }
  }
}
</script>

<template>
  <ul class="list-group list-group-sm list-group-flush">
    <OrderListItem
      v-if="order.client"
      v-tippy="{placement: 'bottom'}"
      :icon="icons.faUser"
      content="Cliente"
    >
      <a
        class="text-decoration-none fw-bold"
        :href="clientUrl"
        target="_blank"
      >
        {{ order.client.name }}
      </a>
    </OrderListItem>

    <OrderListItem
      v-if="order.created_at"
      v-tippy="{placement: 'bottom'}"
      :icon="icons.faCalendarAlt"
      content="Data de cadastro"
    >
      {{ formatDatetime(order.created_at) }}
    </OrderListItem>
  </ul>
</template>
