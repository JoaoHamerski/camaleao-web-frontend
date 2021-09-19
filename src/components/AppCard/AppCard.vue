<script>
import { camelCase } from 'lodash-es'
import classNames from 'classnames'

import renderCardHeader from './CardHeader'
import renderCardBody from './CardBody'
import renderCardFooter from './CardFooter'

export default {
  props: {
    id: {
      type: [String, Number],
      default: null
    },
    color: {
      type: String,
      default: 'primary'
    },
    hasBodyPadding: {
      type: Boolean,
      default: true
    },
    collapsible: {
      type: Boolean,
      default: false
    },
    collapsed: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      isCollapsed: this.collapsed,
      eventAttached: false,
      onShowCollapseEvent: () => {
        this.isCollapsed = false
        this.$emit('collapsed', false)
      },
      onHideCollapseEvent: () => {
        this.isCollapsed = true
        this.$emit('collapsed', true)
      }
    }
  },
  computed: {
    collapseId () {
      return camelCase(`collapse ${this.id}`)
    },
    collapsibleCardBodyClass () {
      return classNames(['collapse', {
        show: !this.collapsed
      }])
    },
    collapsibleCardIconClass () {
      return classNames([
        'fas fa-caret-down text-white',
        'card-collapsible-icon',
        {
          'card-icon-expanded': !this.isCollapsed
        }
      ])
    }
  },
  watch: {
    collapsible: {
      immediate: true,
      handler (val) {
        this.$nextTick(() => {
          const $card = this.$refs.card

          if (val) {
            $card.addEventListener('show.bs.collapse', this.onShowCollapseEvent)
            $card.addEventListener('hide.bs.collapse', this.onHideCollapseEvent)
          }

          if (!val) {
            $card.removeEventListener('show.bs.collapse', this.onShowCollapseEvent)
            $card.removeEventListener('hide.bs.collapse', this.onHideCollapseEvent)
            this.isCollapsed = true
          }
        })
      }
    }
  },
  render: function (h) {
    return (
      <div class="card" ref="card">
        { this.$slots.default }
        { renderCardHeader(h, this) }
        { renderCardBody(h, this)}
        { renderCardFooter(h, this) }
      </div>
    )
  }
}
</script>
