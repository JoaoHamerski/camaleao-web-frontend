<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    onOptionClick (value) {
      this.$emit('input', value)
    },
    optionsLength () {
      return this.options.length
    }
  }
}
</script>

<template>
  <div class="small links-list">
    <template v-for="(option) in options">
      <span
        :key="option.value"
        class="links-list-item"
      >
        <span
          class="link-primary clickable"
          :class="{'fw-bold': option.value === value}"
          @click.prevent="onOptionClick(option.value)"
        >
          {{ option.text }}
        </span>
        <span class="links-list-separator mx-2">|</span>
      </span>
    </template>
  </div>
</template>

<style>
.links-list .links-list-item:last-child .links-list-separator {
  display: none;
}
</style>
