<script>
import OrderStatusProgressItem from './OrderStatusProgressItem.vue'
import  { faTasks } from '@fortawesome/free-solid-svg-icons'

export default {
  components: {
    OrderStatusProgressItem
  },
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      icons: {
        faTasks
      },
    }
  },
  computed: {
    status () {
      if (this.order.closed_at) {
        return JSON.parse(this.order.final_status)
      }

      return this.order.linked_status
    }
  }
}
</script>

<template>
  <AppContainer collapsible>
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faTasks"
        fixed-width
      />
      Controle de Pedido
    </template>

    <template #body>
      <ul
        class="list-group list-group-flush"
      >
        <template v-if="!order.closed_at">
          <OrderStatusProgressItem
            v-for="_status in status"
            :key="_status.id"
            :status="_status"
          />
        </template>
        <template v-else>
          <OrderStatusProgressItem
            v-for="_status in status"
            :key="_status.id"
            :status="_status"
          />
        </template>
      </ul>
    </template>
  </AppContainer>
</template>
