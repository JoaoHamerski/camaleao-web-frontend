<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<template>
  <div>
    <div class="d-flex justify-content-center">
      <div class="text-primary text-subtitle">
        <div class="text-success mb-1">
          Pedidos registrados:
          <b>{{ data.created_orders }} ({{ data.created_shirts }} camisas)</b>
        </div>
        <b>DOS QUAIS:</b>
        <div>
          Fechados:
          <b>
            {{ data.closed_orders }}
            <template v-if="data.closed_shirts > 0">
              ({{ data.closed_shirts }} camisas)
            </template>
          </b>
        </div>
        <div>
          Sem pagamentos:
          <b>{{ data.no_payments_orders }}
            <template v-if="data.no_payments_shirts > 0">
              ({{ data.no_payments_shirts }} camisas)
            </template>
          </b>
        </div>
      </div>
    </div>
    <div class="text-center">
      <h5
        class="fw-bold mt-3"
        :class="data.balance > 0 ? 'text-success' : 'text-danger'"
      >
        BALANÇO FINAL: {{ $helpers.toBRL(data.balance) }}
      </h5>
    </div>
  </div>
</template>
