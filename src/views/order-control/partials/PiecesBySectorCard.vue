<script>
import PiecesBySectorOrdersList from './PiecesBySectorOrdersList.vue'
import PiecesBySectorDaysCount from './PiecesBySectorDaysCount.vue'

export default {
  components: {
    PiecesBySectorOrdersList,
    PiecesBySectorDaysCount
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
    color="secondary"
  >
    <template #header>
      <b>{{ sector.name }}</b>
    </template>
    <template #body>
      <PiecesBySectorOrdersList
        :orders="pieces[selectedDate].current_orders.data"
        :total="pieces[selectedDate].current_orders.paginatorInfo.total"
        @show-sector="onShowSector"
      />
    </template>
    <template #footer>
      <PiecesBySectorDaysCount
        :pieces="pieces"
        :selected-date="selectedDate"
        @date-selected="onDateSelected"
      />
    </template>
  </AppCard>
</template>
