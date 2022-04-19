<script>
import WeeklyCalendar from './index/WeeklyCalendar.vue'

export default {
  metaInfo: {
    title: 'Estampa - Calendário Semanal'
  },
  components: {
    WeeklyCalendar
  }
}
</script>

<template>
  <WeeklyCalendar field="PRINT_DATE" />
</template>
