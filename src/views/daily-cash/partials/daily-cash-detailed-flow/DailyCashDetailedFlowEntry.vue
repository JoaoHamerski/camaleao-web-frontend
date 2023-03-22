<script>
import { faBox, faTshirt } from '@fortawesome/free-solid-svg-icons'

import DailyCashDetailedFlowEntryTable from './DailyCashDetailedFlowEntryTable.vue'

export default {
  components: {
    DailyCashDetailedFlowEntryTable
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      icons: {
        faBox,
        faTshirt
      }
    }
  }
}
</script>
<template>
  <div class="col mb-2 mb-sm-0">
    <div class="fw-bold">
      ENTRADAS
    </div>
    <h2 class="fw-bold text-success mb-0 text-nowrap">
      {{ $helpers.toBRL(item.entry.total) }}
    </h2>
    <div class="small">
      <div class="text-nowrap">
        <FontAwesomeIcon
          :icon="icons.faBox"
          fixed-width
        />
        Média <b>por pedido</b>:
        <span class="text-info fw-bold">
          {{ $helpers.toBRL(item.entry.orders_price_avg) }}
        </span>
      </div>
      <div class="text-nowrap">
        <FontAwesomeIcon
          :icon="icons.faTshirt"
          fixed-width
        />
        Média <b>por camisa</b>:
        <span class="text-info fw-bold">
          {{ $helpers.toBRL(item.entry.unities_avg) }}
        </span>
      </div>
      <div>
        <DailyCashDetailedFlowEntryTable :item="item" />
      </div>
    </div>
  </div>
</template>
