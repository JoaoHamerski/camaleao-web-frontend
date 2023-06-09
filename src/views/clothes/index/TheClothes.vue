<script>
import { faTshirt, faPlus } from '@fortawesome/free-solid-svg-icons';

import TheClothesHeader from './TheClothesHeader.vue'
import TheClothesBody from './TheClothesBody.vue';
import ClothItemModal from './cloth-items/ClothItemModal.vue';
import ClothMatchModalNew from './cloth-matches/ClothMatchModalNew.vue';

export default {
  components: {
    TheClothesHeader,
    TheClothesBody,
    ClothItemModal,
    ClothMatchModalNew
  },
  metaInfo: {
    title: 'Roupas'
  },
  data: () => ({
    itemModal: {
      value: false,
      type: ''
    },
    matchModalNew: false,
    icons: {
      faPlus,
      faTshirt
    }
  }),
  methods: {
    onItemOpen (itemType) {
      this.itemModal.type = itemType
      this.itemModal.value = true
    },
    onModalHidden () {
      this.itemModal.value = false
      this.itemModal.type = ''
    },
    onNewMatchBtnClick () {
      this.matchModalNew = true
    }
  }
}
</script>

<template>
  <div class="my-3">
    <ClothItemModal
      v-model="itemModal.value"
      :type="itemModal.type"
      @hidden="onModalHidden"
    />

    <ClothMatchModalNew v-model="matchModalNew" />

    <TheClothesHeader
      class="mb-3"
      @open-modal-item="onItemOpen"
    />

    <AppButton
      color="success"
      btn-class="fw-bold"
      class="mb-2"
      :icon="icons.faPlus"
      @click.prevent="onNewMatchBtnClick"
    >
      Nova combinação
    </AppButton>

    <AppCard
      color="camaleao"
    >
      <template #header>
        <h6 class="mb-0 fw-bold">
          <FontAwesomeIcon
            :icon="icons.faTshirt"
            fixed-width
          />
          Combinações do formulário
        </h6>
      </template>
      <template #body>
        <TheClothesBody />
      </template>
    </AppCard>
  </div>
</template>
