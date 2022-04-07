<script>
import TheHeaderbar from '@/components/Headerbar/TheHeaderbar.vue'
import TheSidebar from '@/components/Sidebar/TheSidebar.vue'

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
  props: {
    error: {
      type: [Number, String],
      default: null
    }
  },
  data () {
    return {
      transition: ''
    }
  },
  computed: {
    authUser () {
      return this.$store.getters['auth/authUser']
    },
    hasError () {
      return this.error !== null
    },
  },
  mounted () {
    this.$store.commit('SET_BOOTED', true)
  }
}
</script>

<template>
  <div
    v-if="authUser || hasError"
    key="layout"
  >
    <template v-if="authUser && !hasError">
      <TheHeaderbar :auth-user="authUser" />
      <TheSidebar :auth-user="authUser" />
    </template>

    <slot v-if="$slots.default" />

    <div
      v-else
      id="content"
    >
      <div class="container">
        <AppTransition
          enter="fadeIn"
          leave="fadeOut"
          speed="even-faster"
          mode="out-in"
        >
          <RouterView v-slot="{ Component }">
            <Component :is="Component" />
          </RouterView>
        </AppTransition>
      </div>
    </div>
  </div>
</template>
