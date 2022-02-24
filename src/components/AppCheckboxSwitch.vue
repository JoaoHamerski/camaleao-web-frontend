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
    }
  }
}
</script>

<template>
  <div class="form-check form-switch">
    <input
      :id="`switch__${id}`"
      class="form-check-input"
      type="checkbox"
      role="switch"
      :value="value"
      :checked="value"
      @input="$emit('input', $event.target.checked)"
    >
    <label
      class="form-check-label"
      :for="`switch__${id}`"
    >
      <slot />
    </label>
  </div>
</template>
