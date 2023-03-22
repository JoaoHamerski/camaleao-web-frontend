<script>
import { isNil } from 'lodash-es'

export default {
  props: {
    showBalance: {
      type: Boolean,
      default: false
    },
    balance: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    isNil
  }
}
</script>

<template>
  <div
    v-if="showBalance && !isNil(balance.value)"
    class="mb-3"
  >
    <div class="text-secondary text-center text-subtitle fw-bold">
      BALANÇO
    </div>
    <h4
      class="text-center fw-bold"
      :class="balance.value >= 0 ? 'text-success' : 'text-danger'"
    >
      {{ $helpers.toBRL(balance.value) }}
    </h4>
  </div>
</template>
