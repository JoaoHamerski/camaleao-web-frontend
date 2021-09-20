<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<template>
  <select
    class="form-select"
    v-bind="$attrs"
    @change="$emit('input', $event.target.value)"
    v-on="$listeners"
  >
    <option
      v-for="(option, index) in options"
      :key="index"
      :value="option.value ? option.value : option.text.toLowerCase()"
    >
      {{ option.text }}
    </option>
  </select>
</template>
