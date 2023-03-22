<script>
import {
  faCheck,
  faTimes,
  faMinus,
} from '@fortawesome/free-solid-svg-icons'

export default {
  props: {
    confirmation: undefined
  },
  computed: {
    confirmationAttrs () {
      if (this.confirmation === true) {
        return {
          color: 'success',
          icon: faCheck
        }
      }

      if (this.confirmation === false) {
        return {
          color: 'danger',
          icon: faTimes
        }
      }

      return {
        color: 'warning',
        icon: faMinus
      }
    }
  }
}
</script>

<template>
  <FontAwesomeIcon
    :icon="confirmationAttrs.icon"
    :class="`text-${confirmationAttrs.color}`"
  />
</template>
