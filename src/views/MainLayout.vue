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
  data () {
    return {
      transition: ''
    }
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
        <AppTransition
          enter="fadeIn"
          leave="fadeOut"
          speed="even-faster"
          mode="out-in"
        >
          <router-view v-slot="{ Component }">
            <Component :is="Component" />
          </router-view>
        </AppTransition>
      </div>
    </div>
  </div>
</template>
