<script>
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons'
// import { sumBy } from 'lodash-es'
import { unformatCurrencyBRL } from '@/utils/helpers'
import OrderFormValuesFinal from './OrderFormValuesFinal.vue'

const validProduct = (product) => {
  return product.quantity && unformatCurrencyBRL(product.value)
}

const getProductValue = (product) => {
  if (!validProduct(product)) {
    return 0
  }

  return (product.quantity * unformatCurrencyBRL(product.value)).toFixed(2)
}

export default {
  components: {
    OrderFormValuesFinal
  },
  props: {
    form: {
      type: Object,
      required: true
    },
    client: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    icons: {
      faFileInvoiceDollar
    },
    totalProductsValue: ''
  }),
  computed: {
    finalValue () {
      const discount = this.$helpers.unformatCurrencyBRL(this.form.discount)
      const shippingValue = this.$helpers.unformatCurrencyBRL(this.form.shipping_value)
      const total = (+this.totalProductsValue + +shippingValue).toFixed(2)

      return this.$helpers.toBRL((+total - +discount).toFixed(2))
    },
    products () {
      return this.form.product_items
    }
  },
  watch: {
    form: {
      handler () {
        const result = this.products.reduce((total, product) => {
          return (+total + +getProductValue(product)).toFixed(2)
        }, 0)

        this.totalProductsValue = result
      },
      deep: true
    }
  }
}
</script>

<template>
  <AppContainer>
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faFileInvoiceDollar"
        fixed-width
      />
      Valores finais
    </template>

    <template #body>
      <OrderFormValuesFinal
        :client="client"
        :final-value="finalValue"
        :form="form"
      />
    </template>
  </AppContainer>
</template>
