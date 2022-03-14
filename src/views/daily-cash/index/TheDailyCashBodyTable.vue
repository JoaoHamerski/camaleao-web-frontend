<script>
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons'
import { clients, orders } from '@/constants/route-names'
import { formatCurrencyBRL } from '@/utils/formatters'
import DailyPaymentConfirmation from './partials/DailyPaymentConfirmation'

const PAYMENT_STATUS_CLASS = {
  true: 'table-success',
  false: 'table-danger',
  null: 'table-warning'
}

export default {
  components: {
    DailyPaymentConfirmation
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      clients,
      orders,
      icons: {
        faClipboardCheck
      }
    }
  },
  computed: {
    headers () {
      return [
        { text: 'PEDIDO', value: 'order' },
        { text: 'CLIENTE', value: 'client' },
        { text: 'VALOR', value: 'value', format: 'currencyBRL' },
        { text: 'VIA', value: 'via' },
        { text: 'REGISTRO ÀS', value: 'created_at', format: 'datetime', formatting: 'HH:mm', align: 'center' },
        { text: 'CHECKED', value: 'checked', align: 'center' }
      ]
    }
  },
  methods: {
    formatCurrencyBRL,
    paymentRowClass (payment) {
      return PAYMENT_STATUS_CLASS[payment.is_confirmed]
    },
    onPaymentSuccess () {
      this.$emit('payment-success')
    },
    onPaymentError (payment) {
      this.$emit('payment-error', payment)
    }
  }
}
</script>
<template>
  <AppTable
    :headers="headers"
    :items="items"
    :row-class="paymentRowClass"
  >
    <template #[`items.order`]="{ item }">
      <a
        :href="$helpers.getUrl(
          orders.show,
          {client: item.order.id, order: item.order.client.id}
        )"
        target="_blank"
        class="text-decoration-none fw-bold"
      >{{ item.order.code }}</a>
    </template>

    <template #[`items.client`]="{ item }">
      <a
        :href="''"
        target="_blank"
        class="text-decoration-none fw-bold"
      >{{ item.order.client.name }}</a>
    </template>

    <template #[`items.value`]="{ item }">
      <span class="fw-bold">{{ formatCurrencyBRL(item.value) }}</span>
    </template>

    <template #[`items.via`]="{ item }">
      {{ item.via.name }}
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
        @success="onPaymentSuccess"
        @error="onPaymentError"
      />
    </template>
  </AppTable>
</template>
