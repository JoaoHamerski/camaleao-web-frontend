<script>
import { mapGetters, mapActions } from 'vuex'
import {
  faList,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'

import SidebarItem from './SidebarItem'
import SidebarHeader from './SidebarHeader'

export default {
  components: {
    SidebarHeader,
    SidebarItem
  },
  data () {
    return {
      icons: {
        faList,
        faSignOutAlt
      }
    }
  },
  computed: {
    ...mapGetters('sidebar', ['isSidebarActive'])
  },
  methods: {
    ...mapActions('auth', ['logout'])
  }
}
</script>

<template>
  <nav
    id="sidebar"
    :class="isSidebarActive && 'active'"
  >
    <SidebarHeader />
    <hr class="bg-light">

    <ul class="list-group list-group-flush">
      <SidebarItem
        :icon="icons.faList"
        :to="{name: 'clients.index'}"
      >
        Clientes
      </SidebarItem>

      <SidebarItem
        to="/sair"
        :icon="icons.faSignOutAlt"
        disabled-redirect
        @click.native="logout"
      >
        Sair
      </SidebarItem>
    </ul>
  </nav>
</template>
