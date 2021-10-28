<script>
import { isEmpty } from 'lodash-es'

export default {
  props: {
    id: undefined,
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
    valueProp: {
      type: String,
      default: 'id'
    },
    labelProp: {
      type: [String, Function],
      default: 'text'
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

      return option[this.labelProp]
    }
  }
}
</script>

<template>
  <div class="form-select-wrapper">
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
      class="form-select"
      v-bind="$attrs"
      v-on="$listeners"
      @change="$emit('input', $event.target.value)"
    >
      <option
        v-if="!hideDefaultOption"
        value=""
      >
        Seleciona uma opção
      </option>
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option[valueProp]"
      >
        {{ renderLabel(option) }}
      </option>
    </select>
  </div>
</template>
