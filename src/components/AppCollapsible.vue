<script>
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { Collapse } from 'bootstrap'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    headerClass: {
      type: String,
      default: ''
    },
    hideArrow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      collapse: null,
      icons: {
        faChevronDown
      }
    }
  },
  watch: {
    value (val) {
      if (val) {
        this.collapse.show()
        return
      }

      this.collapse.hide()
    }
  },
  mounted () {
    this.collapse = new Collapse(this.$refs.collapse, {
      toggle: this.value
    })

    this.$refs.collapse.addEventListener(
      'show.bs.collapse',
      this.emitOnShow
    )

    this.$refs.collapse.addEventListener(
      'hide.bs.collapse',
      this.emitOnHide
    )
  },
  beforeDestroy () {
    this.$refs.collapse.removeEventListener(
      'show.bs.collapse',
      this.emitOnShow
    )

    this.$refs.collapse.removeEventListener(
      'hide.bs.collapse',
      this.emitOnHide
    )
  },
  methods: {
    emitOnShow () {
      this.$emit('show')
    },
    emitOnHide () {
      this.$emit('hide')
    },
    toggleCollapse () {
      this.$emit('input', !this.value)
      this.collapse.toggle()
    }
  }
}
</script>

<template>
  <div>
    <div
      role="button"
      class="d-flex justify-content-between clickable collapsed"
      :class="headerClass"
      :aria-expanded="value ? 'true' : 'false'"
      @click.prevent="toggleCollapse"
    >
      <slot name="header" />
      <div v-if="!hideArrow">
        <FontAwesomeIcon
          class="fa-icon"
          :icon="icons.faChevronDown"
        />
      </div>
    </div>

    <div
      ref="collapse"
      class="collapse"
    >
      <slot name="body" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  $transition-collapse:         height .15s ease;
  $transition-collapse-width:   width .15s ease;

  .collapsing {
    transition: $transition-collapse;

    &.collapse-horizontal {
      transition: $transition-collapse-width;
    }
  }

  .fa-icon {
    transition: all .2s;
  }

  .collapsed .fa-icon {
    transform: rotate(90deg);
  }
</style>
