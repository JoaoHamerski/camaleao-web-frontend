<script>
import { faList, faBoxes } from '@fortawesome/free-solid-svg-icons'
import ProductTypes from './ProductTypes.vue'

export default {
  components: {
    ProductTypes
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
        faList,
        faBoxes
      }
    }
  }
}
</script>

<template>
  <AppModal
    id="modalProductTypes"
    :value="value"
    centered
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faList"
        fixed-width
      />
      Gerenciar tipos de produtos
    </template>

    <template #body>
      <div class="text-center">
        <FontAwesomeIcon
          size="3x"
          class="text-primary mb-4 mt-2"
          :icon="icons.faBoxes"
        />
      </div>

      <ProductTypes />
      <div class="text-end mt-3">
        <AppButton
          color="light"
          data-bs-dismiss="modal"
        >
          Fechar
        </AppButton>
      </div>
    </template>
  </AppModal>
</template>
