<script>
import { faBoxes } from '@fortawesome/free-solid-svg-icons'
import { GetOrdersSimplified } from '@/graphql/Order.gql'
import { QUERIES } from './constants'

import TheOrdersTable from './TheOrdersTable.vue'
import FilterSearchInput from './partials/FilterSearchInput.vue'
import FilterSortButtons from './partials/FilterSortButtons.vue'
import FilterGeneralReportCard from './partials/FilterGeneralReportCard.vue'
import OrdersQuestionIconTippy from '@/views/orders/partials/OrdersQuestionIconTippy.vue'
import FilterPrintDateReportCard from './partials/FilterPrintDateReportCard.vue'

export default {
  components: {
    FilterGeneralReportCard,
    FilterPrintDateReportCard,
    FilterSortButtons,
    FilterSearchInput,
    TheOrdersTable,
    OrdersQuestionIconTippy
  },
  metaInfo () {
    return {
      title: 'Pedidos'
    }
  },
  apollo: {
    orders: {
      query: GetOrdersSimplified,
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
        ...QUERIES.PRIORITY
      },
      modalReport: {
        value: false,
        src: '',
        title: 'Relatório'
      },
      orders: {
        data: [],
        paginatorInfo: {}
      },
      icons: {
        faBoxes
      }
    }
  },
  computed: {
    isLoading () {
      return !!this.$apollo.queries.orders.loading
    },
    hasSearchMade () {
      return this.buttonSelected === ''
    }
  },
  methods: {
    onFilterButtonsChanged (value) {
      const query = QUERIES[value.toUpperCase()]

      this.code = ''

      this.params = { ...this.params, ...query, page: 1 }
    },
    onCodeSearch () {
      this.buttonSelected = ''

      this.params = {
        page: 1,
        order: [{ column: 'created_at', order: 'DESC' }],
        where: {
          column: 'CODE', operator: 'LIKE', value: `%${this.code}%`
        }
      }
    },
    restartFilter () {
      this.buttonSelected = 'priority'
      this.code = ''
    },
    onSearchClear () {
      if (this.hasSearchMade) {
        this.restartFilter()
      }

      this.onFilterButtonsChanged(this.buttonSelected)
    },
    onReportGenerated ({src, title}) {
      this.modalReport.title = title
      this.modalReport.src = src
      this.modalReport.value = true
    },
    onCloseModalReport () {
      this.modalReport.src = ''
    }
  }
}
</script>

<template>
  <div class="mx-auto py-5">
    <FilterGeneralReportCard
      class="mb-2"
      @report-generated="onReportGenerated"
    />

    <FilterPrintDateReportCard
      class="mb-2"
      @report-generated="onReportGenerated"
    />

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

    <AppFileModal
      id="orderReport"
      v-model="modalReport.value"
      :src="modalReport.src"
      :title="modalReport.title"
      @hidden="onCloseModalReport"
    />

    <AppCard :has-body-padding="false">
      <template #header>
        <div class="d-flex justify-content-between align-items-baseline">
          <h6 class="fw-bold mb-0">
            <FontAwesomeIcon
              :icon="icons.faBoxes"
              fixed-width
            />
            Todos os pedidos
          </h6>
          <OrdersQuestionIconTippy />
        </div>
      </template>

      <template #body>
        <AppLoading v-if="isLoading" />

        <TheOrdersTable :items="orders.data" />
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
