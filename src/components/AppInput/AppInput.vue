<script>
import classNames from 'classnames'
import { isEmpty } from 'lodash-es'
import Cleave from 'cleave.js'

import {
  renderInput,
  renderInputLabel,
  renderErrorMessage,
  renderHintMessage
} from './renders'

export default {
  directives: {
    cleave: {
      inserted: (el, binding, vnode) => {
        if (vnode.context.mask !== undefined) {
          el.cleave = new Cleave(el, binding.value || {})
        }
      },
      update: (el, binding, vnode) => {
        const event = new Event('input', { bubbles: true })

        if (vnode.context.mask !== undefined) {
          setTimeout(function () {
            el.dispatchEvent(event)
          }, 100)
        }
      }
    }
  },
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Number],
      required: true
    },
    label: {
      type: [String, Number],
      default: undefined
    },
    mask: undefined,
    value: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    inputClass: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    disabledMessage: {
      type: String,
      default: ''
    },
    error: {
      type: [Boolean, String],
      default: false
    },
    optional: {
      type: Boolean,
      default: false
    },
    hint: {
      type: String,
      default: null
    },
    defaultMargin: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      inputType: this.type,
      tippyConfig: {
        placement: 'bottom',
        duration: '150',
        arrow: true
      }
    }
  },
  computed: {
    inputClasses () {
      return classNames([
        'form-control',
        this.inputClass,
        {
          'is-invalid': this.hasError
        }
      ])
    },
    isDisabled () {
      return this.disabled || !isEmpty(this.disabledMessage)
    },
    isTypePassword () {
      return this.inputType === 'password'
    },
    inputLabel () {
      return this.$slots.default || this.label
    },
    isInputGroup () {
      return this.$slots.append || this.$slots.prepend
    },
    shouldRenderDisabledMessage () {
      return !isEmpty(this.disabledMessage)
    },
    hasError () {
      return !!this.error
    },
    hintId () {
      return this.hasHint
        ? this.name + 'Hint'
        : null
    },
    hasHint () {
      return !!(this.hint || this.$slots.hint)
    }
  },
  methods: {
    focusInput () {
      const input = this.$refs.input.$el
      const length = input.value.length

      input.focus()

      // Fix cursor not be placed at end of input on focus
      setTimeout(() => { input.setSelectionRange(length, length) }, 0)
    },
    togglePassord () {
      this.isTypePassword
        ? this.inputType = 'text'
        : this.inputType = 'password'

      this.focusInput()
    }
  },
  render: function (h) {
    return (
      <div class={classNames({ 'mb-3': this.defaultMargin })}>
        { renderInputLabel(h, this) }
        { renderInput(h, this) }
        { renderErrorMessage(h, this) }
        { renderHintMessage(h, this) }
      </div>
    )
  }
}
</script>
