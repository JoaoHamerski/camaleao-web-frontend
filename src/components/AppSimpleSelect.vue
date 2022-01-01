<script>
import { isEmpty, isNil } from 'lodash-es'

export default {
  props: {
    id: undefined,

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
    options: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    hasLabel () {
      return !!this.$slots.default || !isEmpty(this.label)
    }
  },
  methods: {
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
    :class="!removeDefaultMargin && 'mb-3'"
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

    <select
      :id="id"
      :name="name"
      class="form-select"
      :class="error && 'is-invalid'"
      v-bind="$attrs"
      v-on="$listeners"
      @change="$emit('input', $event.target.value)"
    >
      <option
        v-if="!hideDefaultOption"
        value=""
      >
        {{ placeholder }}
      </option>
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option[valueProp]"
      >
        {{ renderLabel(option) }}
      </option>
    </select>
    <div
      v-if="error"
      class="small text-danger mb-1"
    >
      {{ error }}
    </div>
  </div>
</template>
