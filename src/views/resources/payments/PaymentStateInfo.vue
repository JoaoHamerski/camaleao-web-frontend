<script>
import {
  faCheck,
  faTimes,
  faMinus,
} from '@fortawesome/free-solid-svg-icons'

export default {
  props: {
    confirmation: {
      type: undefined,
      default: false
    }
  },
  data () {
    return {
      icons: {
        faCheck,
        faTimes,
        faMinus
      }
    }
  }
}
</script>

<template>
  <div class="fw-bold">
    <div
      v-if="confirmation === true"
      class="text-success"
    >
      <FontAwesomeIcon :icon="icons.faCheck" />
    </div>
    <div
      v-else-if="confirmation === null"
      class="text-warning"
    >
      <FontAwesomeIcon :icon="icons.faMinus" />
    </div>
    <div
      v-else-if="confirmation === false"
      class="text-danger"
    >
      <FontAwesomeIcon :icon="icons.faTimes" />
    </div>
  </div>
</template>
