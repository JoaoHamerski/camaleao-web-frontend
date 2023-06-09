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
    modalDialogClass: {
      type: String,
      default: ''
    },
    modalBodyClass: {
      type: String,
      default: ''
    },
    footerClass: {
      type: String,
      default: ''
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
      return [this.modalDialogClass, {
        'modal-dialog-scrollable': this.scrollable,
        'modal-dialog-centered': this.centered
      }]
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
      EVENTS_EMITTED.forEach(name => {
        this.$refs.modal.addEventListener(
          `${name}.bs.modal`,
          this.emitter
        )
      })
    }
  },
  beforeDestroy () {
    EVENTS_EMITTED.forEach(name => {
      this.$refs.modal.removeEventListener(
        `${name}.bs.modal`,
        this.emitter
      )
    })
  },
  methods: {
    emitter (event) {
      const name = event.type

      if (!event.target.isEqualNode(this.$refs.modal)) {
        return
      }

      if (name === 'hidden.bs.modal') {
        this.$emit('input', false)
      }

      if (name === 'shown.bs.modal') {
        this.$emit('input', true)
      }

      this.$emit(name.substring(0, name.indexOf('.')))
    }
  }
}
</script>

<template>
  <div
    :id="id"
    ref="modal"
    class="modal fade"
    :aria-labelledby="`${id}Label`"
    :aria-hidden="value ? 'true' : 'false'"
    :aria-modal="value ? 'true' : 'false'"
    tabindex="-1"
  >
    <div
      class="modal-dialog"
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

        <div :class="['modal-body', modalBodyClass]">
          <slot name="body" />
        </div>

        <div
          v-if="$slots.footer"
          class="modal-footer"
          :class="footerClass"
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
