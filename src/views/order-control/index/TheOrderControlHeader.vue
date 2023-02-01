<script>
import {
  faTasks,
  faSyncAlt,
  faTshirt
} from '@fortawesome/free-solid-svg-icons'

import PiecesBySectorModal from '../partials/PiecesBySectorModal.vue'

export default {
  components: {
    PiecesBySectorModal
  },
  data () {
    return {
      piecesBySectorModal: false,
      icons: {
        faTasks,
        faSyncAlt,
        faTshirt
      }
    }
  },
  methods: {
    piecesBySectorClick () {
      this.piecesBySectorModal = true
    },
    onRefreshClick () {
      this.$emit('refresh')
    }
  }
}
</script>

<template>
  <div class="card mb-2">
    <div class="card-header d-flex justify-content-between bg-primary text-white fw-bold">
      <div>
        <FontAwesomeIcon
          :icon="icons.faTasks"
          fixed-width
        />
        Controle de Pedidos
      </div>
      <div>
        <AppButton
          :icon="icons.faTshirt"
          color="light"
          class="me-2"
          btn-class="text-primary btn-sm fw-bold"
          @click="piecesBySectorClick"
        >
          Peças por setor
        </AppButton>
        <AppButton
          :icon="icons.faSyncAlt"
          color="light"
          btn-class="text-primary btn-sm"
          @click="onRefreshClick"
        />
      </div>
    </div>

    <PiecesBySectorModal v-model="piecesBySectorModal" />
  </div>
</template>
