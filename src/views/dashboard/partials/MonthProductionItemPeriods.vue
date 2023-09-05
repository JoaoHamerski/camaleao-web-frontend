<script>
import { faBoxes, faTshirt,  } from '@fortawesome/free-solid-svg-icons';

import DashboardItem from './DashboardItem.vue'
import MonthProductionItemPeriodsWeek from './MonthProductionItemPeriodsWeek.vue'

export default {
  components: {
    DashboardItem,
    MonthProductionItemPeriodsWeek
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    icons: {
      faBoxes,
      faTshirt
    }
  })
}
</script>

<template>
  <div>
    <DashboardItem>
      <template #label>
        <slot name="label" />
      </template>

      <template #text>
        <h1 class="text-success fw-bold mb-0">
          {{ $helpers.toNumber(item.day.orders_count) }}
        </h1>
      </template>

      <template #text-subtitle>
        <div class="fw-bold text-secondary small">
          <div>
            <FontAwesomeIcon
              :icon="icons.faTshirt"
              fixed-width
              class="ms-1"
            /> {{ $helpers.toNumber(item.day.shirts_count) }}
          </div>
          <div>
            <span class="fa-fw ms-1">R$</span> {{ $helpers.toBRL(item.day.receipt).replace('R$', '') }}
          </div>
        </div>
      </template>

      <template #text-secondary>
        <div class="d-flex mt-2">
          <MonthProductionItemPeriodsWeek
            label="SEMANA"
            :week-info="item.week"
          />
          <span class="mx-3" />
          <MonthProductionItemPeriodsWeek
            label="S. ANTERIOR"
            :week-info="item.last_week"
          />
        </div>
      </template>
    </DashboardItem>
  </div>
</template>
