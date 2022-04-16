<script>
import { get, isFunction } from 'lodash-es'
import classNames from 'classnames'

function renderListItemLink (h, context) {
  return (
    <a
      href={context.item.link(context)}
      class="text-decoration-none"
      target="_blank"
    >
      { renderListItemText(h, context)}
    </a>
  )
}

function renderListItemText (h, context) {
  const text = get(context.order, context.item.prop)

  if (context.item.computedProp) {
    return context.item.computedProp(text)
  }

  return text
}

function renderListItem (h, context) {
  if (!get(context.order, context.item.prop)) {
    return
  }

  return (
    <li
      v-tippy={{
        placement: context.isExpanded && !context.$isMobile ? 'right' : 'bottom',
        delay: [400, 0]
      }}
      content={context.item.title}
      class={classNames([
        'list-group-item',
        isFunction(context.item.classes)
          ? context.item.classes(context)
          : context.item.classes
      ])}
    >
      <FontAwesomeIcon
        icon={
          isFunction(context.item.icon)
            ? context.item.icon(context)
            : context.item.icon
        }
        fixed-width
        class="me-1"
      />

      {
        context.item.link
          ? renderListItemLink(h, context)
          : renderListItemText(h, context)
      }
    </li>
  )
}

export default {
  props: {
    isExpanded: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: null
    },
    order: {
      type: Object,
      default: null
    }
  },
  render (h) {
    return renderListItem(h, this);
  }
}
</script>

