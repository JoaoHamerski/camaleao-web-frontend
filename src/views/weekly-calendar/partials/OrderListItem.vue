<script>
export default {
  props: {
    icon: {
      type: Object,
      default: null
    }
  }
}
</script>

<template>
  <li
    class="list-group-item"
  >
    <FontAwesomeIcon
      v-if="icon"
      :icon="icon"
      fixed-width
    />
    <slot />
  </li>
</template>
