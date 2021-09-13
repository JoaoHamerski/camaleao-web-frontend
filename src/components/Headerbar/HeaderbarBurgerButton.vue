<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<template>
  <button
    class="hamburger hamburger-sm hamburger--squeeze"
    :class="isActive && 'is-active'"
    type="button"
    v-on="$listeners"
  >
    <span class="hamburger-box">
      <span class="hamburger-inner" />
    </span>
  </button>
</template>

<style scoped>
.hamburger-sm {
  transform: scale(0.65)
}
</style>
