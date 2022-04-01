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
  <div class="img-thumbnail border-0">
    <AppViewer v-if="orderImage">
      <VueLoadImage>
        <img
          slot="image"
          class="img-fluid clickable"
          :src="orderImage"
          alt=""
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
      class="text-center text-secondary"
    >
      <div>
        <FontAwesomeIcon
          :icon="icons.faImage"
          size="5x"
        />
      </div>
      <div class="small">
        SEM IMAGEM
      </div>
    </div>
  </div>
</template>
