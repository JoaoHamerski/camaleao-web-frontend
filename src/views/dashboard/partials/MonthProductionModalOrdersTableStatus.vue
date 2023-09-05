<script>
import { formatDatetime } from '@/utils/formatters';

export default {
  props: {
    linkedStatus: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    formatDatetime
  }
}
</script>

<template>
  <div class="text-start">
    <ul class="list-group list-group-sm">
      <li
        v-for="status in linkedStatus"
        :key="status.id"
        class="list-group-item"
        :class="{
          'text-success fw-bold': status.pivot.is_confirmed
        }"
      >
        <div class>
          {{ status.text }}
        </div>
        <div class="text-secondary extra-small">
          {{ formatDatetime(status.pivot.confirmed_at) }}
        </div>
      </li>
    </ul>
  </div>
</template>
