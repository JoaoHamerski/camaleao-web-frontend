<script>
import roles from '@/constants/roles'
import {
  faCheck,
  faExclamation,
  faTimes,
  faEdit
} from '@fortawesome/free-solid-svg-icons'

import { AssignPaymentConfirmation } from '@/graphql/Payment.gql'

export default {
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
      icons: {
        faCheck,
        faExclamation,
        faTimes,
        faEdit
      }
    }
  },
  computed: {
    isButtonsDisabled () {
      return this.loadingConfirmBtn || this.loadingDeclineBtn
    },
    canPaymentBeConfirmed () {
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
          mutation: AssignPaymentConfirmation,
          variables: {
            id: this.payment.id,
            confirmation
          }
        })

        this.$helpers.clearCacheFrom({ field: 'orders' })

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
  <div class="d-flex justify-content-center text-center position-relative">
    <template v-if="confirmation === null">
      <div>
        <AppButton
          v-if="$helpers.canView(roles.GERENCIA)"
          :icon="icons.faCheck"
          color="success"
          tooltip="Confirmar"
          btn-class="btn-sm px-3 position-relative"
          outlined
          :disabled="isButtonsDisabled"
          :loading="loadingConfirmBtn"
          @click.prevent="assignPayment({confirmation: true })"
        >
          <span
            v-if="!canPaymentBeConfirmed"
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
      </div>
      <div>
        <AppButton
          v-if="$helpers.canView(roles.GERENCIA)"
          :icon="icons.faTimes"
          class="mx-2"
          color="danger"
          tooltip="Rejeitar"
          btn-class="btn-sm px-3"
          outlined
          :disabled="isButtonsDisabled"
          :loading="loadingDeclineBtn"
          @click.prevent="assignPayment({ confirmation: false })"
        />
      </div>
    </template>

    <div>
      <AppButton
        v-if="confirmation === null || confirmation === true && $helpers.canView(roles.GERENCIA)"
        :icon="icons.faEdit"
        outlined
        tooltip="Editar"
        btn-class="btn-sm px-3"
        @click.prevent="onEditClick"
      />
    </div>
  </div>
</template>
