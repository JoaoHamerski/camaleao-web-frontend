<script>
import classNames from 'classnames'
import { isEmpty } from 'lodash-es'
import {
  renderInput,
  renderInputLabel,
  renderErrorMessage,
  renderHintMessage
} from './renders'

export default {
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
    mask: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Number, String],
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
      return !isEmpty(this.hint)
        ? this.name + 'Hint'
        : null
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
