<script>
export default {
  props: {
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
        :value="option.value"
        :checked="option.value === value"
        :disabled="option.disabled"
        @change="$emit('input', $event.target.value)"
      >
      <label
        class="form-check-label"
        :for="`radio_${option.id}`"
      >
        {{ option.label }}
      </label>
    </div>
  </div>
</template>
