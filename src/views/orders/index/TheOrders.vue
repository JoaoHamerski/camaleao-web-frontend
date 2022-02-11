<script>
import { faBoxes, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { TippyComponent } from 'vue-tippy'
import { ordersIndex } from '@/graphql/Orders.gql'
import { QUERIES } from './constants'

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
  apollo: {
    orders: {
      query: ordersIndex,
      variables () {
        return { ...this.params }
      }
    }
  },
  data () {
    return {
      code: '',
      buttonSelected: 'priority',
      params: {
        page: 1,
        ...QUERIES.OLDER
      },
      orders: {
        data: [],
        paginatorInfo: {}
      },
      icons: {
        faBoxes,
        faQuestionCircle
      }
    }
  },
  computed: {
    isLoading () {
      return !!this.$apollo.queries.orders.loading
    },
    headers () {
      return [
        { text: 'Cliente', value: 'client' },
        { text: 'Cód. pedido', value: 'code' },
        { text: 'Quantidade', value: 'quantity' },
        { text: 'Valor total', value: 'price', format: 'currencyBRL' },
        { text: 'Total pago', value: 'total_paid', format: 'currencyBRL' },
        { text: 'Produção', value: 'producton_date', format: 'datetime' },
        { text: 'Entrega', value: 'delivery_date', format: 'datetime' }
      ]
    }
  },
  methods: {
    onFilterButtonsChanged (value) {
      const query = QUERIES[value.toUpperCase()]

      this.code = ''

      this.params = { ...this.params, ...query }
    },
    onCodeSearch (code) {
      this.buttonSelected = ''

      this.params = {
        ...this.params,
        where: {
          column: 'CODE', operator: 'LIKE', value: `%${code}%`
        }
      }
    },
    onSearchClear () {
      if (this.buttonSelected === '') {
        this.buttonSelected = 'priority'
        this.code = ''
        this.onFilterButtonsChanged(this.buttonSelected)
        return
      }

      this.onFilterButtonsChanged(this.buttonSelected)
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
      v-model="buttonSelected"
      class="mb-3"
      @filter-changed="onFilterButtonsChanged"
    />

    <FilterSearchInput
      v-model="code"
      class="mb-3"
      @search="onCodeSearch"
      @clear-search="onSearchClear"
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
          :items="orders.data"
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
      v-model="params.page"
      class="mt-2"
      :is-loading="isLoading"
      :pagination="orders.paginatorInfo"
    />
  </div>
</template>
