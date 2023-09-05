<script>
import { TippyComponent } from 'vue-tippy';
import MonthProductionModalOrdersTableStatus from './MonthProductionModalOrdersTableStatus.vue'
import { sumBy } from 'lodash-es';

export default {
  components: {
    Tippy: TippyComponent,
    MonthProductionModalOrdersTableStatus
  },
  props: {
    type: {
      type: String,
      default: ''
    },
    orders: {
      type: Array,
      default: () => []
    },
  },
  computed: {
    headers () {
      const headers = [
        {text: 'Cod.', value: 'code'},
        {text: 'Valor', value: 'price', format: 'currencyBRL'},
        {text: 'Qtd.', value: 'quantity'},

      ]

      if (['ESTAMPADOS', 'COSTURADOS', 'MONTH_PRODUCTION', 'WAITING_FOR_WITHDRAWAL_ORDERS'].includes(this.type)) {
        headers.push({
          text: 'Cadastro em',
          value: 'created_at',
          format: 'datetime',
          formatting: 'dd/mm/yyyy'
        })
      }

      if (this.type === 'LATE_ORDERS') {
        headers.push({
          text: 'Data de entrega',
          value: 'delivery_date',
          format: 'datetime'
        })
      }

      headers.push({text: 'Status', value: 'linked-status', align: 'center'})
      return headers
    },
    totals () {
      return {
        price: sumBy(this.orders, 'price'),
        quantity: sumBy(this.orders, 'quantity')
      }
    }
  },
  methods: {
    tableRowRoute (item) {
      return {
        name: 'orders.show',
        params: this.$helpers.getRouteParams({
          client: item.client.id,
          order: item.id
        })
      }
    }
  }
}
</script>

<template>
  <AppTable
    table-class="table-sm"
    :items="orders"
    :headers="headers"
    :route="tableRowRoute"
    open-in-new-tab
  >
    <template #[`items.linked-status`]="{ item }">
      <span
        class="fw-bold link-primary"
        :name="`status_trigger-${item.id}`"
      >VER</span>
      <Tippy
        :to="`status_trigger-${item.id}`"
        placement="left"
      >
        <MonthProductionModalOrdersTableStatus :linked-status="item.linked_status" />
      </Tippy>
    </template>

    <template #bodyAppend>
      <tr class="table-primary fw-bold">
        <td>
          TOTAL NESTA PÁGINA
        </td>
        <td>{{ $helpers.toBRL(totals.price) }}</td>
        <td>{{ $helpers.toNumber(totals.quantity) }}</td>
        <td />
        <td />
      </tr>
    </template>
  </AppTable>
</template>
