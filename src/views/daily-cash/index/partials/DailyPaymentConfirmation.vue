<script>
import roles from '@/constants/roles'
import { paymentConfirm } from '@/graphql/Payment.gql'

import {
  faCheck,
  faTimes,
  faMinus,
  faExclamation
} from '@fortawesome/free-solid-svg-icons'

export default {
  chimera: {
    _assignPayment () {
      return {
        method: 'POST',
        url: `/api/payments/${this.payment.id}/confirm`,
        auto: false,
        on: {
          success () {
            this.$emit('success')
          },
          error () {
            this.$emit('payment-error', this.payment)
          }
        }
      }
    }
  },
  props: {
    payment: {
      type: Object,
      required: true
    },
    confirmation: {
      type: undefined,
      required: true
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
        faExclamation
      }
    }
  },
  computed: {
    isDisabled () {
      return this.loadingConfirmBtn || this.loadingDeclineBtn
    },
    showConfirmationButtons () {
      return +this.authUser.role.id === +roles.GERENCIA
      && this.confirmation === null
    },
    authUser () {
      return this.$store.getters['auth/authUser']
    }
  },
  methods: {
    canBeConfirmed (payment) {
      return payment.value <= payment.order.total_owing
    },
    async assignPayment ({ confirmation }) {
      this.loadingConfirmBtn = confirmation
      this.loadingDeclineBtn = !confirmation

      try {
        await this.$apollo.mutate({
          mutation: paymentConfirm,
          variables: {
            id: this.payment.id,
            confirmation
          }
        })

        this.$toast.success(
          confirmation
            ? 'Pagamento confirmado!'
            : 'Pagamento rejeitado!'
        )

        this.$emit('success')
      } catch (error) {
        this.$emit('payment-error', this.payment)
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
      :icon="icons.faCheck"
      color="success"
      class="me-4"
      tooltip="Confirmar"
      btn-class="btn-sm px-3 position-relative"
      outlined
      :disabled="isDisabled"
      :loading="loadingConfirmBtn"
      @click.prevent="assignPayment({confirmation: true })"
    >
      <span
        v-if="!canBeConfirmed(payment)"
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
      :icon="icons.faTimes"
      color="danger"
      tooltip="Rejeitar"
      btn-class="btn-sm px-3"
      outlined
      :disabled="isDisabled"
      :loading="loadingDeclineBtn"
      @click.prevent="assignPayment({ confirmation: false })"
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
