<script>
import {
  faBoxes,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons'
import { TippyComponent } from 'vue-tippy'
import ClientOrdersCardLegend from './ClientOrdersCardLegend'

const STATE_CLASSES = {
  PAID: 'table-success',
  CLOSED: 'table-secondary',
  'PRE-REGISTERED': 'table-warning'
}

export default {
  components: {
    ClientOrdersCardLegend,
    tippy: TippyComponent
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
        { text: 'Valor total', value: 'price', format: 'money' },
        { text: 'Total pago', value: 'total_paid', format: 'money' },
        { text: 'Quantidade', value: 'quantity', align: 'center' },
        { text: 'Data de produção', value: 'production_date', align: 'center' },
        { text: 'Data de entrega', value: 'delivery_date', align: 'center' }
      ]
    }
  },
  methods: {
    rowClass (order) {
      return STATE_CLASSES[order.state] || false
    },
    redirectToOrder ({ code }) {
      this.$router.push({
        name: 'orders.show',
        params: {
          client: this.$route.params.client,
          order: code
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
          <tippy
            to="icon-question"
            placement="bottom"
            arrow
            theme="light-border"
            :duration="150"
          >
            <ClientOrdersCardLegend />
          </tippy>
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
        @click:item="redirectToOrder"
      />
    </template>
  </AppCard>
</template>
