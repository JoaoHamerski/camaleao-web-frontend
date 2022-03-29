<script>
import { faPlus, faTshirt } from '@fortawesome/free-solid-svg-icons'
import { GetClothingTypes } from '@/graphql/ClothingType.gql'

import TheClothingTypesCard from './TheClothingTypesCard'
import ModalNewClothingType from '../partials/ModalNewClothingType'
import ModalEditClothingType from '../partials/ModalEditClothingType'
import ModalPrintCommission from '../partials/ModalPrintCommission'

export default {
  metaInfo: {
    title () {
      return 'Tipos de roupas'
    }
  },
  apollo: {
    clothingTypes: {
      query: GetClothingTypes
    }
  },
  components: {
    TheClothingTypesCard,
    ModalNewClothingType,
    ModalEditClothingType,
    ModalPrintCommission
  },
  data () {
    return {
      printCommissionModal: false,
      newClothingTypeModal: false,
      editClothingTypeModal: {
        value: false,
        clothingType: null
      },
      icons: {
        faPlus,
        faTshirt
      },
      clothingTypes: []
    }
  },
  computed: {
    isLoading () {
      return !!this.$apollo.queries.clothingTypes.loading
    }
  },
  methods: {
    onPrintCommissionClick () {
      this.printCommissionModal = true
    },
    onPrintCommissionEditSuccess () {
      this.printCommissionModal = false
    },
    onEditClothingTypeSuccess () {
      this.editClothingTypeModal.value = false
      this.editClothingTypeModal.clothingType = null
    },
    onNewClothingTypeSuccess () {
      this.newClothingTypeModal = false
    },
    onNewClothingTypeClick () {
      this.newClothingTypeModal = true
    },
    onActionClicked ({ clothingType, action }) {
      if (action === 'edit') {
        this.editClothingTypeModal.clothingType = clothingType
        this.editClothingTypeModal.value = true
      }
    }
  }
}
</script>

<template>
  <div class="my-5">
    <div class="d-flex flex-column flex-sm-row justify-content-between mb-2">
      <div class="col mb-2 mb-sm-0">
        <AppButton
          :block="$isMobile"
          btn-class="fw-bold"
          :icon="icons.faPlus"
          color="success"
          @click.prevent="onNewClothingTypeClick"
        >
          Novo tipo de camisa
        </AppButton>
      </div>

      <div class="col text-sm-end">
        <AppButton
          :block="$isMobile"
          btn-class="fw-bold"
          :icon="icons.faTshirt"
          @click.prevent="onPrintCommissionClick"
        >
          Comissão de estampa
        </AppButton>
      </div>
    </div>

    <ModalNewClothingType
      v-model="newClothingTypeModal"
      @success="onNewClothingTypeSuccess"
    />

    <ModalEditClothingType
      v-model="editClothingTypeModal.value"
      :clothing-type="editClothingTypeModal.clothingType"
      @success="onEditClothingTypeSuccess"
    />

    <ModalPrintCommission
      v-model="printCommissionModal"
      @success="onPrintCommissionEditSuccess"
    />

    <TheClothingTypesCard
      :clothing-types="clothingTypes"
      :is-loading="isLoading"
      @action="onActionClicked"
    />
  </div>
</template>
