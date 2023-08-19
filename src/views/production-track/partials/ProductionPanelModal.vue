<script>
import { faColumns } from '@fortawesome/free-solid-svg-icons'

import ProductionPanelBody from './ProductionPanelBody.vue'

export default {
  components: {
    ProductionPanelBody
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
    id="ProductionPanelModal"
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
      <ProductionPanelBody v-if="value" />
    </template>
  </AppModal>
</template>
