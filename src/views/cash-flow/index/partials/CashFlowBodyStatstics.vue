<script>
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    showStatistics: {
      type: Boolean,
      default: false
    },
    showBalance: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      icons: {
        faExclamationCircle
      }
    }
  }
}
</script>

<template>
  <div>
    <div
      v-if="showStatistics"
      class="d-flex justify-content-center"
    >
      <div class="text-primary text-subtitle">
        <div class="d-flex align-items-center mb-1">
          <div class="text-success me-1">
            Pedidos registrados:
            <b>
              {{ data.created_orders }}
              <template v-if="data.created_orders > 0">
                ({{ data.created_shirts }} camisas)
              </template>
            </b>
          </div>
          <FontAwesomeIcon
            v-tippy
            :icon="icons.faExclamationCircle"
            size="lg"
            content="Estatísticas feitas com relação na data de cadastro dos pedidos, por isso, não tem relação com a lista de pagamentos que podem ter datas diferentes."
          />
        </div>
        <template v-if="data.created_orders > 0">
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
        </template>
      </div>
    </div>
    <div
      v-if="showBalance"
      class="text-center"
    >
      <h5
        class="fw-bold mt-3"
        :class="data.balance > 0 ? 'text-success' : 'text-danger'"
      >
        BALANÇO FINAL: {{ $helpers.toBRL(data.balance) }}
      </h5>
    </div>
  </div>
</template>
