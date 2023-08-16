<script>
import { GetCitiesSalesAmount } from '@/graphql/Dashboard.gql'
import { faCity, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { DateTime } from 'luxon'

import SalesAmountCitiesItem from './SalesAmountCitiesItem.vue'
import SalesAmountCitiesRemainingList from './SalesAmountCitiesRemainingList.vue';
import SalesAmountCitiesDatesSelect from './SalesAmountCitiesDatesSelect.vue';

export default {
  components: {
    SalesAmountCitiesItem,
    SalesAmountCitiesRemainingList,
    SalesAmountCitiesDatesSelect
  },
  apollo: {
    dashboardSalesAmountCities: {
      query: GetCitiesSalesAmount,
      variables () {
        return {
          date: this.date,
        }
      }
    }
  },
  data: () => ({
    date: DateTime.now().toFormat('yyyy-MM'),
    dashboardSalesAmountCities: [],
    icons: {
      faCity,
      faExclamationCircle
    },
  }),
  computed: {
    isLoading () {
      return !!this.$apollo.queries.dashboardSalesAmountCities.loading
    },
    featuredCities () {
      const cities = [...this.dashboardSalesAmountCities];

      return cities.splice(0, 4)
    },
    remainingCities () {
      const cities = [...this.dashboardSalesAmountCities]

      return cities.splice(4)
    },
    monthsOptions () {
      return [
        { text: 'MÊS ATUAL', value: 'CURRENT'},
        { text: 'MÊS ANTERIOR', value: 'PREVIOUS'},
      ]
    }
  },
  methods: {
    onDateChanged (date) {
      this.date = date
    },
    setMonth (month) {
      if (month === this.month) {
        return
      }

      this.month = month
    },
  }
}
</script>

<template>
  <AppContainer>
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faCity"
        fixed-width
      />
      Volume de vendas por cidade
    </template>

    <template #body>
      <div
        v-show="isLoading"
      >
        <AppLoading />
      </div>

      <div class="col col-md-3">
        <SalesAmountCitiesDatesSelect
          :value="date"
          @date-changed="onDateChanged"
        />
      </div>

      <div
        v-if="featuredCities.length"
        class="row mb-3"
      >
        <SalesAmountCitiesItem
          v-for="item in featuredCities"
          :key="`city_${item.city.id}`"
          class="col-12 col-md mb-2 mb-md-0"
          :item="item"
        />
      </div>
      <div
        v-else
        class="small text-secondary text-center py-4"
      >
        Nenhum dado encontrado
      </div>

      <div
        v-if="remainingCities.length"
        class="mb-3"
      >
        <SalesAmountCitiesRemainingList :items="remainingCities" />
      </div>

      <div class="text-secondary extra-small">
        <FontAwesomeIcon
          :icon="icons.faExclamationCircle"
          fixed-width
        />
        Dados baseados na data de cadastro dos pedidos.
      </div>
    </template>
  </AppContainer>
</template>
