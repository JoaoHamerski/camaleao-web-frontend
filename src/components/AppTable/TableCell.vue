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
  'date'
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
    return format[functionName](context.value)
  }

  return context.value
}

function renderLinkCell (h, context) {
  return (
    <a
      href="#"
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
    <td class={`text-${context.align}`}>
      { element }
    </td>
  )
}

export default {
  props: {
    isUsingSlot: {
      type: Boolean,
      default: false
    },
    value: undefined,
    format: {
      type: String,
      default: null,
      validator: (value) => VALID_FORMATTERS.indexOf(value) !== -1
    },
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
