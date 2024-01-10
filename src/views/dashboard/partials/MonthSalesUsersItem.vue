<script>
export default {
  props: {
    monthSale: {
      type: Object,
      required: true
    }
  },
  computed: {
    authUser () {
      return this.$store.getters['auth/authUser']
    },
  }
}
</script>

<template>
  <div class="mb-3">
    <div>
      <div
        class="small"
        :class="{'text-primary fw-bold': authUser.id === monthSale.user.id}"
      >
        {{ monthSale.user.name }}
      </div>
      <div class="fw-bold">
        <span
          v-tippy
          class="text-primary"
          content="Valor do produto"
        >{{ $helpers.toBRL(monthSale.products.total) }}</span>
        <span class="mx-2">&bull;</span>
        <span
          v-tippy
          class="text-danger"
          content="Custo direto"
        >{{ $helpers.toBRL(monthSale.direct_cost_items.total) }}</span>
      </div>
    </div>
    <div
      class="progress mb-1"
      style="height: 22px;"
    >
      <div
        class="progress-bar fw-bold"
        role="progressbar"
        aria-valuenow="0"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="{width: monthSale.products.percentage + '%'}"
      >
        {{ monthSale.products.percentage.toFixed(1) }}%
      </div>
    </div>
    <div
      class="progress"
      style="height: 22px;"
    >
      <div
        class="progress-bar bg-danger fw-bold"
        role="progressbar"
        aria-valuenow="0"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="{width: monthSale.direct_cost_items.percentage + '%'}"
      >
        {{ monthSale.direct_cost_items.percentage.toFixed(1) }}%
      </div>
    </div>
  </div>
</template>
