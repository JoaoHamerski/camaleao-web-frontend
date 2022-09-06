<script>
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import SectorCreateModal from '../partials/SectorCreateModal.vue'

export default {
  components: {
    SectorCreateModal
  },
  data () {
    return {
      icons: {
        faPlus
      },
      sectorModal: false
    }
  },
  methods: {
    onNewSectorClick () {
      this.sectorModal = true
    },
    onSectorModalSuccess () {
      this.sectorModal = false
    }
  }
}
</script>

<template>
  <div class="mb-2">
    <AppButton
      color="success"
      :icon="icons.faPlus"
      btn-class="fw-bold"
      @click.prevent="onNewSectorClick"
    >
      Novo setor
    </AppButton>

    <SectorCreateModal
      v-model="sectorModal"
      @success="onSectorModalSuccess"
    />
  </div>
</template>
