<script>
import { mapGetters } from 'vuex'
import {
  faUserCircle
} from '@fortawesome/free-solid-svg-icons'

export default {
  data () {
    return {
      icons: {
        faUserCircle
      }
    }
  },
  computed: {
    ...mapGetters('auth', { user: 'authUser' })
  }
}
</script>
<template>
  <div class="text-center my-4">
    <FontAwesomeIcon
      :icon="icons.faUserCircle"
      class="text-white"
      size="3x"
    />
    <h5 class="text-white mt-3">
      {{ user.name }}
    </h5>
  </div>
</template>
