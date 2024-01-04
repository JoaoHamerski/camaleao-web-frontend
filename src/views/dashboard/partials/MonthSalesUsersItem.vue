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
        {{ $helpers.toBRL(monthSale.total) }}
      </div>
    </div>
    <div
      class="progress"
      style="height: 22px;"
    >
      <div
        class="progress-bar fw-bold"
        role="progressbar"
        aria-valuenow="0"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="{width: monthSale.percentage + '%'}"
      >
        {{ monthSale.percentage }}%
      </div>
    </div>
  </div>
</template>
