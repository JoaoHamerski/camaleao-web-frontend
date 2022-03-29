<script>
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { GetSimpleCities } from '@/graphql/City.gql'
import { states } from '@/graphql/State.gql'

import TheCitiesCard from './TheCitiesCard'
import NewCityModal from '../partials/NewCityModal'

export default {
  metaInfo: {
    title () {
      return 'Cidades'
    }
  },
  components: {
    TheCitiesCard,
    NewCityModal
  },
  apollo: {
    cities: {
      query: GetSimpleCities,
      result ({ data, loading }) {
        if (!loading) {
          this.cities = data.cities.map(
            city => ({ isSelected: false, ...city })
          )
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
      newCityModal: false,
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
    onNewCitySuccess () {
      this.newCityModal = false
    },
    onNewCityClick () {
      this.newCityModal = true
    }
  }
}
</script>

<template>
  <div>
    <div class="mt-5 mb-2">
      <AppButton
        color="success"
        btn-class="fw-bold"
        :icon="icons.faPlus"
        @click.prevent="onNewCityClick"
      >
        Nova cidade
      </AppButton>
    </div>

    <NewCityModal
      v-model="newCityModal"
      :states="states"
      @success="onNewCitySuccess"
    />

    <TheCitiesCard
      :cities="cities"
      :states="states"
      :is-loading="isLoading"
    />
  </div>
</template>
