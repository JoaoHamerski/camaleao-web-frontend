<script>
import {
  faCashRegister
} from '@fortawesome/free-solid-svg-icons'
import { formatDatetime } from '@/utils/formatters'
import { DateTime } from 'luxon'
import { GetPayments, GetPaymentsPendencies } from '@/graphql/Payment.gql'

import DailyPaymentModal from './partials/DailyPaymentModal'
import TheDailyCashHeader from './TheDailyCashHeader'
import TheDailyCashBody from './TheDailyCashBody'

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
      query: GetPayments,
      variables () {
        return { ...this.paymentsParams }
      }
    },
    paymentsPendencies: {
      query: GetPaymentsPendencies
    }
  },
  data () {
    return {
      payments: [],
      paymentsPendencies: [],
      modalPayment: false,
      paymentsParams: {
        created_at: DateTime.now().toISODate(),
        pendencies: false
      },
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
    onLoadPendenciesFromDate (date) {
      this.paymentsParams.pendencies = true
      this.paymentsParams.created_at = date
    },
    onNewEntryClick () {
      this.modalPayment = true
    },
    onPaymentSuccess () {
      this.modalPayment = false
    },
    resetPayments () {
      this.paymentsParams.pendencies = false
      this.paymentsParams.created_at = DateTime.now().toISODate()

      this.$apollo.queries.payments.refetch()
      this.$apollo.queries.paymentsPendencies.refetch()
    }
  }
}
</script>

<template>
  <div class="py-5">
    <TheDailyCashHeader
      class="mb-2"
      :pendencies="paymentsPendencies"
      :active-date="formatDatetime(paymentsParams.created_at)"
      @reset-payments="resetPayments"
      @on-new-entry-click="onNewEntryClick"
      @load-pendencies-from-date="onLoadPendenciesFromDate"
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

        <TheDailyCashBody
          :payments="payments"
          :date="formatDatetime(paymentsParams.created_at, 'dd/MM/y')"
        />
      </template>
    </AppCard>
  </div>
</template>
