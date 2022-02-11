<script>
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { formatDatetime } from '@/utils/formatters'
import ModalOrderPayment from '../../partials/ModalOrderPayment'

const PAYMENT_STATE = {
  null: 'PENDENTE',
  false: 'RECUSADO',
  true: 'APROVADO'
}

export default {
  components: {
    ModalOrderPayment
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
    formatDatetime,
    getPaymentState (payment) {
      return PAYMENT_STATE[payment.is_confirmed]
    },
    onEditPaymentClick (payment) {
      this.$emit('open-payment-modal', { payment, isEdit: true })
    }
  }
}
</script>

<template>
  <div>
    <h5 class="fw-bold text-secondary">
      Pagamentos
    </h5>
    <div v-if="payments.length">
      <ModalOrderPayment
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
            'list-group-item-danger': payment.is_confirmed === false,
            'list-group-item-warning': payment.is_confirmed === null,
          }"
        >
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <div>
                <b>{{ $helpers.toBRL(payment.value) }}</b>
                em
                <b>{{ formatDatetime(payment.date) }}</b>
                via
                <b>{{ payment.via.name }}</b>
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
                @click="onEditPaymentClick(payment)"
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
  </div>
</template>
