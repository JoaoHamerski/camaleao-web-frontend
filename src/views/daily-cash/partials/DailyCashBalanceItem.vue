<script>
import {
  faHandHoldingUsd,
  faFunnelDollar
} from '@fortawesome/free-solid-svg-icons'

export default {
  props: {
    balance: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      icons: {
        faHandHoldingUsd,
        faFunnelDollar
      },
    }
  },
  computed: {
    balanceClass () {
      if (this.balance.balance >= 0) {
        return 'text-success'
      }

      return 'text-danger'
    }
  }
}
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <div v-if="balance">
    <div class="fw-bold">
      <slot />
    </div>
    <h4
      :class="balanceClass"
      class="mb-0"
      v-html="$helpers.toBRL(balance.balance, true)"
    />
    <div class="small">
      <div>
        <FontAwesomeIcon
          :icon="icons.faHandHoldingUsd"
          class="text-success me-1"
          fixed-width
        />
        <span class="text-dark">{{ $helpers.toBRL(balance.entry) }}</span>
      </div>
      <div>
        <FontAwesomeIcon
          :icon="icons.faFunnelDollar"
          class="text-danger me-1"
          fixed-width
        />
        <span class="text-dark">{{ $helpers.toBRL(-balance.out) }}</span>
      </div>
    </div>
  </div>
</template>
