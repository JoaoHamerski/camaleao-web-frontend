<script>
import {
  faBoxes,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons'
import { TippyComponent } from 'vue-tippy'
import OrdersListLegend from '../../orders/partials/OrdersListLegend'

export default {
  components: {
    OrdersListLegend,
    Tippy: TippyComponent
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
        faBoxes,
        faQuestionCircle
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
        { text: 'Data de produção', value: 'production_date', align: 'center', format: 'date' },
        { text: 'Data de entrega', value: 'delivery_date', align: 'center', format: 'date' }
      ]
    }
  },
  methods: {
    orderUrl (order) {
      const resolvedRoute = this.$router.resolve({
        name: 'orders.show',
        params: {
          clientKey: this.$route.params.clientKey,
          orderKey: order.code
        }
      })

      return resolvedRoute.href
    },
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
    redirectToOrder ({ code }) {
      this.$router.push({
        name: 'orders.show',
        params: {
          clientKey: this.$route.params.clientKey,
          orderKey: code
        }
      })
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
        <div>
          <Tippy
            to="icon-question"
            placement="bottom"
            arrow
            theme="light-border"
            :duration="150"
          >
            <OrdersListLegend />
          </Tippy>
          <FontAwesomeIcon
            name="icon-question"
            :icon="icons.faQuestionCircle"
          />
        </div>
      </h6>
    </template>
    <template #body>
      <AppTable
        :headers="headers"
        :items="orders"
        :row-class="rowClass"
        :row-url="orderUrl"
        @click:item="redirectToOrder"
      />
    </template>
  </AppCard>
</template>
