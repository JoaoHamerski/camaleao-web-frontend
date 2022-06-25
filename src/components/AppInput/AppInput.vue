<script>
import classNames from 'classnames'
import { isEmpty } from 'lodash-es'
import Cleave from 'cleave.js'
import { DateTime } from 'luxon'
import 'cleave.js/dist/addons/cleave-phone.br'

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

        setTimeout(() => { el.dispatchEvent(event) }, 100)
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
    todayButton: {
      type: Boolean,
      default: false
    },
    mask: undefined,
    value: {
      type: [String, Number],
      default: ''
    },
    autocomplete: {
      type: String,
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
      type: [String, Boolean],
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
    },
    numeric: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      inputType: this.type,
      tippyConfig: {
        placement: 'bottom',
        duration: '150',
        arrow: true
      },
      dateRelated: ['date', 'week', 'month', 'year']
    }
  },
  computed: {
    inputAutocomplete () {
      const autocomplete = this.autocomplete || false

      return this.dateRelated.includes(this.inputType)
        ? 'off'
        : autocomplete
    },
    typeComputed () {
      if (this.dateRelated.includes(this.inputType)) {
        return 'text'
      }

      return this.inputType
    },
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
      return this.typeComputed === 'password'
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
  async created () {
    if (this.dateRelated.includes(this.type)) {
      await import('@/sass/_datepicker.scss')
    }
  },
  methods: {
    emitTodayDate () {
      const todayDate = DateTime.now().toFormat('dd/LL/yyyy')

      this.$emit('input', todayDate)
    },
    focusInput () {
      const input = this.$refs.input
      const length = input.value.length

      input.focus()

      // Fix cursor not be placed at end of input on focus
      setTimeout(() => { input.setSelectionRange(length, length) }, 0)
    },
    togglePassword () {
      this.inputType = this.isTypePassword
        ? 'text'
        : 'password'

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
