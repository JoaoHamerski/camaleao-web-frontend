<script>
import {
  faCashRegister
} from '@fortawesome/free-solid-svg-icons'
import { formatDatetime } from '@/utils/formatters'
import { DateTime } from 'luxon'
import { payments, paymentsPendencies } from '@/graphql/Payment.gql'

import DailyPaymentModal from './partials/DailyPaymentModal'
import TheDailyCashHeader from './partials/TheDailyCashHeader'
import TheDailyCashBody from './partials/TheDailyCashBody'

export default {
  metaInfo () {
    return {
      title: 'Caixa Diário'
    }
  },
  components: {
    TheDailyCashHeader,
    TheDailyCashBody,
    DailyPaymentModal
  },
  apollo: {
    payments: {
      query: payments,
      variables () {
        return {
          created_at: this.date,
          pendencies: this.pendencies
        }
      },
      deep: true
    },
    paymentsPendencies: {
      query: paymentsPendencies
    }
  },
  data () {
    return {
      pendencies: false,
      date: DateTime.now().toISODate(),
      payments: [],
      paymentModal: false,
      paymentsPendencies: [],
      icons: {
        faCashRegister
      }
    }
  },
  computed: {
    isLoading () {
      return !!this.$apollo.queries.payments.loading
    }
  },
  methods: {
    formatDatetime,
    async onLoadPendenciesFromDate (date) {
      this.pendencies = true
      this.date = date
    },
    onNewEntryClick () {
      this.paymentModal = true
    },
    onPaymentSuccess () {
      this.paymentModal = false
      this.refreshPayments()
    },
    onDailyPaymentSuccess () {
      this.refreshPayments()
      this.refreshPendencies()
    },
    refreshPendencies () {
      this.$apollo.queries.paymentsPendencies.refetch()
    },
    refreshPayments () {
      this.$apollo.queries.payments.refetch()
    },
    resetPayments () {
      this.date = DateTime.now().toISODate()
      this.pendencies = false
      this.refreshPayments()
    }
  }
}
</script>

<template>
  <div>
    <TheDailyCashHeader
      class="mt-5 mb-2"
      :pendencies="paymentsPendencies"
      :active-date="formatDatetime(date)"
      @on-new-entry-click="onNewEntryClick"
      @load-pendencies-from-date="onLoadPendenciesFromDate"
      @reset-payments="resetPayments"
    />

    <AppCard
      color="success"
    >
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
          v-model="paymentModal"
          @success="onPaymentSuccess"
        />
        <TheDailyCashBody
          :payments="payments"
          :date="formatDatetime(date, 'dd/MM/y')"
          @daily-payment-success="onDailyPaymentSuccess"
        />
      </template>
    </AppCard>
  </div>
</template>
