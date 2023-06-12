<script>
import { faTshirt, faPlus } from '@fortawesome/free-solid-svg-icons';

import TheGarmentsHeader from './TheGarmentsHeader.vue'
import TheGarmentsBody from './TheGarmentsBody.vue';
import GarmentItemModal from './garment-items/GarmentItemModal.vue';
import GarmentMatchModalNew from './garment-matches/GarmentMatchModalNew.vue';

export default {
  components: {
    TheGarmentsHeader,
    TheGarmentsBody,
    GarmentItemModal,
    GarmentMatchModalNew
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
    <GarmentItemModal
      v-model="itemModal.value"
      :type="itemModal.type"
      @hidden="onModalHidden"
    />

    <GarmentMatchModalNew v-model="matchModalNew" />

    <TheGarmentsHeader
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
        <TheGarmentsBody />
      </template>
    </AppCard>
  </div>
</template>
