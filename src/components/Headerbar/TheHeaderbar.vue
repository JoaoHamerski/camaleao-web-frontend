<script>
import SVGInject from '@iconfu/svg-inject'
import HeaderbarBurgerButton from './HeaderbarBurgerButton.vue'
import HeaderbarBackButton from './HeaderbarBackButton.vue'

export default {
  components: {
    HeaderbarBurgerButton,
    HeaderbarBackButton
  },
  data () {
    return {
      SVGInject
    }
  },
  computed: {
    isSidebarActive () {
      return this.$store.getters['sidebar/isSidebarActive']
    }
  },
  methods: {
    toggleSidebarState () {
      this.$store.commit('sidebar/SET_SIDEBAR_STATE', !this.isSidebarActive, { root: true })
    }
  }
}
</script>

<template>
  <nav
    id="headerbar"
    class="d-flex justify-content-between align-items-center py-2"
  >
    <div class="d-flex">
      <HeaderbarBurgerButton
        class="mx-2"
        :is-active="isSidebarActive"
        @click="toggleSidebarState"
      />
      <div class="col-4 ms-3">
        <img
          class="img-fluid logo"
          src="@/assets/images/logo.svg"
          @load="SVGInject($event.target)"
        >
      </div>
    </div>

    <div class="text-right">
      <HeaderbarBackButton />
    </div>
  </nav>
</template>
