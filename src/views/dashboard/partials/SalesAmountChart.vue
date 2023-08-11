<script>
import { GetAmountSalesChart } from '@/graphql/Dashboard.gql'

import { Line as LineChart } from 'vue-chartjs'
import { Chart as ChartJS, Tooltip, CategoryScale, LinearScale, PointElement, LineElement, Legend } from 'chart.js'


ChartJS.register(CategoryScale, Legend, Tooltip, LinearScale, PointElement, LineElement)

export default {
  name: 'BarChart',
  components: { LineChart },
  apollo: {
    dashboardSalesAmountChart: {
      query: GetAmountSalesChart
    }
  },
  data() {
    return {
      dashboardSalesAmountChart: {},
      chartOptions: {
        maintainAspectRatio: false,
        elements: {
          point: {
            radius: 4,
            hoverRadius:6,
            hitRadius: 5
          }
        },
        plugins: {
          legend: {
            labels: {
              padding: 20,
               font: {
                size: 15
              }
            },
          },
          tooltip: {
            callbacks: {
              title: (context) => 'Dia: ' + context[0].label,
              label: (context) => {
                const value = this.$helpers.toBRL(context.formattedValue.replaceAll('.', '').replaceAll(',', '.'))

                return context.dataset.label + ': ' + value
              }
            }
          }
        },
        responsive: true
      }
    }
  },
  computed: {
    chartStyle () {
      return {
        height: '200px'
      }
    },
    isLoading () {
      return !!this.$apollo.queries.dashboardSalesAmountChart.loading
    },
    chartData () {
      const currentMonthAmounts = this.dashboardSalesAmountChart.current.map(({amount}) => amount)
      const previousMonthAmounts = this.dashboardSalesAmountChart.previous.map(({amount}) => amount)
      return {
        labels: Array.from({length: 31}).map((_, i) => i + 1),
        datasets: [{
          label: 'Mês atual',
          data: currentMonthAmounts,
          fill: true,
          borderColor: 'rgb(0, 194, 126)'
        }, {
          label: 'Mês anterior',
          data: previousMonthAmounts,
          fill: true,
          borderColor: 'rgb(255, 97, 97)'
        }]
      }
    }
  }
}
</script>

<template>
  <div v-if="!isLoading">
    <LineChart
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
      :style="chartStyle"
    />
  </div>
</template>
