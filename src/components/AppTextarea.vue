<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      required: true
    },
    error: {
      type: [String, Boolean],
      default: ''
    },
    optional: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    defaultMargin: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<template>
  <div :class="defaultMargin && 'mb-3'">
    <label
      :for="id"
      class="form-label"
    >
      <span class="fw-bold">
        <slot />
      </span>
      <span
        v-if="optional"
        class="small text-secondary"
      >(opcional)</span>
    </label>
    <textarea
      :id="id"
      :value="value"
      class="form-control"
      :class="error && 'is-invalid'"
      :name="name"
      :placeholder="placeholder"
      rows="3"
      @input="$emit('input', $event.target.value)"
    />
    <div
      v-if="error"
      class="small text-danger"
    >
      {{ error }}
    </div>
    <div
      v-if="$slots.hint"
      class="small text-secondary"
    >
      <slot name="hint" />
    </div>
  </div>
</template>
