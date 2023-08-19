<script>
import { GetProductionPanel } from '@/graphql/OrderControl.gql'
import { isEmpty } from 'lodash-es'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'

import ProductionPanelCard from '../partials/ProductionPanelCard.vue'
import ProductionPanelExpandedCard from '../partials/ProductionPanelExpandedCard.vue'

export default {
  components: {
    ProductionPanelCard,
    ProductionPanelExpandedCard
  },
  apollo: {
    productionPanel: {
      query: GetProductionPanel,
      variables () {
        return {
          first: 10,
          page: this.page
        }
      },
      update (data) {
        return data.productionPanel.map(data => {
          const selectedPeriod = this.sectorSelected && this.sectorDisplayed.id === data.sector.id
            ? this.sectorSelected.selectedPeriod
            : 'day'

          return {
            ...data,
            selectedPeriod
          }
        })
      }
    }
  },
  data () {
    return {
      page: 1,
      sectorDisplayed: {},
      productionPanel: [],
      icons: {
        faSyncAlt
      }
    }
  },
  computed: {
    sectorSelected () {
      if (isEmpty(this.sectorDisplayed)) {
        return null
      }

      const sector = this.findSector(this.sectorDisplayed)

      return sector
    },
    loading () {
      return !!this.$apollo.queries.productionPanel.loading
    }
  },
  methods: {
    isEmpty,
    refresh () {
      this.$apollo.queries.productionPanel.refetch()
    },
    onCloseAllOrders () {
      this.sectorDisplayed = {}
      this.page = 1
    },
    findSector(sector) {
      return this.productionPanel.find(
        data => data.sector.id === sector.id
      )
    },
    onShowSector ({ sector }) {
      this.sectorDisplayed = sector
    },
    onPeriodChanged ({period, sector: sectorToFind}) {
      const sector = this.findSector(sectorToFind)

      this.page = 1

      sector.selectedPeriod = period
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
      <div v-if="!sectorSelected">
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
            v-for="data in productionPanel"
            :key="data.sector.id"
          >
            <ProductionPanelCard
              :selected-period="data.selectedPeriod"
              :sector="data.sector"
              :orders-on-periods="data.orders_on_periods"
              @period-changed="onPeriodChanged"
              @show-sector="onShowSector"
            />
          </div>
        </div>
      </div>
      <ProductionPanelExpandedCard
        v-else
        :sector-data="sectorSelected"
        :page.sync="page"
        @close-all-orders="onCloseAllOrders"
        @period-changed="onPeriodChanged"
      />
    </AppTransition>
  </div>
</template>
