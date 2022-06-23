<script>
import {
  faTimes,
  faCheck
} from '@fortawesome/free-solid-svg-icons'

import { GetOrder } from '@/graphql/Order.gql'
import { GetCashFlowEntries, GetCashFlowBalance } from '@/graphql/CashFlow.gql'
import {
  GetDailyCash,
  GetDailyCashBalance,
  GetDailyCashDetailedFlow
} from '@/graphql/DailyCash.gql'
import { AssignPaymentConfirmation } from '@/graphql/Payment.gql'

import {
  AssignExpenseConfirmation,
  GetProductTypeExpensesByMonth
} from '@/graphql/Expense.gql'

const CONFIRMATION = {
  ACCEPT: true,
  REJECT: false
}

export default {
  props: {
    isExpense: {
      type: Boolean,
      required: true
    },
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
          refetchQueries: [
            GetOrder,
            GetDailyCash,
            GetDailyCashBalance,
            GetCashFlowEntries,
            GetCashFlowBalance,
            GetDailyCashDetailedFlow,
          ],
          awaitRefetchQueries: true
        })

        this.$helpers.clearCacheFrom({fieldName: 'payments'})

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
          refetchQueries: [
            GetDailyCash,
            GetDailyCashBalance,
            GetCashFlowEntries,
            GetCashFlowBalance,
            GetProductTypeExpensesByMonth,
            GetDailyCashDetailedFlow
          ],
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

      if (this.isExpense) {
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
      :icon="icons.faTimes"
      class="ms-2"
      color="danger"
      btn-class="btn-sm px-3"
      tooltip="Rejeitar"
      outlined
      @click.prevent="assignConfirmation(CONFIRMATION.REJECT)"
    />
  </div>
</template>
