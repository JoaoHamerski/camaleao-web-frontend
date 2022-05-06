<script>
import { faFileAlt } from '@fortawesome/free-solid-svg-icons'

export default {
  props: {
    payment: {
      type: Object,
      default: null
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      icons: {
        faFileAlt
      }
    }
  }
}
</script>
<template>
  <AppModal
    id="modalShowPaymentVouchers"
    :value="value"
    data-bs-focus="false"
    data-bs-keyboard="false"
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faFileAlt"
        fixed-width
      />
      Comprovantes de pagamento
    </template>

    <template #body>
      <template v-if="payment">
        <div class="text-center mb-3">
          <div class="mb-1">
            Comprovantes de pagamento do pedido
          </div>
          <a
            :href="$helpers.getUrl(
              'orders.show',
              {
                client: payment.order.client.id,
                order: payment.order.id
              }
            )"
            class="h5 text-decoration-none fw-bold"
          >{{ payment.order.code }}</a>
        </div>

        <AppViewerItems
          :files="payment.order.payment_voucher_paths"
          alt="Comprovante de pagamento"
          col="4"
        />

        <div class="text-end mt-3">
          <AppButton
            color="light"
            data-bs-dismiss="modal"
          >
            Fechar
          </AppButton>
        </div>
      </template>
    </template>
  </AppModal>
</template>
