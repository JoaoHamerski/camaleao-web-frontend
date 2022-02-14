<script>
import { faCity } from '@fortawesome/free-solid-svg-icons'

import TheCitiesCardTable from './TheCitiesCardTable'
import EditCitiesModal from '../partials/EditCitiesModal'
import EditCityModal from '../partials/EditCityModal'
import DeleteCityModal from '../partials/DeleteCityModal'
import ShowCityClientsModal from '../partials/ShowCityClientsModal'

export default {
  components: {
    TheCitiesCardTable,
    EditCitiesModal,
    EditCityModal,
    DeleteCityModal,
    ShowCityClientsModal
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
      editCityModal: {
        value: false,
        city: {}
      },
      deleteCityModal: {
        value: false,
        city: {}
      },
      showCityClientsModal: {
        value: false,
        city: {}
      },
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
    onDeleteCitySuccess () {
      this.deleteCityModal.value = false
      this.deleteCityModal.city = {}
      this.$emit('refresh')
    },
    onEditCitiesClick () {
      this.editCitiesModal = true
    },
    onEditCitiesSuccess () {
      this.editCitiesModal = false
      this.selectedCities.splice(0, this.selectedCities.length)
      this.$emit('refresh')
    },
    onEditCitySuccess () {
      this.editCityModal.value = false
      this.editCityModal.city = {}
      this.$emit('refresh')
    },
    onEditCityModalHidden () {
      this.editCityModal.city = {}
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
    },
    onCityActionClicked ({ city, action }) {
      if (action === 'show') {
        this.showCityClientsModal.city = city
        this.showCityClientsModal.value = true
      }

      if (action === 'edit') {
        this.editCityModal.city = city
        this.editCityModal.value = true
      }

      if (action === 'delete') {
        this.deleteCityModal.city = city
        this.deleteCityModal.value = true
      }
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

        <EditCityModal
          v-model="editCityModal.value"
          :city="editCityModal.city"
          :states="states"
          @hidden="onEditCityModalHidden"
          @success="onEditCitySuccess"
        />

        <DeleteCityModal
          v-model="deleteCityModal.value"
          :city="deleteCityModal.city"
          @success="onDeleteCitySuccess"
        />

        <ShowCityClientsModal
          v-model="showCityClientsModal.value"
          :city="showCityClientsModal.city"
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
        @action-clicked="onCityActionClicked"
      />
    </template>
  </AppCard>
</template>
