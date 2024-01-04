<script>
import OrderBodyTotalValueItem from './OrderBodyTotalValueItem.vue'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'

export default {
  components: {
    OrderBodyTotalValueItem
  },
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    icons: {
      faDollarSign
    }
  }),
  computed: {
    totalValue () {
      return this.$helpers.toBRL(this.order.price, true)
    },
    totalProducts () {
      return this.order.original_price - (this.order.shipping_value || 0)
    },
    showTotalClothes () {
      return this.order.discount || this.order.shipping_value
    },
    totalValueSubItems () {
      const totalProducts = this.totalProducts
      const shippingValue = this.order.shipping_value
      const discount = this.order.discount

      return [
        {
          label: 'TOTAL PRODUTOS: ',
          text: this.$helpers.toBRL(totalProducts),
          is_shown: !!this.showTotalClothes,
          class: 'text-primary'
        },
        {
          label: 'FRETE: ',
          text: this.$helpers.toBRL(shippingValue, false, true),
          is_shown: !!shippingValue
        },
        {
          label: 'DESCONTO: ',
          text: this.$helpers.toBRL(-discount),
          is_shown: !!discount
        },
      ]
    },
    totalPaidSubItems () {
      return [
        {
          label: 'PATROCÍNIO',
          text: this.$helpers.toBRL(this.order.total_paid_sponsor),
          is_shown: this.order.has_sponsor
        },
        {
          label: 'CLIENTE',
          text: this.$helpers.toBRL(this.order.total_paid_non_sponsor),
          is_shown: this.order.has_sponsor
        }
      ]
    }
  }
}
</script>

<template>
  <AppContainer
    v-if="order.price !== null"
    class="mt-3"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faDollarSign"
        fixed-width
      />
      Valor total
    </template>

    <template #body>
      <div class="my-3 d-flex flex-column flex-sm-row justify-content-around">
        <OrderBodyTotalValueItem
          label="Valor total"
          :text="totalValue"
          :subitems="totalValueSubItems"
        />

        <OrderBodyTotalValueItem
          label="Total pago"
          :text="$helpers.toBRL(order.total_paid, true)"
          color="success"
          :subitems="totalPaidSubItems"
        />
        <OrderBodyTotalValueItem
          label="Falta pagar"
          :text="$helpers.toBRL(order.total_owing, true)"
          :color="order.total_owing <= 0 ? 'success' : 'danger'"
        />
      </div>
    </template>
  </AppContainer>
</template>
