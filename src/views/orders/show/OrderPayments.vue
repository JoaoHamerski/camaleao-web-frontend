<script>
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { formatDate } from '@/utils/formatters'
import PaymentModal from '../partials/PaymentModal'

const PAYMENT_STATE = {
  null: 'PENDENTE',
  0: 'RECUSADO',
  1: 'APROVADO'
}

export default {
  components: {
    PaymentModal
  },
  props: {
    payments: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      icons: {
        faEdit
      },
      selectedPayment: {}
    }
  },
  methods: {
    formatDate,
    getPaymentState (payment) {
      return PAYMENT_STATE[payment.is_confirmed]
    },
    selectPayment (payment) {
      this.$emit('open-modal', { payment, isEdit: true })
    }
  }
}
</script>

<template>
  <div v-if="payments.length">
    <PaymentModal
      modal-id="editPaymentModal"
      :is-edit="true"
      :payment="selectedPayment"
      @refresh="$emit('refresh')"
    />

    <ul class="list-group list-group-flush">
      <li
        v-for="payment in payments"
        :key="payment.id"
        class="list-group-item text-subtitle"
        :class="{
          'list-group-item-danger': payment.is_confirmed === 0,
          'list-group-item-warning': payment.is_confirmed === null,
        }"
      >
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <div>
              <b>{{ $helpers.toBRL(payment.value) }}</b>
              em
              <b>{{ formatDate(payment.date) }}</b>
              via
              <b>{{ payment.payment_via.name }}</b>
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
          <div v-if="payment.is_confirmed === null">
            <AppButton
              outlined
              btn-class="btn-sm"
              tooltip="Editar pagamento"
              :icon="icons.faEdit"
              @click="selectPayment(payment)"
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
