<script>
import {
  faEdit,
  faCheck,
  faTimes,
  faHandHoldingUsd
} from '@fortawesome/free-solid-svg-icons'
import { formatDatetime } from '@/utils/formatters'
import { ConfirmPayment } from '@/graphql/Payment.gql'
import roles from '@/constants/roles'

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
      roles,
      icons: {
        faEdit,
        faCheck,
        faTimes,
        faHandHoldingUsd
      },
      selectedPayment: {},
      loadingId: ''
    }
  },
  methods: {
    formatDatetime,
    getPaymentState (payment) {
      return PAYMENT_STATE[payment.is_confirmed]
    },
    onEditPaymentClick (payment) {
      this.$emit('open-modal', {
        modal: 'payment',
        payload: { payment, isEdit: true }
      })
    },
    async onConfirmPayment ({ id }, confirmation) {
      this.loadingId = id

      try {
        await this.$apollo.mutate({
          mutation: ConfirmPayment,
          variables: { id, confirmation }
        })

        this.$helpers.clearCacheFrom({ fieldName: 'cashFlowEntries' })

        this.$toast.success(
          confirmation
            ? 'Pagamento confirmado!'
            : 'Pagamento recusado!'
        )
      } catch (error) {
        console.log(error)
        this.$toast.error('Ops! Algo deu errado, tente novamente!')
      }

      this.loadingId = ''
    }
  }
}
</script>

<template>
  <div>
    <h5 class="fw-bold text-secondary">
      <FontAwesomeIcon :icon="icons.faHandHoldingUsd" />
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
              <template v-if="$helpers.canView(roles.GERENCIA)">
                <AppButton
                  outlined
                  btn-class="btn-sm"
                  color="success"
                  :icon="icons.faCheck"
                  tooltip="Confirmar"
                  :loading="payment.id === loadingId"
                  @click.prevent="onConfirmPayment(payment, true)"
                />

                <AppButton
                  outlined
                  btn-class="btn-sm"
                  color="danger"
                  :icon="icons.faTimes"
                  class="mx-2"
                  tooltip="Recusar"
                  :disabled="payment.id === loadingId"
                  @click.prevent="onConfirmPayment(payment, false)"
                />
              </template>

              <AppButton
                outlined
                btn-class="btn-sm"
                tooltip="Editar"
                :icon="icons.faEdit"
                @click.prevent="onEditPaymentClick(payment)"
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
