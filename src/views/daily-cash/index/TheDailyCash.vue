<script>
import {
  faCashRegister
} from '@fortawesome/free-solid-svg-icons'
import { formatDatetime } from '@/utils/formatters'
import { DateTime } from 'luxon'
import { GetDailyCash, GetDailyCashPendencies } from '@/graphql/DailyCash.gql'

import DailyPaymentModal from '../partials/daily-cash-payment/DailyPaymentModal.vue'
import TheDailyCashHeader from './TheDailyCashHeader.vue'
import TheDailyCashBody from './TheDailyCashBody.vue'
import ModalExpensesNew from '@/views/expenses/index/modals/ModalExpensesNew.vue'
import DailyCashReminderFormModal from '../partials/daily-cash-reminder/DailyCashReminderFormModal.vue'

export default {
  metaInfo() {
    return {
      title: 'Caixa Diário'
    }
  },
  components: {
    TheDailyCashHeader,
    TheDailyCashBody,
    DailyPaymentModal,
    ModalExpensesNew,
    DailyCashReminderFormModal
  },
  apollo: {
    dailyCashPendencies: {
      query: GetDailyCashPendencies
    },
    dailyCash: {
      query: GetDailyCash,
      variables() {
        return { ...this.paymentsParams }
      }
    }
  },
  data() {
    return {
      dailyCashPendencies: [],
      dailyCash: {
        paginatorInfo: {},
        data: []
      },
      modalPayment: false,
      modalExpense: false,
      modalReminder: false,
      paymentsParams: {
        first: 100,
        created_at: DateTime.now().toISODate(),
        where: {},
        orderBy: [{ column: 'CREATED_AT', order: 'DESC' }]
      },
      icons: {
        faCashRegister
      }
    }
  },
  computed: {
    isLoading() {
      return !!this.$apollo.queries.dailyCash.loading
    }
  },
  methods: {
    formatDatetime,
    onLoadPendenciesFromDate(date) {
      this.paymentsParams.where = {
        column: 'IS_CONFIRMED',
        operator: 'IS_NULL'
      }

      this.paymentsParams.created_at = date
    },
    onReminderClick() {
      this.modalReminder = true
    },
    onReminderSuccess() {
      this.modalReminder = false
    },
    onNewEntryClick() {
      this.modalPayment = true
    },
    onNewExpenseClick() {
      this.modalExpense = true
    },
    onNewExpenseSuccess() {
      this.modalExpense = false
    },
    onPaymentSuccess() {
      this.modalPayment = false
    },
    resetPayments() {
      this.paymentsParams.where = {}
      this.paymentsParams.created_at = DateTime.now().toISODate()

      this.$apollo.queries.dailyCash.refetch()
      this.$apollo.queries.dailyCashPendencies.refetch()
    }
  }
}
</script>

<template>
  <div class="py-5">
    <TheDailyCashHeader
      class="mb-2"
      :pendencies="dailyCashPendencies"
      :active-date="formatDatetime(paymentsParams.created_at)"
      @reset-payments="resetPayments"
      @on-new-entry-click="onNewEntryClick"
      @on-new-expense-click="onNewExpenseClick"
      @load-pendencies-from-date="onLoadPendenciesFromDate"
      @on-reminder-click="onReminderClick"
    />

    <AppCard>
      <template #header>
        <h6 class="fw-bold mb-0">
          <FontAwesomeIcon
            :icon="icons.faCashRegister"
            fixed-width
          />
          Caixa Diário
        </h6>
      </template>

      <template #body>
        <AppLoading v-if="isLoading" />

        <DailyPaymentModal
          v-model="modalPayment"
          @on-payment-success="onPaymentSuccess"
        />

        <ModalExpensesNew
          v-model="modalExpense"
          @success="onNewExpenseSuccess"
        />

        <DailyCashReminderFormModal
          v-model="modalReminder"
          @success="onReminderSuccess"
          @dismiss="modalReminder = false"
        />

        <TheDailyCashBody
          :entries="dailyCash.data"
          :date="formatDatetime(paymentsParams.created_at, 'dd/MM/y')"
        />
      </template>
    </AppCard>
  </div>
</template>
