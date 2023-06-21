<script>
export default {
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    label: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    subitems: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    computedSubitems () {
      return this.subitems.filter(subitem => subitem.is_shown !== false)
    }
  }
}
</script>

<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <div>
      <b class="small text-secondary">{{ label }}</b>
    </div>
    <h5
      class="mb-0"
      :class="`text-${color}`"
      v-html="text"
    />
    <div
      v-for="item in computedSubitems"
      :key="item.label"
      class="small"
      :class="item.class ?? 'text-secondary'"
    >
      {{ item.label }}: <b>{{ item.text }}</b>
    </div>
  </div>
</template>
