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
    pieces: {
      type: Object,
      required: true
    },
    selectedDate: {
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
    onDateSelected ({ date }) {
      this.$emit('date-selected', {
        date,
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
        :orders="pieces[selectedDate].current_orders.data"
        :total="pieces[selectedDate].current_orders.paginatorInfo.total"
        @show-sector="onShowSector"
      />
    </template>
    <template #footer>
      <ProductionPanelDaysCount
        :pieces="pieces"
        :selected-date="selectedDate"
        @date-selected="onDateSelected"
      />
    </template>
  </AppCard>
</template>
