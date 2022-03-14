<script>
import classNames from 'classnames'
import { upperFirst, isNil } from 'lodash-es'
import format from '@/utils/formatters'

/**
 * Additional formatters can be add in formatters file
 * @see { @link /src/utils/formatters.js}
 */
const VALID_FORMATTERS = [
  'currencyBRL',
  'phone',
  'datetime'
]

function renderValue (h, context) {
  const functionName = 'format' + upperFirst(context.format)

  if (context.isUsingSlot) {
    return context.$slots.default
  }

  if (isNil(context.value)) {
    return 'N/A'
  }

  if (!isNil(context.format)) {
    return format[functionName](context.value, context.formatting)
  }

  return context.value
}

function renderLinkCell (h, context) {
  return (
    <a
      vOn:mouseup_prevent={context.onLinkClicked}
      vOn:click={context.prevent}
      href={context.url()}
      class={classNames([
        'd-block text-decoration-none',
        !context.hasDecoration && 'text-dark'
      ])}
    >
      { renderValue(h, context) }
    </a>
  )
}

function renderNormalCell (h, context) {
  return renderValue(h, context)
}

function renderCell (h, context, element) {
  return (
    <td
      nowrap={context.nowrap}
      class={classNames([
        `text-${context.align}`,
        { 'has-link': context.hasRowLinks }
      ])}
    >
      { element }
    </td>
  )
}

export default {
  props: {
    value: undefined,
    isUsingSlot: {
      type: Boolean,
      default: false
    },
    url: {
      type: Function,
      default: () => {}
    },
    format: {
      type: String,
      default: null,
      validator: (value) => VALID_FORMATTERS.includes(value)
    },
    formatting: undefined,
    hasDecoration: {
      type: Boolean,
      default: false
    },
    hasRowLinks: {
      type: Boolean,
      default: false
    },
    align: {
      type: String,
      default: 'left'
    },
    nowrap: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    prevent (event) {
      event.preventDefault()
    },
    onLinkClicked (event) {
      if (event.which === 1) {
        this.$emit('clicked')
      }
    }
  },
  render (h) {
    const element = this.hasRowLinks
      ? renderLinkCell(h, this)
      : renderNormalCell(h, this)

    return renderCell(h, this, element)
  }
}
</script>
