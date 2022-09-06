<script>
import SectorOrdersListImage from './SectorOrdersListImage.vue'
import SectorOrdersListInfo from './SectorOrdersListInfo.vue'
import SectorOrdersListStatus from './SectorOrdersListStatus.vue'

export default {
  components: {
    SectorOrdersListImage,
    SectorOrdersListInfo,
    SectorOrdersListStatus
  },
  props: {
    status: {
      type: Array,
      default: () => ([])
    },
    orders: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<template>
  <div>
    <div
      v-for="order in orders"
      :key="order.id"
      class="card mb-1"
    >
      <div class="card-body card-sector-body p-1 row gx-2">
        <div class="col-3">
          <SectorOrdersListImage :image="order.art_paths" />
        </div>
        <div class="col">
          <SectorOrdersListInfo :order="order" />
          <SectorOrdersListStatus
            :order="order"
            :status="status"
            :concluded-status="order.concluded_status"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-sector-body {
  min-height: 170px;
}
</style>
