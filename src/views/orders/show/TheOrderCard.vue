<script>
import TheOrderCardBody from './TheOrderCardBody'
import TheOrderCardHeader from './TheOrderCardHeader'
import TheOrderCardPlaceholder from './TheOrderCardPlaceholder'

export default {
  components: {
    TheOrderCardBody,
    TheOrderCardHeader,
    TheOrderCardPlaceholder
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    order: {
      type: Object,
      default: null
    },
    isOrderClosed: {
      type: Boolean,
      default: false
    },
    isOrderPreRegistered: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    cardColor () {
      if (this.order.states.includes('CLOSED')) {
        return 'secondary'
      }

      if (this.order.states.includes('PRE-REGISTERED')) {
        return 'warning'
      }

      return 'primary'
    }
  },
  methods: {
    onOpenModalRequest (event) {
      this.$emit('on-open-modal', event)
    }
  }
}
</script>

<template>
  <AppCard
    v-if="!isLoading"
    :color="cardColor"
  >
    <template #header>
      <TheOrderCardHeader
        v-bind="{order, isOrderClosed}"
      />
    </template>

    <template #body>
      <TheOrderCardBody
        v-bind="{order, isOrderPreRegistered}"
        @open-modal="onOpenModalRequest"
      />
    </template>
  </AppCard>
  <TheOrderCardPlaceholder v-else />
</template>
