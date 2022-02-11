<script>
import { faCity } from '@fortawesome/free-solid-svg-icons'
import TheCitiesCardTable from './TheCitiesCardTable'
import EditCitiesModal from '../partials/EditCitiesModal'

export default {
  components: {
    TheCitiesCardTable,
    EditCitiesModal
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    cities: {
      type: Array,
      default: () => []
    },
    states: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      selectedCities: [],
      editCitiesModal: false,
      icons: {
        faCity
      }
    }
  },
  methods: {
    addCity (city) {
      this.selectedCities.push(city)
    },
    removeCity (city) {
      const index = this.selectedCities.findIndex(_city => _city.id === city.id)

      this.selectedCities.splice(index, 1)
    },
    onEditCitiesClick () {
      this.editCitiesModal = true
    },
    onEditCitiesSuccess () {
      this.editCitiesModal = false
      this.selectedCities.splice(0, this.selectedCities.length)
      this.$emit('refresh')
    },
    getStateNameAndAbbr (city) {
      return city.state
        ? `${city.state.name} (${city.state.abbreviation})`
        : 'N/A'
    },
    onCityCheckboxChange ({ isSelected, city }) {
      if (isSelected) {
        this.addCity(city)
        return
      }

      this.removeCity(city)
    }
  }
}
</script>
<template>
  <AppCard color="camaleao">
    <template #header>
      <h6 class="fw-bold mb-0">
        <FontAwesomeIcon
          :icon="icons.faCity"
          fixed-width
        />
        Gerenciamento de cidades
      </h6>
    </template>

    <template #body>
      <div>
        <EditCitiesModal
          v-model="editCitiesModal"
          :states="states"
          :selected-cities="selectedCities"
          @success="onEditCitiesSuccess"
        />

        <div><b>Multiplas ações</b></div>
        <div class="text-secondary">
          <small>Selecione multiplas cidades abaixo para editar várias de uma vez.</small>
        </div>

        <template v-if="selectedCities.length">
          <div class="fw-bold text-primary mt-3 mb-1">
            Cidades selecionadas: {{ selectedCities.length }}
          </div>
          <AppButton
            outlined
            btn-class="btn-sm"
            @click.prevent="onEditCitiesClick"
          >
            Editar
          </AppButton>
        </template>
      </div>
      <AppLoading v-show="isLoading" />
      <TheCitiesCardTable
        :items="cities"
        @checkbox-change="onCityCheckboxChange"
      />
    </template>
  </AppCard>
</template>
