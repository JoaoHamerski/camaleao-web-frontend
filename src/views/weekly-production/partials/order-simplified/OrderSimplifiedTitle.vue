<script>
export default {
  props: {
    order: {
      type: Object,
      default: () => ({})
    },
    isOrderPreRegistered: {
      type: Boolean,
      default: false
    },
    orderUrl: {
      type: String,
      default: ''
    },
    orderTitle: {
      type: String,
      default: ''
    }
  },
  computed: {
    titleClass () {
      if (this.order.isPreCreated) {
        return 'bg-camaleao'
      }

      if (this.isOrderPreRegistered) {
        return 'bg-link-warning'
      }

      return 'bg-link-primary'
    }
  }
}
</script>

<template>
  <div
    class="simplified-title position-relative"
    :class="[titleClass, {'clickable': orderUrl}]"
  >
    <a
      v-if="orderUrl"
      target="_blank"
      class="stretched-link"
      :href="orderUrl"
    />

    <div>
      {{ orderTitle }}
    </div>
  </div>
</template>
