<script>
import TheHeaderbar from '@/components/Headerbar/TheHeaderbar'
import TheSidebar from '@/components/Sidebar/TheSidebar'

export default {
  metaInfo: {
    titleTemplate: '%s | Camaleão Web',
    meta: [
      {name: 'title', content: 'Camaleão Camisas Interno'}
    ]
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
  },
  mounted () {
    this.$store.commit('SET_BOOTED', true)
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
