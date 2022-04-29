<script>
import { DateTime } from 'luxon'

export default {
  props: {
    date: {
      type: String,
      required: true
    }
  },
  computed: {
    selectedDateAbbr () {
      return DateTime.fromFormat(
        this.date,
        'dd/MM/y'
      ).toFormat('dd/MM')
    },
    isSelectedDateToday () {
      const now = DateTime.now()
      const selectedDate = DateTime.fromFormat(this.date, 'dd/MM/y')

      return now.hasSame(selectedDate, 'day')
    },
    selectedDateExtended () {
      return DateTime.fromFormat(
        this.date, 'dd/MM/y',
        { locale: 'pt-br' }
      ).toFormat('dd \'de\' LLLL \'de\' yyyy')
    }
  }
}
</script>

<template>
  <div>
    <h5 class="horizontal-line text-center fw-bold mt-3">
      <span
        v-tippy
        :content="selectedDateExtended"
      >{{ selectedDateAbbr }}</span>
    </h5>
    <div
      class="small text-secondary text-center"
    >
      <span v-if="isSelectedDateToday">Fluxo de hoje</span>
      <span v-else>Fluxo antigo</span>
    </div>
  </div>
</template>
