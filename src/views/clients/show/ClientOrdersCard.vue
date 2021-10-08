<script>
import {
  faBoxes,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons'
import { TippyComponent } from 'vue-tippy'
import ClientOrdersCardLegend from './ClientOrdersCardLegend'

export default {
  components: {
    ClientOrdersCardLegend,
    tippy: TippyComponent
  },
  props: {
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
  }
}
</script>

<template>
  <AppCard :has-body-padding="false">
    <template #header>
      <h6 class="mb-0 fw-bold d-flex  justify-content-between">
        <div>
          <FontAwesomeIcon
            :icon="icons.faBoxes"
            class="fa-fw"
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
      />
    </template>
  </AppCard>
</template>
