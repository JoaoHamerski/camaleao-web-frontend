<script>
import WeeklyCalendar from './index/WeeklyCalendar.vue'

export default {
  metaInfo: {
    title: 'Calendário de Entrega'
  },
  components: {
    WeeklyCalendar
  }
}
</script>

<template>
  <WeeklyCalendar field="DELIVERY_DATE" />
</template>
