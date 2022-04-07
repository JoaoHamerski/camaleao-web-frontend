<script>
import {
  formatCurrencyBRL,
  formatDatetime
} from '@/utils/formatters'

export default {
  props: {
    color: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: true
    },
    icon: {
      type: Object,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    dateTooltip: {
      type: String,
      default: 'Data'
    }
  },
  methods: {
    formatCurrencyBRL,
    formatDatetime
  }
}
</script>

<template>
  <div>
    <div class="d-flex position-relative">
      <div class="position-absolute">
        <FontAwesomeIcon
          :icon="icon"
          :class="`text-${color}`"
          size="3x"
        />
      </div>
      <h3 :class="`col fw-bold text-${color} text-center`">
        {{ formatCurrencyBRL(value) }}
      </h3>
    </div>

    <div
      v-tippy="{
        placement: 'bottom'
      }"
      class="text-center text-secondary fw-bold"
      :content="dateTooltip"
    >
      {{ formatDatetime(date) }}
    </div>
  </div>
</template>
