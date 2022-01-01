<script>
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

export default {
  name: 'SidebarItemCollapsible',
  props: {
    id: {
      type: String,
      default: ''
    },
    icon: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      collapsibleRoutes: [],
      icons: {
        faChevronLeft
      }
    }
  },
  computed: {
    isActive () {
      const activeRouteName = this.$route.name

      return this.collapsibleRoutes.includes(activeRouteName)
    }
  },
  mounted () {
    this.$children.forEach(child => {
      if (child?.to?.name) {
        this.collapsibleRoutes.push(child.to.name)
      }
    })
  }
}
</script>

<template>
  <span>
    <li
      class="list-group-item list-sidebar-item clickable d-flex justify-content-between px-4"
      :class="isActive ? '' : 'collapsed'"
      :data-bs-target="`#collapse-${id}`"
      data-bs-toggle="collapse"
    >
      <span>
        <FontAwesomeIcon
          :icon="icon"
          class="text-primary me-1"
          fixed-width
        />
        <slot name="collapsible-title" />
      </span>
      <span class="chevron-icon"><FontAwesomeIcon :icon="icons.faChevronLeft" /></span>
    </li>

    <div
      :id="`collapse-${id}`"
      class="collapse"
      :class="{'show': isActive }"
    >
      <slot name="collapsible-items" />
    </div>
  </span>
</template>

<style lang="scss" scoped>
::v-deep {
  .chevron-icon {
    transition: transform .25s;
  }

  [data-bs-toggle="collapse"]:not(.collapsed) .chevron-icon {
    transform: rotate(-90deg);
  }
}
</style>
