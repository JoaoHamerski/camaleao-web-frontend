<script>
import { faImage } from '@fortawesome/free-solid-svg-icons'
export default {
  props: {
    orderImage: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      icons: {
        faImage
      }
    }
  }
}
</script>

<template>
  <div class="img-thumbnail">
    <AppViewer v-if="orderImage">
      <img
        class="img-fluid border-primary clickable"
        :src="orderImage"
        alt="Imagem do pedido"
      >
    </AppViewer>
    <div
      v-else
      class="text-center"
    >
      <div>
        <FontAwesomeIcon
          :icon="icons.faImage"
          size="4x"
          class="text-secondary"
        />
      </div>
      <small class="text-secondary">SEM IMAGEM</small>
    </div>
  </div>
</template>
