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
      {{ label }}
    </template>
    <template #text>
      {{ $helpers.toBRL(value) }}
    </template>
    <template #text-secondary>
      Anterior: <b>{{ $helpers.toBRL(previousValue) }}</b>
    </template>
  </DashboardItem>
</template>
