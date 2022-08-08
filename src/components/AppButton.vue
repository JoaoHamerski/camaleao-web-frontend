<script>
import { isEmpty } from 'lodash-es'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const tippy = {
  duration: 150,
  arrow: true,
  placement: 'top'
}

function renderIsLoadingIcon (h, context) {
  return (
    <span>
      <span
        class="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      />
      <span class="visually-hidden">Carregando...</span>
    </span>
  )
}

function renderFWIcon (h, context) {
  return (
    <FontAwesomeIcon
      class={context.iconClass}
      icon={context.icon}
    />
  )
}

function renderIcon (h, context) {
  const shouldRenderIcon = !context.loading && context.icon
  const shouldRenderLoading = context.loading

  if (context.loading || context.icon) {
    return (
      <div class="fa-fw d-inline-block">
        { shouldRenderIcon && renderFWIcon(h, context) }
        { shouldRenderLoading && renderIsLoadingIcon(h, context) }
      </div>
    )
  }
}

function renderBtn (h, context) {
  return (
    <button
      on={context.$listeners}
      disabled={context.isDisabled}
      class={context.btnClasses}
      data-bs-toggle={context.isModalToggle && 'modal'}
      data-bs-target={context.modalTarget || false}
    >
      { renderIcon(h, context) }
      { context.$slots.default }
    </button>
  )
}

function renderMessageBtn (h, context) {
  return (
    <span
      tabindex="0"
      class={[
        context.block
          ? 'd-grid'
          : 'd-inline-block',
        'w-fit-content'
      ]}
      vTippy={{...tippy, ...context.tippySettings }}
      content={context.tooltipMessage}
    >
      { renderBtn(h, context) }
    </span>
  )
}

export default {
  props: {
    tippySettings: {
      type: Object,
      default: () => {}
    },
    rounded: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    icon: {
      type: Object,
      default: null
    },
    color: {
      type: String,
      default: 'primary'
    },
    outlined: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    tooltip: {
      type: [String, Boolean],
      default: false
    },
    disabledMessage: {
      type: [String, Boolean],
      default: false
    },
    btnClass: {
      type: String,
      default: ''
    },
    modalTarget: {
      type: String,
      default: null
    },
    iconClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    isModalToggle () {
      return !!this.modalTarget
    },
    btnClasses () {
      const appendClasses = {
        'v-tippy-append': !!this.$parent.$slots.append,
        'v-tippy-prepend': !!this.$parent.$slots.prepend
      }

      const isButtonAppended = this.$parent.$options.name === 'AppInput'

      return classNames([
        'btn',
        {
          [`btn-${this.color}`]: !this.outlined,
          [`btn-outline-${this.color}`]: this.outlined,
          'd-block w-100': this.block,
          'btn-rounded': this.rounded
        },
        isButtonAppended && { ...appendClasses },
        this.btnClass
      ])
    },
    tooltipMessage () {
      return this.tooltip || this.disabledMessage
    },
    isDisabled () {
      return this.loading || this.disabled || !!this.disabledMessage
    }
  },
  render: function (h) {
    return !isEmpty(this.tooltipMessage)
      ? renderMessageBtn(h, this)
      : renderBtn(h, this)
  }
}
</script>

<style lang="scss" scoped>
.v-tippy-append {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.v-tippy-prepend {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
