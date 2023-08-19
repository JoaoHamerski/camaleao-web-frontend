<script>
export default {
  props: {
    value: {
      type: [Number, String],
      required: true
    },
    status: {
      type: Array,
      required: true
    }
  },
  methods: {
    onInputChange (id) {
      this.$emit('input', id)
    },
    labelClass (option) {
      return option.pivot.is_confirmed
        ? 'text-success fw-bold'
        : ''
    }
  }
}
</script>

<template>
  <div>
    <AppRadio
      align="vertical"
      :value="value"
      name="order-status"
      :options="status"
      :label-prop="(option, index) => `${index + 1}. ${option.text}`"
      value-prop="id"
      :label-class="labelClass"
      @input="onInputChange"
    />
  </div>
</template>
