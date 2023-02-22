<script>
import { faColumns } from '@fortawesome/free-solid-svg-icons'

import PiecesBySectorBody from './PiecesBySectorBody.vue'

export default {
  components: {
    PiecesBySectorBody
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      icons: {
        faColumns
      }
    }
  }
}
</script>
<template>
  <AppModal
    v-bind="$attrs"
    id="piecesBySectorModal"
    :value="value"
    modal-dialog-class="modal-xl"
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faColumns"
        fixed-width
      />
      Painel de Produtividade
    </template>

    <template #body>
      <PiecesBySectorBody v-if="value" />
    </template>
  </AppModal>
</template>
