<script>
import DashboardItem from './DashboardItem.vue'

export default {
  components: {
    DashboardItem
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
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
        Semana: {{ $helpers.toNumber(item.orders_count.week) }}
        <span v-if="item.receipt.week">({{ $helpers.toBRL(item.receipt.week) }})</span>
      </div>
      <div>
        S. anterior: {{ $helpers.toNumber(item.orders_count.last_week) }}
        <span v-if="item.receipt.last_week">({{ $helpers.toBRL(item.receipt.last_week) }})</span>
      </div>
    </template>
  </DashboardItem>
</template>
