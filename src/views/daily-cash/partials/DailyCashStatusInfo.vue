<script>
import {
  faTimes,
  faCheck,
  faMinus
} from '@fortawesome/free-solid-svg-icons'

export default {
  props: {
    entry: {
      type: Object,
      required: true
    }
  },
  computed: {
    getIconProps () {
      if (this.entry.is_confirmed === false) {
        return {
          icon: faTimes,
          color: 'danger'
        }
      }

      if (this.entry.is_confirmed === true) {
        return {
          icon: faCheck,
          color: 'success'
        }
      }

      return {
        icon: faMinus,
        color: 'warning'
      }
    }
  }
}
</script>
<template>
  <div class="mx-4">
    <FontAwesomeIcon
      :icon="getIconProps.icon"
      :class="`text-${getIconProps.color}`"
    />
  </div>
</template>
