<script>
import WeeklyCalendar from './index/WeeklyCalendar.vue'

export default {
  metaInfo: {
    title: 'Costura - Calendário Semanal'
  },
  components: {
    WeeklyCalendar
  }
}
</script>

<template>
  <WeeklyCalendar field="SEAM_DATE" />
</template>
