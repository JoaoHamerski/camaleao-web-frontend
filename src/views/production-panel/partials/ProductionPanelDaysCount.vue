<script>

const PERIODS = {
  'day': 'dia',
  'week': 'semana',
  'month': 'mês'
}

export default {
  props: {
    selectedPeriod: {
      type: String,
      required: true
    },
    ordersOnPeriods: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      PERIODS,
    }
  },
  computed: {
    periodsAllowed () {
      return Object.keys(PERIODS)
    }
  },
  methods: {
    onPeriodClick (period) {
      this.$emit('period-changed', { period })
    },
  }
}
</script>

<template>
  <div class="d-flex justify-content-between">
    <template
      v-for="(data, period) in ordersOnPeriods"
    >
      <span
        v-if="(periodsAllowed).includes(period)"
        :key="period"
      >
        <span
          v-tippy
          class="badge text-capitalize"
          :class="{
            'bg-success': selectedPeriod === period,
            'bg-link-primary clickable': selectedPeriod !== period
          }"
          :content="`Anterior: ${data.previous_count}`"
          @click="onPeriodClick(period)"
        >
          {{ PERIODS[period] }}: {{ data.current_count }}
        </span>
      </span>
    </template>
  </div>
</template>
