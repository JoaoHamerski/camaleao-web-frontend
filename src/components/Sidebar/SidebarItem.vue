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
      @click="navigate"
    >
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
