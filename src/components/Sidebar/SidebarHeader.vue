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
    <h5 class="text-white mt-3 mb-0">
      {{ user.name }}
    </h5>
    <b class="small text-light">
      {{ user.role.name }}
    </b>
  </div>
</template>
