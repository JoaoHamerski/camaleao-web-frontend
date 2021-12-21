<script>
import { TippyComponent } from 'vue-tippy'

export default {
  components: {
    Tippy: TippyComponent
  },
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
    },
    disabled: {
      type: Boolean,
      default: false
    },
    tooltip: {
      type: String,
      default: ''
    },
    disabledMessage: {
      type: [String, Boolean],
      default: false
    }
  },
  data () {
    return {
      active: false
    }
  },
  computed: {
    label () {
      return this.$slots.text || this.text
    },
    classes () {
      return [
        this.itemClass,
        {
          'disabled pointer-events-none': this.isDisabled
        }
      ]
    },
    isDisabled () {
      return this.disabled || this.disabledMessage
    },
    tooltipText () {
      return this.tooltip || this.disabledMessage
    },
    iconClass () {
      if (this.isDisabled) {
        return 'text-grey'
      }

      if (this.active) {
        return 'text-white'
      }

      return `text-${this.iconColor}`
    }
  }
}
</script>
<template>
  <li>
    <Tippy
      v-if="tooltipText"
      :to="'dropdownTooltip__' + label"
    >
      {{ tooltipText }}
    </Tippy>

    <span
      class="d-block"
      :name="'dropdownTooltip__' + label"
    >
      <a
        :disabled="isDisabled"
        class="dropdown-item"
        :class="classes"
        :href="href"
        v-on="$listeners"
        @mousedown="active = true"
        @mouseup="active = false"
      >
        <FontAwesomeIcon
          v-if="icon"
          :class="iconClass"
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
    </span>
  </li>
</template>
