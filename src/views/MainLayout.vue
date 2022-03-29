<script>
import TheHeaderbar from '@/components/Headerbar/TheHeaderbar'
import TheSidebar from '@/components/Sidebar/TheSidebar'

export default {
  metaInfo: {
    titleTemplate: '%s | Camaleão Web'
  },
  components: {
    TheHeaderbar,
    TheSidebar,
  },
  computed: {
    authUser () {
      return this.$store.getters['auth/authUser']
    }
  }
}
</script>

<template>
  <div
    v-if="authUser"
    key="layout"
  >
    <TheHeaderbar :auth-user="authUser" />
    <TheSidebar :auth-user="authUser" />

    <div id="content">
      <div class="container">
        <router-view
          v-slot="{ Component, route }"
        >
          <Component
            :is="Component"
            :key="route.path"
          />
        </router-view>
      </div>
    </div>
  </div>
</template>
