<script>
import { faBoxes, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { TippyComponent } from 'vue-tippy'

import FilterGeneralReportCard from './partials/FilterGeneralReportCard'
import FilterProductionDateReportCard from './partials/FilterProductionDateReportCard'
import FilterSortButtons from './partials/FilterSortButtons'
import OrdersListLegend from '../../orders/partials/OrdersListLegend'
import FilterSearchInput from './partials/FilterSearchInput'

export default {
  components: {
    Tippy: TippyComponent,
    FilterGeneralReportCard,
    FilterProductionDateReportCard,
    FilterSortButtons,
    FilterSearchInput,
    OrdersListLegend
  },
  metaInfo () {
    return {
      title: 'Pedidos'
    }
  },
  chimera: {
    _orders () {
      return {
        method: 'GET',
        url: 'api/orders',
        params: {
          client: true,
          page: this.page,
          sort: this.sort,
          code: this.code
        },
        on: {
          error ({ error }) {
            console.log(error)
          }
        }
      }
    }
  },
  data () {
    return {
      page: 1,
      sort: 'priority',
      code: '',
      icons: {
        faBoxes,
        faQuestionCircle
      }
    }
  },
  computed: {
    headers () {
      return [
        { text: 'Cliente', value: 'client' },
        { text: 'Cód. pedido', value: 'code' },
        { text: 'Quantidade', value: 'quantity' },
        { text: 'Valor total', value: 'price', format: 'currencyBRL' },
        { text: 'Total pago', value: 'total_paid', format: 'currencyBRL' },
        { text: 'Produção', value: 'producton_date', format: 'date' },
        { text: 'Entrega', value: 'delivery_date', format: 'date' }
      ]
    },
    orders () {
      return this.$chimera._orders?.data?.data || []
    },
    pagination () {
      return this.$chimera._orders?.data?.meta || ({})
    },
    isLoading () {
      return this.$chimera._orders.loading
    }
  },
  methods: {
    onFilterButtonsChanged (value) {
      this.sort = value
    },
    onCodeSearch (code) {
      this.code = code
    },
    orderClass (order) {
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
    redirectToOrder (order) {
      this.$router.push({
        name: 'orders.show',
        params: {
          clientKey: order.client.id,
          orderKey: order.code
        }
      })
    },
    orderUrl (order) {
      const resolvedRoute = this.$router.resolve({
        name: 'orders.show',
        params: {
          clientKey: order.client.id,
          orderKey: order.code
        }
      })

      return resolvedRoute.href
    }
  }
}
</script>

<template>
  <div class="mx-auto mt-5">
    <FilterGeneralReportCard class="mb-2" />
    <FilterProductionDateReportCard class="mb-2" />

    <FilterSortButtons
      class="mb-3"
      @filter-changed="onFilterButtonsChanged"
    />

    <FilterSearchInput
      class="mb-3"
      @code="onCodeSearch"
    />

    <AppCard :has-body-padding="false">
      <template #header>
        <div class="d-flex justify-content-between">
          <h6 class="fw-bold mb-0">
            <FontAwesomeIcon
              :icon="icons.faBoxes"
              fixed-width
            /> Todos os pedidos
          </h6>
          <tippy
            to="icon-question"
            placement="bottom"
            arrow
            theme="light-border"
            :duration="150"
          >
            <OrdersListLegend />
          </tippy>
          <FontAwesomeIcon
            name="icon-question"
            :icon="icons.faQuestionCircle"
          />
        </div>
      </template>

      <template #body>
        <AppLoading v-if="isLoading" />

        <AppTable
          :headers="headers"
          :items="orders"
          :row-url="orderUrl"
          :row-class="orderClass"
          @click:item="redirectToOrder"
        >
          <template #[`items.client`]="{ item }">
            {{ item.client.name }}
          </template>
        </AppTable>
      </template>
    </AppCard>

    <AppPaginator
      class="mt-2"
      :pagination="pagination"
      :page.sync="page"
    />
  </div>
</template>
