<script>
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { isEmpty } from 'lodash-es'

import ProductionPanelDaysCount from './ProductionPanelDaysCount.vue'
import ProductionPanelOrdersTable from './ProductionPanelOrdersTable.vue'

export default {
  components: {
    ProductionPanelDaysCount,
    ProductionPanelOrdersTable
  },
  props: {
    sectorData: {
      type: Object,
      required: true
    },
    page: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      icons: {
        faArrowCircleLeft
      }
    }
  },
  computed: {
    sector () {
      return this.sectorData.sector
    },
    periods () {
      return this.sectorData.orders_on_periods
    },
    selectedPeriod () {
      return this.sectorData.selectedPeriod
    },
    orders () {
      return this.periods[this.selectedPeriod]?.current_orders?.data || []
    },
    pagination () {
      return this.periods[this.selectedPeriod]?.current_orders?.paginatorInfo || {}
    },
    sectorName () {
      if (isEmpty(this.sector.alias)) {
        return this.sector.name
      }

      return this.sector.alias
    }
  },
  methods: {
    isEmpty,
    onPeriodChanged ({ period }) {
      this.$emit('period-changed', {
        sector: this.sector,
        period
      })
    },
    onBackClick () {
      this.$emit('close-all-orders')
    }
  }
}
</script>
<template>
  <div>
    <AppButton
      :icon="icons.faArrowCircleLeft"
      outlined
      @click.prevent="onBackClick"
    >
      Voltar
    </AppButton>
    <h5 class="text-primary fw-bold mt-2">
      {{ sectorName }}
    </h5>

    <div class="col col-sm-4 my-3">
      <ProductionPanelDaysCount
        :orders-on-periods="periods"
        :selected-period="selectedPeriod"
        @period-changed="onPeriodChanged"
      />
    </div>

    <ProductionPanelOrdersTable
      :orders="orders"
      class="my-2"
    />

    <AppPaginator
      :value="page"
      :pagination="pagination"
      @input="$emit('update:page', $event)"
    />
  </div>
</template>
