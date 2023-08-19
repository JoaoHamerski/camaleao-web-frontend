<script>
import { isEmpty } from 'lodash-es'
import ProductionPanelOrdersList from './ProductionPanelOrdersList.vue'
import ProductionPanelDaysCount from './ProductionPanelDaysCount.vue'

export default {
  components: {
    ProductionPanelOrdersList,
    ProductionPanelDaysCount
  },
  props: {
    sector: {
      type: Object,
      required: true
    },
    ordersOnPeriods: {
      type: Object,
      required: true
    },
    selectedPeriod: {
      type: String,
      required: true
    }
  },
  computed:  {
    sectorName () {
      if (isEmpty(this.sector.alias)) {
        return this.sector.name
      }

      return this.sector.alias
    }
  },
  methods: {
    onShowSector () {
      this.$emit('show-sector', {
        sector: this.sector
      })
    },
    onPeriodChanged ({ period }) {
      this.$emit('period-changed', {
        period,
        sector: this.sector
      })
    }
  }
}
</script>

<template>
  <AppCard
    class="mb-3"
    color="camaleao"
  >
    <template #header>
      <b>{{ sectorName }}</b>
    </template>
    <template #body>
      <ProductionPanelOrdersList
        :orders="ordersOnPeriods[selectedPeriod].current_orders.data"
        :total="ordersOnPeriods[selectedPeriod].current_orders.paginatorInfo.total"
        @show-sector="onShowSector"
      />
    </template>
    <template #footer>
      <ProductionPanelDaysCount
        :orders-on-periods="ordersOnPeriods"
        :selected-period="selectedPeriod"
        @period-changed="onPeriodChanged"
      />
    </template>
  </AppCard>
</template>
