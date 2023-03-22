<script>
export default {
  props: {
    cssStyle: {
      type: Object,
      default: () => ({})
    },
    icon: {
      type: Object,
      default: null
    },
    to: {
      type: [String, Object],
      default: null
    },
    action: {
      type: Function,
      default: null
    }
  },
  computed: {
    isItemCollapsibleChild () {
      return this.$parent.$options.name === 'SidebarItemCollapsible'
    },
    hasRedirectRoute () {
      return !!this.to
    },
    redirectTo () {
      if (!this.hasRedirectRoute) {
        return ''
      }

      return this.to
    },
    url () {
      if (!this.hasRedirectRoute) {
        return null
      }

      const resolvedRoute = this.$router.resolve(this.to)

      return resolvedRoute.href
    }
  },
  methods: {
    onItemClick (event, navigate) {
      if (this.$isMobile) {
        this.$store.commit('sidebar/SET_SIDEBAR_STATE', false)
      }

      if (this.action) {
        this.action()
        return
      }

      if (!this.hasRedirectRoute) {
        event.preventDefault()
      }

      navigate(event)
    }
  }
}
</script>

<template>
  <router-link
    v-slot="{ navigate, isActive }"
    custom
    :to="redirectTo"
  >
    <li
      class="list-group-item list-sidebar-item px-4 clickable position-relative"
      :class="{'active': isActive && hasRedirectRoute }"
      :style="cssStyle"
      @click="e => onItemClick(e, navigate)"
    >
      <a
        v-if="url"
        :href="url"
        class="stretched-link"
      />

      <span
        v-show="isItemCollapsibleChild"
        class="px-2"
      />

      <FontAwesomeIcon
        v-if="icon"
        :icon="icon"
        fixed-width
        class="me-2 text-primary"
      />

      <slot />
    </li>
  </router-link>
</template>
