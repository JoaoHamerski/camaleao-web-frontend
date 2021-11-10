<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    icon: {
      type: Object,
      default: null
    },
    itemClass: {
      type: String,
      default: ''
    },
    iconColor: {
      type: String,
      default: ''
    },
    href: {
      type: String,
      default: '#'
    }
  },
  data () {
    return {
      active: false
    }
  }
}
</script>
<template>
  <li v-on="$listeners">
    <a
      class="dropdown-item"
      :class="itemClass"
      :href="href"
      @mousedown="active = true"
      @mouseup="active = false"
    >
      <FontAwesomeIcon
        v-if="icon"
        :class="{
          [`text-${iconColor}`]: !active,
          'text-white': active
        }"
        fixed-width
        :icon="icon"
      />

      <template v-if="$slots.text">
        <slot name="text" />
      </template>
      <template v-else>
        {{ text }}
      </template>
    </a>
  </li>
</template>
