<script>
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons'
import { formatDatetime } from '@/utils/formatters'

export default {
  props: {
    order: {
      type: Object,
      default: () => ({})
    },
    isOrderClosed: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      icons: {
        faBoxOpen
      }
    }
  },
  methods: {
    formatDatetime
  }
}
</script>

<template>
  <div
    v-if="order"
    class="d-flex flex-column flex-sm-row justify-content-between fw-bold align-items-sm-center mb-0"
  >
    <div>
      <FontAwesomeIcon
        :icon="icons.faBoxOpen"
        class="me-1"
      />
      Pedido - {{ $helpers.fallback(order.name, null, '[SEM NOME]') }}
    </div>
    <div
      v-if="isOrderClosed"
    >
      FECHADO <span class="d-inline d-sm-none">-</span>
      <span class="small d-inline d-sm-block">
        Em {{ formatDatetime(order.closed_at) }}
      </span>
    </div>
  </div>
</template>
