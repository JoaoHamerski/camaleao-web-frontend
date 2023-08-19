<script>
import { isString } from 'lodash-es'

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
      type: [String, Function],
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
    },
    labelClass: {
      type: [Function, String],
      default: ''
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
  },
  methods: {
    getLabelClass(option) {
      if (isString(this.labelClass)) {
        return this.labelClass
      }

      return this.labelClass(option)
    },
    getLabel(option, index) {
      if (isString(this.labelProp)) {
        return option[this.labelProp]
      }

      return this.labelProp(option, index)
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
        :id="`radio__${name}__${option.id || index}`"
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
        :class="['form-check-label', getLabelClass(option)]"
        :for="`radio__${name}__${option.id || index}`"
      >
        {{ getLabel(option, index) }}
      </label>
    </div>
    <div
      v-if="$slots.hint"
      class="small text-secondary"
    >
      <slot name="hint" />
    </div>
    <div
      v-if="hasError"
      class="small text-danger"
    >
      {{ error }}
    </div>
  </div>
</template>
