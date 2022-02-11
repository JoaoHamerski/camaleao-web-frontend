<script>
export default {
  props: {
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
    }
  },
  computed: {
    alignmentClass () {
      if (this.align === 'horizontal') {
        return 'form-check-inline'
      }

      if (this.align === 'vertical') {
        return ''
      }

      return ''
    }
  }
}
</script>

<template>
  <div>
    <div
      v-for="option in options"
      :key="option.id"
      class="form-check"
      :class="alignmentClass"
    >
      <input
        :id="`radio_${option.id}`"
        class="form-check-input"
        type="radio"
        :name="`radio_${option.id}`"
        :value="option[valueProp]"
        :checked="option[valueProp] === value"
        :disabled="option.disabled"
        @change="$emit('input', $event.target.value)"
      >
      <label
        class="form-check-label"
        :for="`radio_${option.id}`"
      >
        {{ option[labelProp] }}
      </label>
    </div>
  </div>
</template>
