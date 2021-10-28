<script>
import { isEmpty } from 'lodash-es'

export default {
  props: {
    label: {
      type: String,
      default: null
    },
    text: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: null
    }
  },
  methods: {
    isEmpty
  }
}
</script>

<template>
  <div>
    <b class="small text-secondary">
      <template v-if="$slots.label">
        <slot name="label" />
      </template>
      <template v-else> {{ label }}</template>
    </b>

    <template>
      <template v-if="$slots.text">
        <slot name="text" />
      </template>
      <div
        v-else-if="!isEmpty(text)"
        class=""
      >
        {{ text }}
      </div>
    </template>
  </div>
</template>
