<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    value: {
      type: Boolean,
      default: false
    },
    defaultMargin: {
      type: Boolean,
      default: true
    },
    lg: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<template>
  <div
    class="form-check"
    :class="defaultMargin && 'mb-3'"
  >
    <input
      :id="id"
      class="form-check-input"
      :class="lg && 'form-check-input-lg'"
      type="checkbox"
      :value="value"
      :checked="value"
      @input="$emit('input', $event.target.checked)"
    >
    <label
      v-if="$slots.default"
      class="form-check-label"
      :for="id"
    >
      <slot />
    </label>
  </div>
</template>
