<script>
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

export default {
  props: {
    id: {
      type: String,
      required: true
    },
    titleSize: {
      type: String,
      default: 'h6'
    },
    color: {
      type: String,
      default: 'primary'
    },
    centered: {
      type: Boolean,
      default: false
    },
    scrollable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      icons: {
        faTimesCircle
      }
    }
  },
  computed: {
    modalDialogClasses () {
      return {
        'modal-dialog-scrollable': this.scrollable,
        'modal-dialog-centered': this.centered
      }
    }
  }
}
</script>

<template>
  <div
    :id="id"
    class="modal fade"
    tabindex="-1"
    :aria-labelledby="`${id}Label`"
    aria-hidden="true"
  >
    <div
      class="modal-dialog h"
      :class="modalDialogClasses"
    >
      <div class="modal-content">
        <div
          class="modal-header py-0 pe-0 text-white "
          :class="`bg-${color}`"
        >
          <h5
            :id="`${id}Label`"
            class="fw-bold my-0"
            :class="titleSize"
          >
            <slot name="title" />
          </h5>
          <div
            class="close-modal"
            data-bs-dismiss="modal"
            aria-label="Fechar"
          >
            <FontAwesomeIcon
              class="close-modal-icon"
              :icon="icons.faTimesCircle"
            />
          </div>
        </div>
        <div class="modal-body">
          <slot name="body" />
        </div>
        <div
          v-if="$slots.footer"
          class="modal-footer"
        >
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>

.close-modal {
  padding: 1rem;
  color: darken(white, 10%);
  transition: color .15s;

  &:hover {
    cursor: pointer;
    .close-modal-icon {
      color: darken(white, 15%);
    }
  }
}
</style>
