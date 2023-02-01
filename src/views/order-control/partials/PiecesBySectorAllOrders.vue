<script>
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'

import PiecesBySectorDaysCount from './PiecesBySectorDaysCount.vue'
import PiecesBySectorOrdersTable from './PiecesBySectorOrdersTable.vue'

export default {
  components: {
    PiecesBySectorDaysCount,
    PiecesBySectorOrdersTable
  },
  props: {
    sectorPieces: {
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
      return this.sectorPieces.sector
    },
    pieces () {
      return this.sectorPieces.pieces
    },
    selectedDate () {
      return this.sectorPieces.selectedDate
    },
    orders () {
      return this.pieces[this.selectedDate]?.current_orders?.data || []
    },
    pagination () {
      return this.pieces[this.selectedDate]?.current_orders?.paginatorInfo || {}
    },
  },
  methods: {
    onDateSelected ({ date }) {
      this.$emit('date-selected', {
        sector: this.sector,
        date
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
      {{ sector.name }}
    </h5>

    <div class="col col-sm-4 my-3">
      <PiecesBySectorDaysCount
        :pieces="pieces"
        :selected-date="selectedDate"
        @date-selected="onDateSelected"
      />
    </div>

    <PiecesBySectorOrdersTable
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
