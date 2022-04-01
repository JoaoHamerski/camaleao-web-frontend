<script>
import { faImage } from '@fortawesome/free-solid-svg-icons'
import VueLoadImage from 'vue-load-image'

export default {
  components: {
    VueLoadImage
  },
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
      <VueLoadImage>
        <img
          slot="image"
          class="img-fluid border-primary clickable"
          :src="orderImage"
          alt="Imagem do pedido"
        >
        <div
          slot="preloader"
          class="position-relative py-5"
        >
          <AppLoading />
        </div>
      </VueLoadImage>
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
