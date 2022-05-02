<script>
import {
  faEdit,
  faCheck,
  faTimes,
  faHandHoldingUsd
} from '@fortawesome/free-solid-svg-icons'
import { formatDatetime } from '@/utils/formatters'
import roles from '@/constants/roles'

import ModalPaymentForm from '@/views/resources/payments/ModalPaymentForm.vue'
import PaymentState from '@/views/resources/payments/PaymentState.vue'
import PaymentConfirmErrorModal from '@/views/resources/payments/PaymentConfirmErrorModal.vue'

const PAYMENT_STATE = {
  null: 'PENDENTE',
  false: 'RECUSADO',
  true: 'APROVADO'
}

export default {
  components: {
    ModalPaymentForm,
    PaymentState,
    PaymentConfirmErrorModal
  },
  props: {
    payments: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      roles,
      icons: {
        faEdit,
        faCheck,
        faTimes,
        faHandHoldingUsd
      },
      selectedPayment: {},
      loadingId: '',
      modalPaymentError: {
        value: false,
        payment: {}
      }
    }
  },
  methods: {
    formatDatetime,
    getPaymentState (payment) {
      return PAYMENT_STATE[payment.is_confirmed]
    },
    onEditPayment (payment) {
      this.$emit('open-modal', {
        modal: 'payment',
        payload: { payment, isEdit: true }
      })
    },
    onPaymentError(payment) {
      this.modalPaymentError.payment =  payment
      this.modalPaymentError.value = true
    },
    onPaymentModalErrorHidden() {
      this.modalPaymentError.value = false
      this.modalPaymentError.payment = {}
    }
  }
}
</script>

<template>
  <AppContainer>
    <template #title>
      <FontAwesomeIcon :icon="icons.faHandHoldingUsd" />
      Pagamentos
    </template>
    <template #body>
      <div v-if="payments.length">
        <ModalPaymentForm
          modal-id="editPaymentModal"
          :is-edit="true"
          :payment="selectedPayment"
          @refresh="$emit('refresh')"
        />

        <PaymentConfirmErrorModal
          :value="modalPaymentError.value"
          :payment="modalPaymentError.payment"
          @hidden="onPaymentModalErrorHidden"
        />

        <ul class="list-group list-group-flush">
          <li
            v-for="payment in payments"
            :key="payment.id"
            class="list-group-item text-subtitle"
            :class="{
              'list-group-item-danger': payment.is_confirmed === false,
              'list-group-item-warning': payment.is_confirmed === null,
            }"
          >
            <div class="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center">
              <div class="mb-3 mb-sm-0">
                <div>
                  <b>{{ $helpers.toBRL(payment.value) }}</b>
                  em
                  <b>{{ formatDatetime(payment.date) }}</b>
                  via
                  <b>{{ $helpers.fallback(payment.via, 'name') }}</b>
                  <span
                    v-if="!payment.is_confirmed"
                    class="fw-bold"
                  >
                    - [{{ getPaymentState(payment) }}]
                  </span>
                </div>
                <div
                  v-if="payment.note"
                  class="small text-secondary"
                >
                  <strong>NOTA:</strong> {{ payment.note }}
                </div>
              </div>
              <div class="d-flex">
                <PaymentState
                  :payment="payment"
                  :confirmation="payment.is_confirmed"
                  @error="onPaymentError"
                  @edit="onEditPayment"
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div
        v-else
        class="text-secondary text-center py-3"
      >
        Nenhum pagamento registrado
      </div>
    </template>
  </AppContainer>
</template>
