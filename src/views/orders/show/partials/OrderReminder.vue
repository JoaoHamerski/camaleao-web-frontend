<script>
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

export default {
  data () {
    return {
      icons: {
        faExclamationTriangle
      }
    }
  }
}
</script>

<template>
  <div
    class="d-flex flex-column align-middle text-center"
  >
    <div>
      <FontAwesomeIcon
        :icon="icons.faExclamationTriangle"
        class="text-warning me-2"
        size="2x"
      />
    </div>
    <div>
      <slot />
    </div>
    <hr>
  </div>
</template>
