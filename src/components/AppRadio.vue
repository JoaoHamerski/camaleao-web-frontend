<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    error: {
      type: String,
      default: ''
    },
    labelProp: {
      type: String,
      default: 'label'
    },
    valueProp: {
      type: String,
      default: 'value'
    },
    value: {
      type: [String, Number],
      default: ''
    },
    options: {
      type: Array,
      default: () => ([])
    },
    align: {
      type: String,
      default: 'horizontal'
    },
    defaultMargin: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    alignmentClass () {
      if (this.align === 'horizontal') {
        return 'form-check-inline'
      }

      return ''
    },
    hasError () {
      return this.error !== ''
    }
  }
}
</script>

<template>
  <div :class="defaultMargin && 'mb-3'">
    <div>
      <label
        v-if="$slots.default"
        class="form-label fw-bold"
      >
        <slot />
      </label>
    </div>

    <div
      v-for="(option, index) in options"
      :key="option.id || index"
      class="form-check"
      :class="alignmentClass"
    >
      <input
        :id="`radio_${option.id || index}`"
        class="form-check-input"
        :class="hasError && 'is-invalid'"
        type="radio"
        :name="name"
        :value="option[valueProp]"
        :checked="option[valueProp] === value"
        :disabled="option.disabled"
        @change="$emit('input', $event.target.value)"
      >
      <label
        class="form-check-label"
        :for="`radio_${option.id || index}`"
      >
        {{ option[labelProp] }}
      </label>
    </div>
    <div
      v-if="hasError"
      class="small text-danger"
    >
      {{ error }}
    </div>
  </div>
</template>
