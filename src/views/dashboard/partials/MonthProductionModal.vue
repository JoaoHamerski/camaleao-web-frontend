<script>
import { faList } from '@fortawesome/free-solid-svg-icons';
import { GetDashboardProductionOrders } from '@/graphql/Dashboard.gql'

import MonthProductionModalOrdersTable from './MonthProductionModalOrdersTable.vue'
import MonthProductionItemPeriods from './MonthProductionItemPeriods.vue'
import MonthProductionItemData from './MonthProductionItemData.vue'
import { isEmpty } from 'lodash-es';

const TYPES = {
  ESTAMPADOS: { label: 'Estampados no dia' },
  COSTURADOS: { label: 'Costurados no dia'},
  MONTH_PRODUCTION: { label: 'Produção no mês'},
  LATE_ORDERS: { label: 'Pedidos atrasados'},
  WAITING_FOR_WITHDRAWAL_ORDERS: { label: 'Aguardando retirada'}
}

export default {
  components: {
    MonthProductionModalOrdersTable,
    MonthProductionItemPeriods,
    MonthProductionItemData
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    },
    productionDate: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  apollo: {
    orders: {
      query: GetDashboardProductionOrders,
      variables () {
        return {
          production_date: this.productionDate,
          type: this.type,
          first: 20,
          page: this.page
        }
      },
      update ({dashboardProductionOrders}) {
        return dashboardProductionOrders
      },
      skip () {
        return !this.value
      },
      fetchPolicy: 'no-cache'
    }
  },
  data: () => ({
    TYPES,
    page: 1,
    orders: {
      data: [],
      paginatorInfo: {}
    },
    icons: {
      faList
    }
  }),
  computed: {
    isLoading () {
      return this.orders.paginatorInfo.currentPage !== this.page || isEmpty(this.orders.paginatorInfo)
    }
  },
  methods: {
    onModalHidden () {
      this.orders.data = [],
      this.orders.paginatorInfo = {}
    }
  }
}
</script>

<template>
  <AppModal
    id="monthProductionModal"
    :value="value"
    v-bind="$attrs"
    modal-dialog-class="modal-lg"
    v-on="$listeners"
    @hidden="onModalHidden"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faList"
        fixed-width
      />
      Lista de pedidos
    </template>
    <template
      v-if="value"
      #body
    >
      <AppLoading v-if="isLoading" />

      <h3 class="text-center fw-bold text-secondary mb-3">
        {{ TYPES[type].label }}
      </h3>

      <div class="d-flex justify-content-center mb-4">
        <MonthProductionItemPeriods
          v-if="['ESTAMPADOS', 'COSTURADOS'].includes(type)"
          :item="data"
        />
        <MonthProductionItemData
          v-else
          :color="type === 'LATE_ORDERS' ? 'danger' : 'success'"
          :item="data"
        />
      </div>

      <MonthProductionModalOrdersTable
        :type="type"
        :orders="orders.data"
      />

      <div class="text-center mt-2">
        <AppPaginator
          v-model="page"
          :pagination="orders.paginatorInfo"
        />
      </div>
    </template>
  </AppModal>
</template>
