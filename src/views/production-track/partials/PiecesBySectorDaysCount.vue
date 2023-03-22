<script>

const DATES = {
  'day': 'dia',
  'week': 'semana',
  'month': 'mês'
}

export default {
  props: {
    selectedDate: {
      type: String,
      required: true
    },
    pieces: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      DATES,
    }
  },
  computed: {
    datesAllowed () {
      return Object.keys(DATES)
    }
  },
  methods: {
    onDateClick (date) {
      this.$emit('date-selected', { date })
    },
  }
}
</script>

<template>
  <div class="d-flex justify-content-between">
    <template
      v-for="(datePieces, date) in pieces"
    >
      <span
        v-if="(datesAllowed).includes(date)"
        :key="date"
      >
        <span
          v-tippy
          class="badge text-capitalize"
          :class="{
            'bg-success': selectedDate === date,
            'bg-link-primary clickable': selectedDate !== date
          }"
          :content="`Anterior: ${datePieces.previous}`"
          @click="onDateClick(date)"
        >
          {{ DATES[date] }}: {{ datePieces.current }}
        </span>
      </span>
    </template>
  </div>
</template>
