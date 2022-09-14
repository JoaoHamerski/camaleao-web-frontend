<script>
export default {
  props: {
    small: {
      type: Boolean,
      default: false
    },
    dismissible: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'primary'
    }
  }
}
</script>

<template>
  <div
    class="alert"
    :class="[`alert-${color}`, {
      'alert-dismissible fade show': dismissible,
      'small p-2': small
    }]"
    role="alert"
  >
    <slot />
    <button
      type="button"
      class="btn-close p-2 pt-3"
      data-bs-dismiss="alert"
      aria-label="Close"
    />
  </div>
</template>
