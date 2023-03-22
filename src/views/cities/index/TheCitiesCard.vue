<script>
import { faCity } from '@fortawesome/free-solid-svg-icons'

import TheCitiesCardTable from './TheCitiesCardTable.vue'
import EditCitiesModal from '../partials/EditCitiesModal.vue'
import EditCityModal from '../partials/EditCityModal.vue'
import DeleteCityModal from '../partials/DeleteCityModal.vue'
import ShowCityClientsModal from '../partials/ShowCityClientsModal.vue'

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
      modalEditCities: false,
      modalEditCity: {
        value: false,
        city: {}
      },
      modalDeleteCity: {
        value: false,
        city: {}
      },
      modalShowCityClients: {
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
      const index = this.selectedCities.findIndex(
        _city => _city.id === city.id
      )

      this.selectedCities.splice(index, 1)
    },
    onDeleteCitySuccess () {
      this.modalDeleteCity.value = false
      this.modalDeleteCity.city = {}
    },
    onEditCitiesClick () {
      this.modalEditCities = true
    },
    onEditCitiesSuccess () {
      this.modalEditCities = false
      this.selectedCities.splice(0, this.selectedCities.length)
    },
    onEditCitySuccess () {
      this.modalEditCity.value = false
      this.modalEditCity.city = {}
    },
    onEditCityModalHidden () {
      this.modalEditCity.city = {}
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
        this.modalShowCityClients.city = city
        this.modalShowCityClients.value = true
      }

      if (action === 'edit') {
        this.modalEditCity.city = city
        this.modalEditCity.value = true
      }

      if (action === 'delete') {
        this.modalDeleteCity.city = city
        this.modalDeleteCity.value = true
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
          v-model="modalEditCities"
          :states="states"
          :selected-cities="selectedCities"
          @success="onEditCitiesSuccess"
        />

        <EditCityModal
          v-model="modalEditCity.value"
          :city="modalEditCity.city"
          :states="states"
          @hidden="onEditCityModalHidden"
          @success="onEditCitySuccess"
        />

        <DeleteCityModal
          v-model="modalDeleteCity.value"
          :city="modalDeleteCity.city"
          @success="onDeleteCitySuccess"
        />

        <ShowCityClientsModal
          v-model="modalShowCityClients.value"
          :city="modalShowCityClients.city"
        />

        <div><b>Múltiplas ações</b></div>
        <div class="text-secondary">
          <small>Selecione múltiplas cidades abaixo para editar várias de uma vez.</small>
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
