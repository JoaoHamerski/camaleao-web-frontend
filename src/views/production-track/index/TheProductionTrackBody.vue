<script>
import { GetOrdersBySector } from '@/graphql/OrderControl.gql'

import TheProductionTrackNavs from './TheProductionTrackNavs.vue'
import SectorOrdersList from '../partials/SectorOrdersList.vue'

export default {
  apollo: {
    ordersBySector: {
        query: GetOrdersBySector,
        variables() {
          return {
            first: 10,
            page: this.page,
            sectorId: this.sector.id,
            order_by: [{
              column: 'DELIVERY_DATE',
              order: 'ASC'
            }]
          }
        },
        skip() {
          return this.skip
        }
    }
  },
  components: {
    TheProductionTrackNavs,
    SectorOrdersList
  },
  data () {
    return {
      ordersBySector: {
        data: [],
        paginatorInfo: {}
      },
      page: 1,
      sectors: [],
      sector: {},
      skip: true,
    }
  },
  computed: {
    sectorStatus () {
      const sector = this.sectors.filter(sector => sector.id === this.sector.id)[0]

      return {
        items: sector.status,
        next_status: sector.next_status
      }
    },
    isLoading () {
      return !!this.$apollo.queries.ordersBySector.loading
    }
  },
  watch: {
    page () {
      this.$refs.scrollableDiv.scrollTop = 0
    }
  },
  methods: {
    refresh () {
      this.$apollo.queries.ordersBySector.refetch()
    },
    onSectorChange (sector) {
      this.sector = sector
      this.skip = false
      this.page = 1
    },
    onSectorsLoaded (sectors) {
      this.sectors = sectors
    },
  }
}
</script>

<template>
  <div class="card mt-2">
    <div class="card-header p-0">
      <TheProductionTrackNavs
        @sector-change="onSectorChange"
        @sectors-loaded="onSectorsLoaded"
      />
    </div>
    <div
      ref="scrollableDiv"
      class="card-body position-relative card-sector-body custom-scrollbar smooth-scroll"
    >
      <AppLoading
        v-show="isLoading"
      />

      <div
        v-if="!ordersBySector.data.length"
        class="text-center text-secondary my-3"
      >
        Nenhum pedido encontrado
      </div>

      <SectorOrdersList
        v-else
        :can-close-orders="sector.can_close_sector_orders"
        :sector-status="sectorStatus"
        :orders="ordersBySector.data"
      />

      <AppPaginator
        v-model="page"
        :style="{
          zIndex: 100
        }"
        class="position-fixed bottom-0"
        :pagination="ordersBySector.paginatorInfo"
        :is-loading="isLoading"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-sector-body {
  height: 70vh;
  overflow: auto;
}
</style>
