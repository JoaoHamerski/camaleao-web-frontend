<script>
import { formatDatetime } from '@/utils/formatters'

export default {
  props: {
    balance: {
      type: Object,
      required: true
    }
  },
  computed: {
    originalPaymentValue () {
      const balance = this.balance.payment.clientBalances.find(balance => balance.value > 0)

      if (balance) {
        return this.balance.payment.value + balance.value
      }

      return this.balance.payment.value
    },
    getOrderUrl () {
      return this.$helpers.getUrl('orders.show', {
        client: this.balance.payment.order.client.id,
        order: this.balance.payment.order.id
      })
    },
    getListGroupColor () {
      if (this.balance.value > 0) {
        return 'list-group-item-success'
      }

      return 'list-group-item-danger'
    }
  },
  methods: {
    formatDatetime
  }
}
</script>

<template>
  <li
    class="list-group list-group-item"
    :class="getListGroupColor"
  >
    <div class="d-flex justify-content-between">
      <span class="fw-bold">{{ $helpers.toBRL(balance.value, false, balance.value > 0) }}</span>
      <span class="small text-secondary">{{ formatDatetime(balance.created_at) }}</span>
    </div>
    <div class="small text-secondary">
      Pagamento de
      <span class="fw-bold">
        {{ $helpers.toBRL(balance.payment.value) }}
      </span>
      no pedido <a
        class="fw-bold text-decoration-none"
        target="_blank"
        :href="getOrderUrl"
      >{{ balance.payment.order.code }}</a>
    </div>

    <div
      v-if="balance.payment.value !== originalPaymentValue"
      class="text-secondary small"
    >
      ({{ $helpers.toBRL(originalPaymentValue) }} restou {{ $helpers.toBRL(balance.value) }})
    </div>
  </li>
</template>
