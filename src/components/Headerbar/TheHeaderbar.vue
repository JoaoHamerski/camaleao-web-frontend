<script>
import HeaderbarBurgerButton from './HeaderbarBurgerButton.vue'

export default {
  components: {
    HeaderbarBurgerButton
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
    class="d-flex bg-white align-items-center py-2"
  >
    <HeaderbarBurgerButton
      class="mx-2"
      :is-active="isSidebarActive"
      @click="toggleSidebarState"
    />

    <div class="col-1 ms-3">
      <img
        class="img-fluid"
        src="@/assets/images/logo.png"
        alt=""
      >
    </div>

    <!--  -->
  </nav>
</template>
