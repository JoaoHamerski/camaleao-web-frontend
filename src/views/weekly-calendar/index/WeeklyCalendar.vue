<script>
import { uniqueId, cloneDeep } from 'lodash-es'
import { GetWeeklyCalendarOrders } from '@/graphql/WeeklyCalendar.gql'
import { DateTime } from 'luxon'

import WeeklyCalendarHeader from './WeeklyCalendarHeader.vue'
import WeeklyCalendarBody from './WeeklyCalendarBody.vue'

export const FIELD_TYPES = {
  PRINT_DATE: 'Estampa',
  SEAM_DATE: 'Costura',
  DELIVERY_DATE: 'Entrega'
}

export default {
  components: {
    WeeklyCalendarHeader,
    WeeklyCalendarBody
  },
  apollo: {
    weeklyCalendar: {
      query: GetWeeklyCalendarOrders,
      variables () {
        return {
          date: this.date,
          field: this.field
        }
      },
      result ({ data: { weeklyCalendar }, loading }) {
        if (!loading) {
          this.weeklyCalendar = cloneDeep(weeklyCalendar)
        }
      }
    }
  },
  props: {
    field: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      weeklyCalendar: [],
      date: DateTime.now().toFormat('dd/MM/y')
    }
  },
  computed: {
    lowerCaseField () {
      return this.field.toLowerCase()
    },
    isLoading () {
      return !!this.$apollo.queries.weeklyCalendar.loading
    }
  },
  methods: {
    refresh () {
      this.$apollo.queries.weeklyCalendar.refetch()
    },
    onWeekSelected (date) {
      this.date = date
    },
    onFileUploaded ({ file, date }) {
      const weeklyDate = this.weeklyCalendar.find(
        item => item.date === date
      )

      const preRegisteredOrder = {
        id: uniqueId('pre-created-'),
        isPreCreated: true,
        date,
        date_field: this.lowerCaseField,
        image: file,
      }

      weeklyDate.orders.unshift(preRegisteredOrder)
    },
    onCancelOrder (order) {
      const weeklyDate = this.weeklyCalendar.find(
        item => item.date === order.date
      )

      const indexToDelete = weeklyDate.orders.find(
        item => item.id === order.id
      )

      weeklyDate.orders.splice(indexToDelete, 1)
    }
  }
}
</script>

<template>
  <div>
    <WeeklyCalendarHeader
      class="my-1"
      :field="field"
      @week-selected="onWeekSelected"
      @refresh="refresh"
    />

    <WeeklyCalendarBody
      :field="field"
      :dates="weeklyCalendar"
      :selected-date="date"
      :is-loading="isLoading"
      @uploaded-file="onFileUploaded"
      @cancel-create="onCancelOrder"
    />
  </div>
</template>
