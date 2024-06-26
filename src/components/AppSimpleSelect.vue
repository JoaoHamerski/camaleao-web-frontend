<script>
import { isEmpty, isNil, isPlainObject, first, isBoolean } from 'lodash-es'

export default {
  props: {
    id: undefined,
    value: {
      type: [Number, String],
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    error: {
      type: [Boolean, String],
      default: false
    },
    removeDefaultMargin: {
      type: Boolean,
      default: false
    },
    hideDefaultOption: {
      type: Boolean,
      default: false
    },
    optional: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: 'Selecione uma opção'
    },
    valueProp: {
      type: String,
      default: 'id'
    },
    labelProp: {
      type: [String, Function],
      default: null
    },
    label: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => []
    },
    selectClass: {
      type: [String, Array],
      default: ''
    },
    hint: {
      type: String,
      default: ''
    }
  },
  computed: {
    hasLabel () {
      return !!this.$slots.default || !isEmpty(this.label)
    },
    hasInputGroup () {
      return !!this.$slots.append
    }
  },
  methods: {
    isBoolean,
    getValue (option) {
      if (isPlainObject(first(this.options))) {
        return option[this.valueProp]
      }

      return option
    },
    renderLabel (option) {
      if (typeof this.labelProp === 'function') {
        return this.labelProp(option)
      }

      if (isNil(this.labelProp)) {
        return option
      }

      return option[this.labelProp]
    }
  }
}
</script>

<template>
  <div
    class="form-select-wrapper"
    :class="{
      'mb-3': !removeDefaultMargin,
    }"
  >
    <label
      v-if="hasLabel"
      class="form-label"
      :for="id"
    >
      <span class="fw-bold">
        <template v-if="$slots.default">
          <slot />
        </template>
        <template v-else>
          {{ label }}
        </template>
      </span>
      <span
        v-if="optional"
        class="small text-secondary"
      >(opcional)</span>
    </label>

    <div
      :class="{
        'input-group': hasInputGroup
      }"
    >
      <select
        :id="id"
        :disabled="disabled"
        :value="value"
        :name="name"
        :multiple="multiple"
        class="form-select"
        :class="[error && 'is-invalid', selectClass]"
        @input="$emit('input', $event.target.value)"
        @change="$emit('change', $event.target.value)"
      >
        <option
          v-if="!hideDefaultOption && !multiple"
          value=""
        >
          {{ placeholder }}
        </option>
        <option
          v-for="(option, index) in options"
          :key="option.id ? `${name}__${option.id}` : `${name}__${index}`"
          :value="getValue(option)"
          :disabled="option.disabled ?? false"
        >
          {{ renderLabel(option) }}
        </option>
      </select>
      <slot name="append" />
    </div>
    <div
      v-if="error && !isBoolean(error)"
      class="small text-danger mb-1"
    >
      {{ error }}
    </div>
    <small
      v-if="hint"
      class="text-secondary"
    >{{ hint }}</small>
    <small
      v-else-if="$slots.hint"
      class="text-secondary"
    >
      <slot name="hint" />
    </small>
  </div>
</template>
