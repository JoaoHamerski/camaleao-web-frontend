<script>
import SVGInject from '@iconfu/svg-inject'
import HeaderbarBurgerButton from './HeaderbarBurgerButton.vue'
import HeaderbarBackButton from './HeaderbarBackButton.vue'

export default {
  components: {
    HeaderbarBurgerButton,
    HeaderbarBackButton
  },
  props: {
    authUser: {
      type: Object,
      default: null
    }
  },
  computed: {
    isSidebarActive () {
      return this.$store.getters['sidebar/isSidebarActive']
    }
  },
  methods: {
    SVGInject,
    redirectToHome() {
      this.$router.push('/')
    },
    toggleSidebarState () {
      this.$store.commit(
        'sidebar/SET_SIDEBAR_STATE',
        !this.isSidebarActive,
        { root: true }
      )
    }
  }
}
</script>

<template>
  <AppTransition
    enter="fadeInUp"
    leave="fadeOutUp"
  >
    <nav
      v-if="authUser"
      id="headerbar"
      class="d-flex justify-content-between align-items-center py-2"
    >
      <div class="d-flex">
        <HeaderbarBurgerButton
          class="mx-2"
          :is-active="isSidebarActive"
          @click="toggleSidebarState"
        />
        <div
          style="max-width: 230px;"
          class="logo ms-sm-2 mx-auto clickable"
          @click="redirectToHome"
        >
          <img
            src="@/assets/images/logo.png"
            alt=""
            class="img-fluid"
            style="margin-top: -1rem;"
          >
        </div>
      </div>
      <div class="text-right">
        <HeaderbarBackButton />
      </div>
    </nav>
  </AppTransition>
</template>
