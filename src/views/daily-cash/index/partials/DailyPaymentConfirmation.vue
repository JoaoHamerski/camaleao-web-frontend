<script>
import roles from '@/constants/roles'
import { ConfirmPayment, GetPaymentsPendencies } from '@/graphql/Payment.gql'

import {
  faCheck,
  faTimes,
  faMinus,
  faExclamation,
  faEdit
} from '@fortawesome/free-solid-svg-icons'

export default {
  props: {
    payment: {
      type: Object,
      required: true
    },
    confirmation: {
      type: undefined,
      required: true
    },
    showActions: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      roles,
      loadingConfirmBtn: false,
      loadingDeclineBtn: false,
      modalError: false,
      icons: {
        faCheck,
        faTimes,
        faMinus,
        faExclamation,
        faEdit
      }
    }
  },
  computed: {
    isDisabled () {
      return this.loadingConfirmBtn || this.loadingDeclineBtn
    },
    showConfirmationButtons () {
      return this.showActions && this.confirmation === null
    },
    canBeConfirmed () {
      return this.payment.value <= this.payment.order.total_owing
    }
  },
  methods: {
    onEditClick () {
      this.$emit('edit', this.payment)
    },
    async assignPayment ({ confirmation }) {
      this.loadingConfirmBtn = confirmation
      this.loadingDeclineBtn = !confirmation

      try {
        await this.$apollo.mutate({
          mutation: ConfirmPayment,
          variables: {
            id: this.payment.id,
            confirmation
          },
          refetchQueries: [{ query: GetPaymentsPendencies }]
        })

        this.$helpers.clearCacheFrom({ fieldName: 'cashFlowEntries' })
        this.$helpers.clearCacheFrom({ fieldName: 'payments' })

        this.$toast.success(
          confirmation
            ? 'Pagamento confirmado!'
            : 'Pagamento recusado!'
        )

        this.$emit('success')
      } catch (error) {
        this.$emit('error', this.payment)
      }

      this.loadingDeclineBtn = false
      this.loadingConfirmBtn = false
    }
  }
}
</script>

<template>
  <div
    v-if="showConfirmationButtons"
    class="text-center position-relative"
  >
    <AppButton
      v-if="$helpers.canView(roles.GERENCIA)"
      :icon="icons.faCheck"
      color="success"
      class="me-2"
      tooltip="Confirmar"
      btn-class="btn-sm px-3 position-relative"
      outlined
      :disabled="isDisabled"
      :loading="loadingConfirmBtn"
      @click.prevent="assignPayment({confirmation: true })"
    >
      <span
        v-if="!canBeConfirmed"
        v-tippy
        content="O pagamento não pode ser confirmado"
        class="position-absolute top-0 start-100 translate-middle px-2 text-white bg-warning border border-light rounded-circle"
      >
        <FontAwesomeIcon
          :icon="icons.faExclamation"
          size="sm"
        />
      </span>
    </AppButton>
    <AppButton
      v-if="$helpers.canView(roles.GERENCIA)"
      :icon="icons.faTimes"
      color="danger"
      tooltip="Rejeitar"
      btn-class="btn-sm px-3"
      outlined
      :disabled="isDisabled"
      :loading="loadingDeclineBtn"
      @click.prevent="assignPayment({ confirmation: false })"
    />
    <AppButton
      :icon="icons.faEdit"
      outlined
      tooltip="Editar"
      btn-class="btn-sm px-3 ms-2"
      @click.prevent="onEditClick"
    />
  </div>
  <div
    v-else
    class="fw-bold"
  >
    <div
      v-if="confirmation === true"
      class="text-success"
    >
      <FontAwesomeIcon :icon="icons.faCheck" />
    </div>
    <div
      v-else-if="confirmation === null"
      class="text-warning"
    >
      <FontAwesomeIcon :icon="icons.faMinus" />
    </div>
    <div
      v-else-if="confirmation === false"
      class="text-danger"
    >
      <FontAwesomeIcon :icon="icons.faTimes" />
    </div>
  </div>
</template>
