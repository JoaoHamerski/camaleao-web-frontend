<script>
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

export default {
  props: {
    id: {
      type: String,
      required: true
    },
    headerClass: {
      type: String,
      default: ''
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isActive: this.active,
      icons: {
        faChevronDown
      }
    }
  }
}
</script>

<template>
  <div>
    <div
      data-bs-toggle="collapse"
      :data-bs-target="`#${id}`"
      :aria-controls="id"
      class="d-flex justify-content-between clickable collapsed"
      :class="headerClass"
    >
      <slot name="header" />
      <div>
        <FontAwesomeIcon
          class="fa-icon"
          :icon="icons.faChevronDown"
        />
      </div>
    </div>
    <div
      :id="id"
      class="collapse"
      :class="isActive && 'show'"
    >
      <slot name="body" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .fa-icon {
    transition: all .2s;
  }

  .collapsed .fa-icon {
    transform: rotate(90deg);
  }
</style>
