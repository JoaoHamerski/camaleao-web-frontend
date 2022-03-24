<script>
export default {
  props: {
    icon: {
      type: Object,
      default: null
    },
    to: {
      type: [String, Object],
      default: null
    },
    disabledRedirect: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isCollapsibleItem () {
      return this.$parent.$options.name === 'SidebarItemCollapsible'
    },
    url () {
      const resolvedRoute = this.$router.resolve(this.to)

      return resolvedRoute.href
    }
  },
  methods: {
    redirect (event, navigate) {
      if (this.disabledRedirect) {
        return
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
    :to="to"
  >
    <li
      class="list-group-item list-sidebar-item px-4 clickable position-relative"
      :class="{'active': isActive }"
      @click="e => redirect(e, navigate)"
    >
      <a
        :href="url"
        class="stretched-link"
      />

      <span
        v-show="isCollapsibleItem"
        class="px-2"
      />

      <FontAwesomeIcon
        v-if="icon"
        :icon="icon"
        fixed-width
        class="me-1 text-primary"
      />

      <slot />
    </li>
  </router-link>
</template>
