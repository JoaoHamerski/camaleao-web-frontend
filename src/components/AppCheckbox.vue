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
    },
    hint: {
      type: String,
      default: ''
    },
    disabled: {
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
      :disabled="disabled"
      @input="$emit('input', $event.target.checked)"
    >
    <label
      v-if="$slots.default"
      class="form-check-label"
      :for="id"
    >
      <slot />
    </label>
    <div>
      <small
        v-if="hint !== ''"
        slot="hint"
        class="form-text"
      >{{ hint }}</small>
      <small
        v-else-if="$slots.hint"
        class="form-text"
        :class="disabled && 'text-black-50'"
      >
        <slot
          name="hint"
        />
      </small>
    </div>
  </div>
</template>
