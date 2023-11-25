<script>
import {
  faEdit,
  faCheck,
  faTruck,
  faTimes,
  faHandHoldingUsd,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons'
import { formatDatetime } from '@/utils/formatters'
import roles from '@/constants/roles'

import ModalPaymentForm from '@/views/resources/payments/ModalPaymentForm.vue'
import OrderPaymentState from './OrderPaymentsState.vue'
import PaymentConfirmErrorModal from '@/views/resources/payments/PaymentConfirmErrorModal.vue'

const PAYMENT_STATE = {
  null: 'PENDENTE',
  false: 'RECUSADO',
  true: 'APROVADO'
}

export default {
  components: {
    ModalPaymentForm,
    OrderPaymentState,
    PaymentConfirmErrorModal,
    PaymentExpenseDeleteModal: () => import('@/views/resources/payments-expenses/PaymentExpenseDeleteModal.vue')
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
        faHandHoldingUsd,
        faExclamationCircle,
        faTruck
      },
      selectedPayment: {},
      loadingId: '',
      modalPaymentError: {
        value: false,
        payment: {}
      },
      modalPaymentDelete: {
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
    onDeletePayment(payment) {
      this.modalPaymentDelete.payment = payment
      this.modalPaymentDelete.value = true
    },
    onDeletePaymentSuccess () {
      this.modalPaymentDelete.value = false
      this.modalPaymentDelete.payment = {}
    },
    onPaymentError(payment) {
      this.modalPaymentError.payment =  payment
      this.modalPaymentError.value = true
    },
    onPaymentModalErrorHidden() {
      this.modalPaymentError.value = false
      this.modalPaymentError.payment = {}
    },
    getListGroupClass (payment) {
      return {
        'list-group-item-success': payment.is_confirmed === true,
        'list-group-item-danger': payment.is_confirmed === false,
        'list-group-item-warning': payment.is_confirmed === null,
      }
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

        <PaymentExpenseDeleteModal
          v-if="$helpers.canView(roles.GERENCIA)"
          v-model="modalPaymentDelete.value"
          :entry="modalPaymentDelete.payment"
          :is-expense="false"
          @success="onDeletePaymentSuccess"
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
            :class="getListGroupClass(payment)"
          >
            <div class="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center">
              <div class="mb-3 mb-sm-0">
                <div>
                  <b>{{ $helpers.toBRL(payment.value) }}</b>
                  <template v-if="payment.date">
                    em
                    <b>{{ formatDatetime(payment.date) }}</b>
                  </template>
                  via
                  <b>{{ $helpers.fallback(payment.via, 'name') }}</b>
                  <span
                    v-if="!payment.is_confirmed"
                    class="fw-bold"
                  >
                    - [{{ getPaymentState(payment) }}]
                  </span>
                  <small
                    v-if="payment.is_shipping"
                  >
                    &bull;
                    <FontAwesomeIcon
                      class="small"
                      :icon="icons.faTruck"
                    />
                  </small>
                </div>
                <div
                  v-if="payment.is_sponsor"
                  class="small text-secondary"
                >
                  <b>PATROCINADOR:</b> <a
                    :href="$helpers.getUrl('clients.show', {client: payment.sponsorship_client.id})"
                    target="blank"
                    class="fw-bold text-decoration-none"
                  >{{ payment.sponsorship_client.name }}</a>
                </div>
                <div
                  v-if="payment.note"
                  class="small text-secondary"
                >
                  <strong>NOTA:</strong> {{ payment.note }}
                </div>
                <div
                  v-if="payment.clientBalances.length"
                  class="small text-secondary"
                >
                  <b>SALDO:</b>
                  <span
                    v-for="balance in payment.clientBalances"
                    :key="balance.id"
                    class="me-1"
                  >
                    {{ $helpers.toBRL(balance.value, false, balance.value > 0) }}
                  </span>
                  <FontAwesomeIcon
                    v-if="payment.is_sponsor"
                    v-tippy
                    :icon="icons.faExclamationCircle"
                    content="Saldo contabilizado para o patrocinador"
                  />
                </div>
                <div
                  v-if="payment.is_bonus"
                >
                  <div
                    class="small text-secondary"
                  >
                    Bônus do cliente utilizado
                  </div>
                </div>
              </div>
              <div class="d-flex">
                <OrderPaymentState
                  :payment="payment"
                  @error="onPaymentError"
                  @edit="onEditPayment"
                  @delete="onDeletePayment"
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
