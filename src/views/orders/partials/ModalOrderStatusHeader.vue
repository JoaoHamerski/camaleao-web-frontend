<script>
export default {
  props: {
    status: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <div class="text-center mb-3">
    <div class="text-secondary small">
      STATUS ATUAL
    </div>
    <h5
      class="fw-bold"
      :class="status.avaliable ? 'text-success' : 'text-warning'"
    >
      {{ status.text }}
    </h5>
  </div>
</template>
