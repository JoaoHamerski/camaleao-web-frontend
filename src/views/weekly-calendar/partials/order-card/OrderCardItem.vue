<script>
import { faCheck } from '@fortawesome/free-solid-svg-icons'
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
function renderCheckItemButton (h, context) {
  if (!context.shouldRenderCheckButton()) {
    return
  }

  return (
    <AppButton
      vOn:click_prevent={() => context.btnClicked(context.item.prop)}
      btn-class="btn-sm"
      icon={faCheck}
      color="success"
      outlined
      loading={context.loadingButton}
      content="Concluir status"
      v-tippy={{placement: 'top'}}
    ></AppButton>
  )
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
        'list-group-item d-flex justify-content-between align-items-center',
        isFunction(context.item.classes)
          ? context.item.classes(context)
          : context.item.classes
      ])}
    >
      <span>
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
      </span>

      { renderCheckItemButton(h, context) }
    </li>
  )
}

export default {
  props: {
    loadingButton: {
      type: Boolean,
      default: false
    },
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
    },
  },
  data () {
    return {
      itemsWithButtons: [
        'status.text'
      ]
    }
  },
  methods: {
    shouldRenderCheckButton () {
      if (!this.itemsWithButtons.includes(this.item.prop)) {
        return false
      }

      if (this.item.renderCheckButton(this)) {
        return true
      }

      return false
    },
    btnClicked(prop) {
      if (prop === 'status.text') {
        this.$emit('btn-status-clicked')
      }
    }
  },
  render (h) {
    return renderListItem(h, this);
  }
}
</script>

