<script>
import TheHeaderbar from '@/components/Headerbar/TheHeaderbar'
import TheSidebar from '@/components/Sidebar/TheSidebar'

export default {
  metaInfo: {
    titleTemplate: '%s | Camaleão Web'
  },
  components: {
    TheHeaderbar,
    TheSidebar
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
        <slot />
      </div>
    </div>
  </div>
  <div
    v-else
    class="d-flex justify-content-center align-items-center"
  >
    <AppSpinner />
  </div>
</template>
