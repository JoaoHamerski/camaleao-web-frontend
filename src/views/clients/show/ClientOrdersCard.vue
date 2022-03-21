<script>
import { faBoxes } from '@fortawesome/free-solid-svg-icons'

import OrdersQuestionIconTippy from '@/views/orders/partials/OrdersQuestionIconTippy'
export default {
  components: {
    OrdersQuestionIconTippy
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    orders: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      icons: {
        faBoxes
      }
    }
  },
  computed: {
    headers () {
      return [
        { text: 'Código', value: 'code' },
        { text: 'Valor total', value: 'price', format: 'currencyBRL' },
        { text: 'Total pago', value: 'total_paid', format: 'currencyBRL' },
        { text: 'Quantidade', value: 'quantity', align: 'center' },
        { text: 'Data de produção', value: 'production_date', align: 'center', format: 'datetime' },
        { text: 'Data de entrega', value: 'delivery_date', align: 'center', format: 'datetime' }
      ]
    }
  },
  methods: {
    rowClass (order) {
      if (order.states.includes('PRE-REGISTERED')) {
        return 'table-warning'
      }

      if (order.states.includes('CLOSED')) {
        return 'table-secondary'
      }

      if (order.states.includes('PAID')) {
        return 'table-success'
      }

      return ''
    },
    tableRowRoute (item) {
      return {
        name: 'orders.show',
        params: this.$helpers.getRouteParams({
          client: this.$route.params.clientKey,
          order: item.id
        })
      }
    }
  }
}
</script>

<template>
  <AppCard
    :has-body-padding="false"
    :is-loading="isLoading"
  >
    <template #header>
      <h6 class="mb-0 fw-bold d-flex justify-content-between">
        <div>
          <FontAwesomeIcon
            :icon="icons.faBoxes"
            class="fa-fw fw-bold"
          />
          Pedidos
        </div>
        <OrdersQuestionIconTippy />
      </h6>
    </template>
    <template #body>
      <AppTable
        :headers="headers"
        :items="orders"
        :row-class="rowClass"
        :route="tableRowRoute"
      />
    </template>
  </AppCard>
</template>
