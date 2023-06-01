<script lang="jsx">
import classNames from 'classnames'
import { upperFirst, isNil } from 'lodash-es'
import format from '@/utils/formatters'

function renderValue (h, context) {
  const functionName = 'format' + upperFirst(context.header.format)

  if (context.isUsingSlot) {
    return context.$slots.default
  }

  if (isNil(context.value)) {
    return 'N/A'
  }

  if (!isNil(context.header.format)) {
    return format[functionName](context.value, context.header.formatting)
  }

  return context.value
}

function renderLinkCell (h, context) {
  return (
    <a
      key={context.url()}
      target="_blank"
      vOn:click={context.redirect}
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
      class={classNames([
        context.header.align && `text-${context.header.align}`,
        {
          'has-link': context.hasRowLinks,
          'text-nowrap': context.header.wrap
            ? !context.header.wrap
            : true
        }
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
    header: {
      type: Object,
      default: null
    },
    hasDecoration: {
      type: Boolean,
      default: false
    },
    hasRowLinks: {
      type: Boolean,
      default: false
    },
    openInNewTab: {
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
        this.redirect()
      }
    },
    redirect (event) {
      if (this.openInNewTab) {
        return true
      }

      event.preventDefault()

      return this.$router.push({
        path: this.url()
      })
    },
  },
  render (h) {
    const element = this.hasRowLinks
      ? renderLinkCell(h, this)
      : renderNormalCell(h, this)

    return renderCell(h, this, element)
  }
}
</script>
