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
  <div class="img-thumbnail border-0">
    <AppViewer v-if="orderImage">
      <img
        class="img-fluid clickable"
        :src="orderImage"
        alt=""
      >
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
