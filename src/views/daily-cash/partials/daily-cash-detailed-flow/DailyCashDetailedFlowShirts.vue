<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <div class="col mb-2 mb-sm-0">
    <div class="fw-bold">
      CAMISAS PRODUZIDAS
    </div>
    <h1 class="fw-bold">
      {{ item.shirts_total }}
    </h1>
    <div>
      Valor total: <b class="text-info">{{ $helpers.toBRL(item.total_price) }}</b>
    </div>
  </div>
</template>
