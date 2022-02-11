<script>
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { citiesIndex } from '@/graphql/Cities.gql'
import { states } from '@/graphql/State.gql'

import TheCitiesCard from './TheCitiesCard'

export default {
  metaInfo: {
    title () {
      return 'Cidades'
    }
  },
  components: {
    TheCitiesCard
  },
  apollo: {
    cities: {
      query: citiesIndex,
      result ({ data, loading }) {
        if (!loading) {
          this.cities = data.cities.map(city => ({ isSelected: false, ...city }))
        }
      }
    },
    states: {
      query: states
    }
  },
  data () {
    return {
      cities: [],
      icons: {
        faPlus
      }
    }
  },
  computed: {
    isLoading () {
      return !!this.$apollo.queries.cities.loading
    }
  },
  methods: {
    refresh () {
      this.$apollo.queries.cities.refetch()
    }
  }
}
</script>

<template>
  <div>
    <div class="mt-5 mb-2">
      <AppButton
        btn-class="fw-bold"
        :icon="icons.faPlus"
      >
        Nova cidade
      </AppButton>
    </div>
    <TheCitiesCard
      :cities="cities"
      :states="states"
      :is-loading="isLoading"
      @refresh="refresh"
    />
  </div>
</template>
