<script>
import { kebabCase } from 'lodash-es'
import sidebarItems from './sidebar-items'
import { mapGetters, mapActions } from 'vuex'

import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import SidebarItem from './SidebarItem'
import SidebarHeader from './SidebarHeader'
import SidebarItemCollapsible from './SidebarItemCollapsible'

export default {
  components: {
    SidebarHeader,
    SidebarItem,
    SidebarItemCollapsible
  },
  props: {
    authUser: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      sidebarItems,
      icons: {
        faSignOutAlt
      }
    }
  },
  computed: {
    ...mapGetters('sidebar', ['isSidebarActive'])
  },
  methods: {
    ...mapActions('auth', ['logout']),
    kebabCase
  }
}
</script>

<template>
  <nav
    v-if="authUser"
    id="sidebar"
    class="sidebar-scrollbar"
    :class="isSidebarActive && 'active'"
  >
    <SidebarHeader :auth-user="authUser" />

    <hr class="bg-light">

    <ul class="list-group list-group-flush">
      <template v-for="item in sidebarItems">
        <template v-if="item.items">
          <SidebarItemCollapsible
            v-if="item.condition && item.condition()"
            :id="kebabCase(item.title)"
            :key="kebabCase(item.title)"
            :icon="item.icon"
          >
            <template #title>
              {{ item.title }}
            </template>
            <template #items>
              <template v-for="subItem in item.items">
                <SidebarItem
                  v-if="subItem.condition && subItem.condition()"
                  :key="kebabCase(subItem.title)"
                  :icon="subItem.icon"
                  :to="subItem.route"
                >
                  {{ subItem.title }}
                </SidebarItem>
              </template>
            </template>
          </SidebarItemCollapsible>
        </template>
        <template v-else>
          <SidebarItem
            v-if="item.condition === undefined || item.condition()"
            :key="kebabCase(item.title)"
            :icon="item.icon"
            :to="item.route"
          >
            {{ item.title }}
          </SidebarItem>
        </template>
      </template>

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
