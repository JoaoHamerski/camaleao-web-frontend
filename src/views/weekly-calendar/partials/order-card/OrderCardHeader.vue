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
        const resolvedRoute = this.$router.resolve({
          name: 'orders.show.pre-registered',
          params: {
            orderKey: this.order.id
          }
        })

        return resolvedRoute.href
      }

      const resolvedRoute = this.$router.resolve({
        name: 'orders.show',
        params: {
          clientKey: this.order.client.id,
          orderKey: this.order.id
        }
      })

      return resolvedRoute.href
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
