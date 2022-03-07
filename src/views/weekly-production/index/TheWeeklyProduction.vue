<script>
import { uniqueId } from 'lodash-es'
import { weeklyProduction } from '@/graphql/WeeklyProduction.gql'
import { DateTime } from 'luxon'
import TheWeeklyProductionHeader from './TheWeeklyProductionHeader'
import TheWeeklyProductionBody from './TheWeeklyProductionBody'

export default {
  metaInfo: {
    title () {
      return 'Produção semanal'
    }
  },
  components: {
    TheWeeklyProductionHeader,
    TheWeeklyProductionBody
  },
  apollo: {
    weeklyProduction: {
      query: weeklyProduction,
      variables () {
        return {
          date: this.date
        }
      }
    }
  },
  data () {
    return {
      date: DateTime.now().toFormat('dd/MM/y'),
      weeklyProduction: []
    }
  },
  computed: {
    isLoading () {
      return !!this.$apollo.queries.weeklyProduction.loading
    }
  },
  methods: {
    refresh () {
      this.$apollo.queries.weeklyProduction.refetch()
    },
    onWeekSelected (date) {
      this.date = date
    },
    onFileUploaded ({ file, date }) {
      const weeklyDate = this.weeklyProduction.find(
        item => item.date === date
      )

      weeklyDate.orders.unshift({
        id: uniqueId('pre-created-'),
        isPreCreated: true,
        production_date: date,
        image: file
      })
    },
    onCancelOrder (order) {
      const weeklyDate = this.weeklyProduction.find(
        item => item.date === order.production_date
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
    <TheWeeklyProductionHeader
      class="my-1"
      @week-selected="onWeekSelected"
      @refresh="refresh"
    />

    <TheWeeklyProductionBody
      :dates="weeklyProduction"
      :selected-date="date"
      :is-loading="isLoading"
      @uploaded-file="onFileUploaded"
      @cancel-create="onCancelOrder"
    />
  </div>
</template>
