<script>
import DashboardItem from './DashboardItem.vue'
import { faBoxes, faTshirt } from '@fortawesome/free-solid-svg-icons';

export default {
  components: {
    DashboardItem
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
        <h1 class="fw-bold">
          {{ $helpers.toNumber(item.orders_count.day) }}
        </h1>
      </template>
      <template #text-secondary>
        <div>
          <span>Semana: </span>
          <span>
            <FontAwesomeIcon
              :icon="icons.faBoxes"
              fixed-width
            />
            {{ $helpers.toNumber(item.orders_count.week) }}
          </span>
          <span class="mx-2">|</span>
          <span>{{ $helpers.toBRL(item.receipt.week) }}</span>
        </div>
        <div>
          <span>S. anterior: </span>
          <span><FontAwesomeIcon
                  :icon="icons.faBoxes"
                  fixed-width
                />
            {{ $helpers.toNumber(item.orders_count.last_week) }}
          </span>
          <span class="mx-2">|</span>
          <span>{{ $helpers.toBRL(item.receipt.last_week) }}</span>
        </div>
      </template>
    </DashboardItem>
  </div>
</template>
