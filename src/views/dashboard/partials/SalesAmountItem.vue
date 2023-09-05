<script>
import DashboardItem from './DashboardItem.vue';

export default {
  components: {
    DashboardItem
  },
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: true,
    },
    previousValue: {
      type: [String, Number],
      required: true
    },
    icon: undefined
  }
}
</script>

<template>
  <DashboardItem>
    <template #label>
      <FontAwesomeIcon
        :icon="icon"
        fixed-width
        class="text-primary"
      />
      <span class="text-uppercase">{{ label }}</span>
    </template>
    <template #text>
      <h5 class="text-success fw-bold">
        {{ $helpers.toBRL(value) }}
      </h5>
    </template>
    <template #text-secondary>
      Anterior: <b>{{ $helpers.toBRL(previousValue) }}</b>
    </template>
  </DashboardItem>
</template>
