<script>
import { isEmpty } from 'lodash-es'
import { formatCurrencyBRL } from '@/utils/formatters'

import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    payment: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      icons: {
        faExclamationCircle
      }
    }
  },
  methods: {
    isEmpty,
    formatCurrencyBRL
  }
}
</script>

<template>
  <AppModal
    id="dailyPaymentConfirmationErrorModal"
    :value="value"
    color="danger"
    centered
    v-on="$listeners"
  >
    <template #title>
      Erro ao confirmar
    </template>

    <template #body>
      <div class="text-center mb-3">
        <FontAwesomeIcon
          :icon="icons.faExclamationCircle"
          size="4x"
          class="text-danger"
        />
      </div>
      <h5 class="text-center fw-bold mb-4">
        Não é possível confirmar o pagamento
      </h5>

      <div
        v-if="!isEmpty(payment)"
        class="text-center mb-4"
      >
        <template v-if="payment.order.total_owing === 0">
          O pedido já está pago
        </template>
        <template v-else>
          O valor do pagamento <span class="fw-bold">({{ formatCurrencyBRL(payment.value) }})</span> excede o total que falta pagar do pedido <span class="fw-bold">({{ formatCurrencyBRL(payment.order.total_owing) }}).</span>
        </template>
      </div>

      <div class="text-center">
        <AppButton
          btn-class="fw-bold btn-lg"
          data-bs-dismiss="modal"
        >
          OK
        </AppButton>
      </div>
    </template>
  </AppModal>
</template>
