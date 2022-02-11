<script>
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

export default {
  props: {
    authUser: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      icons: {
        faUserCircle
      }
    }
  }
}
</script>
<template>
  <div
    v-if="authUser"
    class="text-center my-4"
  >
    <FontAwesomeIcon
      :icon="icons.faUserCircle"
      class="text-white"
      size="3x"
    />
    <h5 class="text-white mt-3 mb-0">
      {{ authUser.name }}
    </h5>
    <b class="small text-light">
      {{ authUser.role.name }}
    </b>
  </div>
</template>
