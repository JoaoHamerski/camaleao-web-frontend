<script>
import {
  faCashRegister
} from '@fortawesome/free-solid-svg-icons'
import { formatDatetime } from '@/utils/formatters'
import { DateTime } from 'luxon'

import DailyPaymentModal from './partials/DailyPaymentModal'
import TheDailyCashHeader from './partials/TheDailyCashHeader'
import TheDailyCashBody from './partials/TheDailyCashBody'

export default {
  chimera: {
    _payments () {
      return {
        method: 'GET',
        url: 'api/daily-cash/payments-of-day',
        params: {
          date: DateTime.now().toFormat('dd/MM/y'),
          client: true,
          order: true
        }
      }
    },
    _pendencies () {
      return {
        method: 'GET',
        url: 'api/daily-cash/pendencies'
      }
    }
  },
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
  data () {
    return {
      date: DateTime.now().toFormat('dd/MM/y'),
      paymentModal: false,
      icons: {
        faCashRegister
      }
    }
  },
  computed: {
    payments () {
      return this.$chimera._payments?.data?.data || []
    },
    pendencies () {
      return this.$chimera._pendencies?.data?.data || []
    },
    isLoading () {
      return this.$chimera._payments.loading
    }
  },
  methods: {
    async onLoadPendenciesFromDate (date) {
      const formattedDate = formatDatetime(date)

      await this.$chimera._payments.fetch(true, {
        params: {
          date: formattedDate,
          only_pendency: true
        }
      })

      this.date = formattedDate
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
      this.$chimera._pendencies.reload()
    },
    refreshPayments () {
      this.$chimera._payments.reload()
    },
    async resetPayments () {
      const formattedDate = DateTime.now().toFormat('dd/MM/y')

      await this.$chimera._payments.fetch(true, {
        params: {
          date: formattedDate,
          only_pendency: false
        }
      })

      this.date = formattedDate
    }
  }
}
</script>

<template>
  <AppCard
    color="success"
    class="mt-5"
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

      <TheDailyCashHeader
        :pendencies="pendencies"
        :active-date="date"
        @on-new-entry-click="onNewEntryClick"
        @load-pendencies-from-date="onLoadPendenciesFromDate"
        @reset-payments="resetPayments"
      />

      <TheDailyCashBody
        :payments="payments"
        :date="date"
        @daily-payment-success="onDailyPaymentSuccess"
      />
    </template>
  </AppCard>
</template>
