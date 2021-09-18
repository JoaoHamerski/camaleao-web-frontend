<script>
export default {
  props: {
    icon: {
      type: Object,
      default: null
    },
    to: {
      type: [String, Object],
      default: ''
    },
    disabledRedirect: {
      type: Boolean,
      default: false
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
    v-slot="{ navigate, isExactActive }"
    custom
    :to="to"
  >
    <li
      class="list-group-item list-sidebar-item px-4 clickable"
      :class="{'active': isExactActive}"
      @click="e => redirect(e, navigate)"
    >
      <FontAwesomeIcon
        v-if="icon"
        :icon="icon"
        fixed-width
        class="me-1 text-camaleao"
      />

      <slot />
    </li>
  </router-link>
</template>
