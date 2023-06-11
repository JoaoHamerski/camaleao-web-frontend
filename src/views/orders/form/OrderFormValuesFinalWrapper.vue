<script>
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons'
import { sumBy } from 'lodash-es'
import { form } from './OrderForm.vue'

import OrderFormValuesFinal from './OrderFormValuesFinal.vue'

const validIndividualItems = (item) => item.size_id
const validItems = (item) => item.size_id && item.quantity

const validCloth = (cloth) => {
  if (!cloth.match) {
    return false
  }

  return cloth.individual_names
    ? cloth.items_individual.some(validIndividualItems)
    : cloth.items.some(validItems)
}

const getExtraSizeValues = (cloth) => {
  const match = cloth.match
  const sizes = match.sizes

  if (!cloth.individual_names) {
    return cloth.items.reduce((total, item) => {
      const size = sizes.find(size => size.id === item.size_id)

      return +(+(size?.pivot?.value || 0) * +item.quantity).toFixed(2) + +total
    }, 0)
  }

  return cloth.items_individual.reduce((total, item) => {
    const size = sizes.find(size => size.id === item.size_id)

    return (size.pivot.value + total).toFixed(2)
  }, 0)
}

const findValuePerUnit = (match, quantity) => {
  const values = match.values
  const value = values.find(
    value => (+value.start <= quantity && +value.end >= quantity)
      || !value.end
  )

  return +value.value
}

const getClothQuantity = (cloth) => {
  if (cloth.individual_names) {
    const items = cloth.items_individual.filter(validIndividualItems)
    return items.length
  }

  const items = cloth.items.filter(validItems)

  return sumBy(items, (item) => +item.quantity)
}

const getClothTotalValue = (cloth) => {
  if (!validCloth(cloth)) {
    return 0
  }

  const quantity = getClothQuantity(cloth)
  const value = findValuePerUnit(cloth.match, quantity)
  const extraSizeValues = getExtraSizeValues(cloth)
  const totalCloth = (+quantity * +value).toFixed(2)
  const totalValue = (+totalCloth + +extraSizeValues).toFixed(2)

  return +totalValue
}

export default {
  components: {
    OrderFormValuesFinal
  },
  data: () => ({
    form,
    icons: {
      faFileInvoiceDollar
    },
    totalClothesValue: ''
  }),
  computed: {
    finalValue () {
      const discount = this.$helpers.unformatCurrencyBRL(this.form.discount)
      const shippingValue = this.$helpers.unformatCurrencyBRL(this.form.shipping_value)
      const total = (+this.totalClothesValue + +shippingValue).toFixed(2)

      return this.$helpers.toBRL((+total - +discount).toFixed(2))
    },
    clothes () {
      return this.form.clothes
    }
  },
  watch: {
    form: {
      handler () {
        const result = this.clothes.reduce((total, cloth) => {
            const clothTotal = getClothTotalValue(cloth)
            cloth.total = clothTotal

            return (+clothTotal + +total).toFixed(2)
        }, 0)

        this.totalClothesValue = result
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
        :final-value="finalValue"
      />
    </template>
  </AppContainer>
</template>
