<script>
import { mapGetters } from 'vuex'

import SidebarItem from './SidebarItem.vue'
import {
  faList,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons'

export default {
  components: {
    SidebarItem
  },
  data () {
    return {
      icons: {
        faList,
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
  <nav
    id="sidebar"
    class="active"
  >
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
    <hr class="bg-light">
    <ul class="list-group list-group-flush">
      <SidebarItem
        :icon="icons.faList"
        :to="{name: 'clients.index'}"
      >
        Clientes
      </SidebarItem>
    </ul>
  </nav>
</template>
