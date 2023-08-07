<script>
import { GetCitiesSalesAmount } from '@/graphql/Dashboard.gql'
import { faCity, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import SalesAmountCitiesItem from './SalesAmountCitiesItem.vue'
import SalesAmountCitiesRemainingList from './SalesAmountCitiesRemainingList.vue';

export default {
  components: {
    SalesAmountCitiesItem,
    SalesAmountCitiesRemainingList
  },
  apollo: {
    dashboardSalesAmountCities: {
      query: GetCitiesSalesAmount,
      variables () {
        return {
          month: this.month
        }
      }
    }
  },
  data: () => ({
    month: 'CURRENT',
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
    }
  },
  methods: {
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

      <div class="small mb-2">
        <span
          class="link-primary clickable me-2"
          :class="{'fw-bold': month === 'CURRENT'}"
          @click.prevent="setMonth('CURRENT')"
        >MÊS ATUAL</span>
        <span class="mx-2">|</span>
        <span
          class="link-primary clickable"
          :class="{'fw-bold': month === 'PREVIOUS'}"
          @click.prevent="setMonth('PREVIOUS')"
        >MÊS ANTERIOR</span>
      </div>

      <div class="row mb-3">
        <SalesAmountCitiesItem
          v-for="item in featuredCities"
          :key="`city_${item.city.id}`"
          class="col-12 col-md mb-2 mb-md-0"
          :item="item"
        />
      </div>

      <div class="mb-3">
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
