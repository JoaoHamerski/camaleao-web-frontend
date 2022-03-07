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
      default: false
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
  <h6
    v-if="order"
    class="d-flex justify-content-between fw-bold align-items-center mb-0"
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
      PEDIDO FECHADO
      <div class="small">
        Em {{ formatDatetime(order.closed_at) }}
      </div>
    </div>
  </h6>
</template>
