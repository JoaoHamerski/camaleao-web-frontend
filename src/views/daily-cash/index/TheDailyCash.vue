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
        return {
          created_at: this.date,
          pendencies: this.pendencies
        }
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
      pendencies: false,
      date: DateTime.now().toISODate(),
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
      this.pendencies = true
      this.date = date
    },
    onNewEntryClick () {
      this.modalPayment = true
    },
    onPaymentSuccess () {
      this.modalPayment = false
    },
    resetPayments () {
      this.date = DateTime.now().toISODate()
      this.pendencies = false
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

        <DailyPaymentModal v-model="modalPayment" />

        <TheDailyCashBody
          :payments="payments"
          :date="formatDatetime(date, 'dd/MM/y')"
        />
      </template>
    </AppCard>
  </div>
</template>
