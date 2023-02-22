<script>
import { GetSectorsPieces } from '@/graphql/OrderControl.gql'
import { isEmpty } from 'lodash-es'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'

import PiecesBySectorCard from '../partials/PiecesBySectorCard.vue'
import PiecesBySectorAllOrders from '../partials/PiecesBySectorAllOrders.vue'

export default {
  components: {
    PiecesBySectorCard,
    PiecesBySectorAllOrders
  },
  apollo: {
    sectorsPieces: {
      query: GetSectorsPieces,
      variables () {
        return {
          first: 10,
          page: this.page
        }
      },
      update (data) {
        return data.sectorsPieces.map(sectorPieces => {
          const selectedDate = this.sectorPiecesDisplayed && this.sectorDisplayed.id === sectorPieces.sector.id
            ? this.sectorPiecesDisplayed.selectedDate
            : 'day'

          return {
            ...sectorPieces,
            selectedDate
          }
        })
      }
    }
  },
  data () {
    return {
      page: 1,
      sectorDisplayed: {},
      sectorsPieces: [],
      icons: {
        faSyncAlt
      }
    }
  },
  computed: {
    sectorPiecesDisplayed () {
      if (isEmpty(this.sectorDisplayed)) {
        return false
      }

      const sectorPieces = this.getSectorPiecesBySector(this.sectorDisplayed)

      return sectorPieces
    },
    loading () {
      return !!this.$apollo.queries.sectorsPieces.loading
    }
  },
  methods: {
    isEmpty,
    refresh () {
      this.$apollo.queries.sectorsPieces.refetch()
    },
    onCloseAllOrders () {
      this.sectorDisplayed = {}
      this.page = 1
    },
    getSectorPiecesBySector(sector) {
      return this.sectorsPieces.find(
        sectorPieces => sectorPieces.sector.id === sector.id
      )
    },
    onShowSector ({ sector }) {
      this.sectorDisplayed = sector
    },
    onDateSelected ({date, sector}) {
      const sectorPieces = this.getSectorPiecesBySector(sector)

      this.page = 1

      sectorPieces.selectedDate = date
    }
  }
}
</script>

<template>
  <div>
    <AppLoading v-show="loading" />

    <AppTransition
      enter="fadeIn"
      mode="out-in"
    >
      <div v-if="!sectorPiecesDisplayed">
        <AppButton
          class="mb-2"
          :icon="icons.faSyncAlt"
          outlined
          @click.prevent="refresh"
        />
        <div
          class="row row-cols-1 row-cols-sm-3"
        >
          <div
            v-for="sectorPieces in sectorsPieces"
            :key="sectorPieces.sector.id"
          >
            <PiecesBySectorCard
              :selected-date="sectorPieces.selectedDate"
              :sector="sectorPieces.sector"
              :pieces="sectorPieces.pieces"
              @date-selected="onDateSelected"
              @show-sector="onShowSector"
            />
          </div>
        </div>
      </div>
      <PiecesBySectorAllOrders
        v-else
        :sector-pieces="sectorPiecesDisplayed"
        :page.sync="page"
        @close-all-orders="onCloseAllOrders"
        @date-selected="onDateSelected"
      />
    </AppTransition>
  </div>
</template>
