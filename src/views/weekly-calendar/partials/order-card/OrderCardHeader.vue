<script>
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons'
const ORDER_TITLES = {
  PRE_REGISTERED: 'PRÉ-REGISTRO',
  PRE_CREATED: 'FALTA CADASTRAR'
}

export default {
  props: {
    order: {
      type: Object,
      default: null
    },
    isExpanded: {
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
  computed: {
    orderTitle () {
      if (this.order.code) {
        return this.order.code
      }

      if (this.order.isPreCreated) {
        return ORDER_TITLES.PRE_CREATED
      }

      return ORDER_TITLES.PRE_REGISTERED
    },
    orderUrl () {
      if (this.order.isPreCreated) {
        return null
      }

      if (!this.order.client) {
        return this.$helpers.getUrl('orders.show.pre-registered', {
          order: this.order.id
        })
      }

      return this.$helpers.getUrl('orders.show', {
        client: this.order.client.id,
        order: this.order.id
      })
    },
  }
}
</script>

<template>
  <div
    class="card-header text-white fw-bold position-relative"
    :class="!isExpanded && 'text-center'"
  >
    <a
      v-if="orderUrl"
      :href="orderUrl"
      target="_blank"
      class="stretched-link"
    />

    <FontAwesomeIcon
      v-show="isExpanded"
      :icon="icons.faBoxOpen"
    />

    {{ orderTitle }}
  </div>
</template>
