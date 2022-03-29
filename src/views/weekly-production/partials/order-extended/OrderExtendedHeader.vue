<script>
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons'

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
  data () {
    return {
      icons: {
        faBoxOpen
      }
    }
  }
}
</script>
<template>
  <div
    class="card-header text-white position-relative fw-bold py-2"
    :class="isOrderPreRegistered ? 'bg-link-warning' : 'bg-link-primary'"
  >
    <a
      class="stretched-link"
      target="_blank"
      :href="orderUrl"
    />

    <FontAwesomeIcon :icon="icons.faBoxOpen" />
    {{ orderTitle }}
  </div>
</template>
