<script>
import { reverse } from 'lodash-es'
import { DateTime } from 'luxon'

export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  computed: {
    options () {
      const dates = []
      const months = []
      const startDate = DateTime.now().minus({months: 12})
      const endDate = DateTime.now()


      dates.push({ text: 'Últimos 3 meses', value: 'LAST_3_MONTHS'})
      dates.push({ text: 'Últimos 6 meses', value: 'LAST_6_MONTHS'})
      dates.push({ text: 'Ano inteiro', value: 'CURRENT_YEAR'})

      for (let date = startDate; date <= endDate; date = date.plus({ months: 1})) {
        months.push({
          text: date.toFormat('MM/yy'),
          value: date.toFormat('yyyy-MM')
        })
      }

      reverse(months)

      dates.push(...months)

      return dates
    }
  },
  methods: {
    onDateChange (date) {
      this.$emit('date-changed', date)
    }
  }
}
</script>

<template>
  <AppSimpleSelect
    :value="value"
    name="cities_period"
    :options="options"
    label-prop="text"
    value-prop="value"
    @change="onDateChange"
  >
    Período
  </AppSimpleSelect>
</template>
