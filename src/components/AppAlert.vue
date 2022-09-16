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
  },
  methods: {
    onDismissClick () {
      this.$emit('dismiss')
    }
  }
}
</script>

<template>
  <div
    class="alert d-flex justify-content-between align-items-center"
    :class="[`alert-${color}`, {
      'alert-dismissible fade show': dismissible,
      'small p-2': small
    }]"
    role="alert"
  >
    <div>
      <slot />
    </div>
    <button
      type="button"
      class="btn-close p-2 pt-3"
      data-bs-dismiss="alert"
      aria-label="Close"
      @click.prevent="onDismissClick"
    />
  </div>
</template>
