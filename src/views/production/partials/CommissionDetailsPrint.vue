<script>
export default {
  props: {
    commission: {
      type: Object,
      default: null
    }
  }
}
</script>

<template>
  <div>
    <div class="my-2 text-subtitle text-secondary fw-bold">
      {{ $helpers.toBRL(commission.print_commission) }} x  {{ commission.order.quantity }}
    </div>
    <div>
      <h5 class="fw-bold">
        {{ $helpers.toBRL(commission.print_total_commission) }}
      </h5>
    </div>
  </div>
</template>
