<script>
import SVGInject from '@iconfu/svg-inject'
import HeaderbarBurgerButton from './HeaderbarBurgerButton.vue'

export default {
  components: {
    HeaderbarBurgerButton
  },
  data () {
    return {
      SVGInject,
      console
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
    class="d-flex align-items-center py-2"
  >
    <HeaderbarBurgerButton
      class="mx-2"
      :is-active="isSidebarActive"
      @click="toggleSidebarState"
    />

    <div class="col-1 ms-3">
      <img
        class="img-fluid logo"
        src="@/assets/images/logo.svg"
        @load="SVGInject($event.target)"
      >
    </div>

    <!--  -->
  </nav>
</template>
