<script>
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { formatCurrencyBRL, formatDatetime } from '@/utils/formatters'

export default {
  components: {
    PaymentForm:  () => import('./PaymentForm.vue')
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    payment: {
      type: Object,
      default: () => {}
    },
    order: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      formatCurrencyBRL,
      formatDatetime,
      icons: {
        faDollarSign
      }
    }
  },
  methods: {
    onSuccess () {
      this.$emit('success')
    }
  }
}
</script>

<template>
  <AppModal
    id="paymentModal"
    color="success"
    :value="value"
    centered
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faDollarSign"
        fixed-width
      />
      {{ isEdit ? 'Alterar pagamento' : 'Novo pagamento' }}
    </template>

    <template #body>
      <div
        v-if="payment"
        class="text-center my-3"
      >
        Pagamento de
        <b>{{ formatCurrencyBRL(payment.value) }}</b>
        em
        <b>{{ formatDatetime(payment.date) }}</b>
      </div>

      <PaymentForm
        v-if="value"
        :order="order"
        :is-edit="isEdit"
        :payment="payment"
        @success="onSuccess"
      />
    </template>
  </AppModal>
</template>
