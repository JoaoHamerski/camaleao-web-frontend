<script>
export default {
  props: {
    color: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<template>
  <div>
    <div
      class="fw-bold small"
      :class="[!color && 'text-muted', `text-${color}`]"
    >
      <slot
        v-if="$slots.label"
        name="label"
      />
      <template v-else>
        {{ label }}
      </template>
    </div>

    <div
      class="text-subtitle"
      :class="`text-${color}`"
    >
      <slot
        v-if="$slots.text"
        name="text"
      />
      <template v-else>
        {{ $helpers.fallback(text) }}
      </template>
    </div>
  </div>
</template>
