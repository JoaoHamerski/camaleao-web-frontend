<script lang="jsx">
import classNames from 'classnames'

import sidebarItems from './sidebar-items'
import { kebabCase, map } from 'lodash-es'
import { mapGetters, mapActions } from 'vuex'

import SidebarItem from './SidebarItem.vue'
import SidebarHeader from './SidebarHeader.vue'
import SidebarItemCollapsible from './SidebarItemCollapsible.vue'

function renderSidebarNormalItem (h, context, item) {
  const id = kebabCase(item.title)

  if (!context.itemConditionPass(item)) {
    return
  }

  return (
    <SidebarItem
      id={id}
      key={id}
      icon={item.icon}
      to={item.route}
      action={item.click}
      cssStyle={item.style}
    >
      { item.title }
    </SidebarItem>
  )
}

function renderSidebarCollapsibleItem (h, context, item) {
  const id = kebabCase(item.title)
  const scopedSlots = {
    title: () => item.title,
    items: () => map(
      item.items,
      (item) => renderSidebarNormalItem(h, context, item)
    )
  }

  if (!context.itemConditionPass(item)) {
    return
  }

  return (
    <SidebarItemCollapsible
      id={id}
      key={id}
      icon={item.icon}
      to={item.route}
      {...{ scopedSlots }}
    />
  )
}

function renderSidebarItem (h, context, item) {
  if ('items' in item) {
    return renderSidebarCollapsibleItem(h, context, item)
  }

  return renderSidebarNormalItem(h, context, item)
}

function renderList (h, context) {
  return (
    <ul class="list-group list-group-flush">
      { map(sidebarItems, (item) => renderSidebarItem(h, context, item)) }
    </ul>
  )
}

function renderSidebar (h, context) {
  return (
    <nav
      id="sidebar"
      class={classNames(['custom-scrollbar sidebar-scrollbar', {
        active: context.isSidebarActive
      }])}
    >
      { <SidebarHeader auth-user={context.authUser}/> }

      <hr class="border-light" />

      { renderList(h, context) }
    </nav>
  )
}

export default {
  props: {
    authUser: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapGetters('sidebar', ['isSidebarActive'])
  },
  methods: {
    ...mapActions('auth', ['logout']),
    itemHasCondition (item) {
      return 'condition' in item
    },
    itemConditionPass (item) {
      return this.itemHasCondition(item)
        ? item.condition()
        : true
    }
  },
  render (h) {
    return renderSidebar(h, this)
  }
}
</script>
