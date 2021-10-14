<script>
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { Modal } from 'bootstrap'

const EVENTS_EMITTED = [
  'show',
  'shown',
  'hide',
  'hidden'
]

export default {
  props: {
    id: {
      type: String,
      required: true
    },
    value: {
      type: Boolean,
      default: false
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
      modal: null,
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
  },
  watch: {
    value: {
      handler (val) {
        if (!this.modal) {
          return
        }

        if (val === true) {
          this.modal.show()
        }

        if (val === false) {
          this.modal.hide()
        }
      },
      immediate: true
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.modal)
    if (this.$refs.modal) {
      EVENTS_EMITTED.forEach(event => {
        this.$refs.modal.addEventListener(
          `${event}.bs.modal`,
          this.emitter(event)
        )
      })
    }
  },
  beforeDestroy () {
    EVENTS_EMITTED.forEach(event => {
      this.$refs.modal.removeEventListener(
        event,
        this.emitter
      )
    })
  },
  methods: {
    emitter (name) {
      return () => {
        if (name === 'hidden') {
          this.$emit('input', false)
        }

        if (name === 'shown') {
          this.$emit('input', true)
        }

        this.$emit(name)
      }
    }
  }
}
</script>

<template>
  <div
    :id="id"
    ref="modal"
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
