<script>
import {
  faEllipsisH,
  faFileInvoice,
  faDollarSign,
  faArrowAltCircleLeft
} from '@fortawesome/free-solid-svg-icons'

import { isEmpty } from 'lodash-es'
import { clients } from '@/constants/route-names'

import TheOrderHeaderCogOptions from './TheOrderHeaderCogOptions.vue'

export default {
  components: {
    TheOrderHeaderCogOptions
  },
  props: {
    order: {
      type: Object,
      default: () => {}
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    isReportLoading: {
      type: Boolean,
      default: false
    },
    isOrderClosed: {
      type: Boolean,
      required: true
    },
    isOrderPaid: {
      type: Boolean,
      required: true
    },
    isOrderPreRegistered: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      clients,
      icons: {
        faEllipsisH,
        faFileInvoice,
        faDollarSign,
        faArrowAltCircleLeft
      }
    }
  },
  computed: {
    isReportDisabled () {
      return !this.order || !this.order.code
    },
    paymentBtnDisabledMessage () {
      if (isEmpty(this.order)) {
        return true
      }

      if (this.isOrderPaid) {
        return 'Pedido já pago'
      }

      if (this.isOrderClosed) {
        return 'Não é possível registrar pagamento em pedidos fechados.'
      }

      if (this.order.price === null) {
        return 'Pedido em pré-registro sem preço, impossível efetuar pagamentos.'
      }

      return false
    }
  },
  methods: {
    isEmpty,
    onAddPaymentClick () {
      this.$emit('open-modal', {
        modal: 'payment',
        payload: {
          isEdit: false
        }
      })
    },
    onGenerateReportClick () {
      this.$emit('open-modal', {
        modal: 'report'
      })
    },
    onOpenModal (event) {
      this.$emit('open-modal', event)
    },
    onToggleSuccess () {
      this.$emit('toggle-success')
    }
  }
}
</script>

<template>
  <div class="d-flex row flex-column flex-sm-row justify-content-between">
    <div class="col-sm-3 mb-2 mb-sm-0">
      <AppButton
        outlined
        :disabled-message="!order.client && 'O pedido não possui cliente'"
        @click="$helpers.redirectTo(clients.show, {client: order.client})"
      >
        <FontAwesomeIcon :icon="icons.faArrowAltCircleLeft" />
        Cliente
      </AppButton>
    </div>

    <div class="col d-flex flex-column flex-sm-row justify-content-between">
      <div class="col col-sm-4 d-flex mb-2 mb-sm-0">
        <AppButton
          class="flex-grow-1 flex-sm-grow-0"
          color="success"
          outlined
          :icon="icons.faDollarSign"
          :disabled-message="paymentBtnDisabledMessage"
          @click="onAddPaymentClick"
        >
          Adicionar pagamento
        </AppButton>
      </div>

      <div class="col col-sm-4 d-flex justify-content-end">
        <AppButton
          class="me-1 flex-grow-1 flex-sm-grow-0"
          :icon="icons.faFileInvoice"
          :disabled="isReportDisabled"
          :loading="isReportLoading"
          @click.prevent="onGenerateReportClick"
        >
          Gerar relatório
        </AppButton>
        <AppButton
          id="dropdownOptions"
          data-bs-toggle="dropdown"
          :icon="icons.faEllipsisH"
          :disabled="!order"
        />
        <TheOrderHeaderCogOptions
          v-bind="{
            order,
            isLoading,
            isOrderClosed,
            isOrderPreRegistered,
            isOrderPaid
          }"
          @open-modal="onOpenModal"
          @toggle-success="onToggleSuccess"
        />
      </div>
    </div>
  </div>
</template>
