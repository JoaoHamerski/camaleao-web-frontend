<script>
import {
  faTimes,
  faCheck
} from '@fortawesome/free-solid-svg-icons'

import { GetDailyCash, GetDailyCashBalance } from '@/graphql/DailyCash.gql'
import { AssignPaymentConfirmation } from '@/graphql/Payment.gql'
import { AssignExpenseConfirmation } from '@/graphql/Expense.gql'

const CONFIRMATION = {
  ACCEPT: true,
  REJECT: false
}

export default {
  props: {
    entry: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isLoading: '',
      CONFIRMATION,
      icons: {
        faTimes,
        faCheck
      }
    }
  },
  methods: {
    async assignPaymentConfirmation (confirmation) {
      try {
        await this.$apollo.mutate({
          mutation: AssignPaymentConfirmation,
          variables: {
            id: this.entry.id,
            confirmation
          },
          refetchQueries: [GetDailyCash, GetDailyCashBalance],
          awaitRefetchQueries: true
        })

        this.$toast.success(
          confirmation
            ? 'Pagamento confirmado!'
            : 'Pagamento rejeitado!'
        )
      } catch (error) {
        this.$toast.error('Ops! Algo deu errado.')
      }
    },
    async assignExpenseConfirmation (confirmation) {
      try {
        await this.$apollo.mutate({
          mutation: AssignExpenseConfirmation,
          variables: {
            id: this.entry.id,
            confirmation
          },
          refetchQueries: [GetDailyCash, GetDailyCashBalance],
          awaitRefetchQueries: true
        })

        this.$toast.success(
          confirmation
            ? 'Despesa confirmada!'
            : 'Despesa rejeitada!'
        )
      } catch (error) {
        this.$toast.error('Ops! Algo deu errado.')
      }
    },
    async assignConfirmation (confirmation) {
      this.isLoading = confirmation

      if (this.entry.is_expense) {
        await this.assignExpenseConfirmation(confirmation)
      } else {
        await this.assignPaymentConfirmation(confirmation)
      }

      this.isLoading = ''
    }
  }
}
</script>
<template>
  <div>
    <AppButton
      :loading="isLoading === CONFIRMATION.ACCEPT"
      :disabled="isLoading === CONFIRMATION.REJECT"
      :icon="icons.faCheck"
      color="success"
      btn-class="btn-sm px-3"
      tooltip="Confirmar"
      outlined
      @click.prevent="assignConfirmation(CONFIRMATION.ACCEPT)"
    />
    <AppButton
      :loading="isLoading === CONFIRMATION.REJECT"
      :disabled="isLoading === CONFIRMATION.ACCEPT"
      class="mx-0 my-2 my-sm-0 mx-sm-2"
      :icon="icons.faTimes"
      color="danger"
      btn-class="btn-sm px-3"
      tooltip="Rejeitar"
      outlined
      @click.prevent="assignConfirmation(CONFIRMATION.REJECT)"
    />
  </div>
</template>
