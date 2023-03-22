<script>
import { faImage } from '@fortawesome/free-solid-svg-icons'
export default {
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
  <div class="text-center text-secondary">
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
</template>
