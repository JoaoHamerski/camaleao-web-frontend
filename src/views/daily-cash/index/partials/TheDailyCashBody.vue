<script>
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons'
import { formatCurrencyBRL } from '@/utils/formatters'
import { DateTime } from 'luxon'

import DailyPaymentConfirmation from './DailyPaymentConfirmation'
import DailyPaymentConfirmationErrorModal from './DailyPaymentConfirmationErrorModal'

export default {
  components: {
    DailyPaymentConfirmation,
    DailyPaymentConfirmationErrorModal
  },
  props: {
    payments: {
      type: Array,
      default: () => []
    },
    date: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      DateTime,
      error: {
        modal: false,
        payment: ({})
      },
      icons: {
        faClipboardCheck
      }
    }
  },
  computed: {
    isSelectedDateToday () {
      const now = DateTime.now()
      const selectedDate = DateTime.fromFormat(this.date, 'dd/MM/y')

      return now.hasSame(selectedDate, 'day')
    },
    selectedDateExtended () {
      return DateTime.fromFormat(
        this.date, 'dd/MM/y',
        { locale: 'pt-br' }
      ).toFormat('dd \'de\' LLLL \'de\' yyyy')
    },
    headers () {
      return [
        { text: 'PEDIDO', value: 'order' },
        { text: 'CLIENTE', value: 'client' },
        { text: 'VALOR', value: 'value', format: 'currencyBRL' },
        { text: 'VIA', value: 'via' },
        { text: 'HORÁRIO', value: 'created_at', format: 'datetime', formatting: 'HH:mm', align: 'center' },
        { text: 'CHECKED', value: 'checked', align: 'center' }
      ]
    }
  },
  methods: {
    formatCurrencyBRL,
    orderUrl (clientKey, orderKey) {
      const resolvedRoute = this.$router.resolve({
        name: 'orders.show',
        params: {
          clientKey,
          orderKey
        }
      })

      return resolvedRoute.href
    },
    clientUrl (clientKey) {
      const resolvedRoute = this.$router.resolve({
        name: 'clients.show',
        params: {
          clientKey
        }
      })

      return resolvedRoute.href
    },
    paymentRowClass (payment) {
      const PAYMENT_STATUS = {
        1: 'table-success',
        0: 'table-danger',
        null: 'table-warning'
      }

      return PAYMENT_STATUS[payment.is_confirmed]
    },
    onDailyPaymentSuccess () {
      this.$emit('daily-payment-success')
    },
    onDailyPaymentError (payment) {
      this.error.modal = true
      this.error.payment = payment
    }
  }
}
</script>

<template>
  <div>
    <h5 class="horizontal-line text-center fw-bold mt-3">
      <span
        v-tippy
        :content="selectedDateExtended"
      >{{ DateTime.fromFormat(date, 'dd/MM/y').toFormat('dd/MM') }}</span>
    </h5>

    <div
      class="small text-secondary text-center"
    >
      <span v-if="isSelectedDateToday">Pagamentos de hoje</span>
      <span v-else>Pagamentos antigos</span>
    </div>

    <hr class="bg-secondary">

    <DailyPaymentConfirmationErrorModal
      v-model="error.modal"
      :payment="error.payment"
    />

    <AppTable
      :headers="headers"
      :items="payments"
      :row-class="paymentRowClass"
    >
      <template #[`items.order`]="{ item }">
        <a
          :href="orderUrl(item.order.client.id, item.order.code)"
          target="_blank"
          class="text-decoration-none fw-bold"
        >{{ item.order.code }}</a>
      </template>

      <template #[`items.client`]="{ item }">
        <a
          :href="clientUrl(item.order.client.id)"
          target="_blank"
          class="text-decoration-none fw-bold"
        >{{ item.order.client.name }}</a>
      </template>

      <template #[`items.value`]="{ item }">
        <span class="fw-bold">{{ formatCurrencyBRL(item.value) }}</span>
      </template>

      <template #[`items.via`]="{ item }">
        {{ item.payment_via.name }}
      </template>

      <template #[`headers.checked`]>
        <FontAwesomeIcon
          :icon="icons.faClipboardCheck"
          size="lg"
        />
      </template>

      <template #[`items.checked`]="{ item }">
        <DailyPaymentConfirmation
          :confirmation="item.is_confirmed"
          :payment="item"
          @success="onDailyPaymentSuccess"
          @payment-error="onDailyPaymentError"
        />
      </template>
    </AppTable>
  </div>
</template>
