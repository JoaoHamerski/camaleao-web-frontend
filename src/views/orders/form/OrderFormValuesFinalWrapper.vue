<script>
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons'
import { sumBy } from 'lodash-es'

import OrderFormValuesFinal from './OrderFormValuesFinal.vue'

const validIndividualItems = (item) => item.size_id
const validItems = (item) => item.size_id && item.quantity

const validGarment = (garment) => {
  if (!garment.match) {
    return false
  }

  return garment.individual_names
    ? garment.items_individual.some(validIndividualItems)
    : garment.items.some(validItems)
}

const getExtraSizeValues = (garment) => {
  const match = garment.match
  const sizes = match.sizes

  if (!garment.individual_names) {
    return garment.items.reduce((total, item) => {
      const size = sizes.find(size => size.id === item.size_id)

      return +(+(size?.pivot?.value || 0) * +item.quantity).toFixed(2) + +total
    }, 0)
  }

  return garment.items_individual.reduce((total, item) => {
    const size = sizes.find(size => size.id === item.size_id)

    return +(+(size?.pivot?.value || 0) + total).toFixed(2)
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

const getClothQuantity = (garment) => {
  if (garment.individual_names) {
    const items = garment.items_individual.filter(validIndividualItems)
    return items.length
  }

  const items = garment.items.filter(validItems)

  return sumBy(items, (item) => +item.quantity)
}

const getClothTotalValue = (garment) => {
  if (!validGarment(garment)) {
    return 0
  }

  const quantity = getClothQuantity(garment)
  const value = findValuePerUnit(garment.match, quantity)
  const extraSizeValues = getExtraSizeValues(garment)
  const totalCloth = (+quantity * +value).toFixed(2)
  const totalValue = (+totalCloth + +extraSizeValues).toFixed(2)

  return +totalValue
}

export default {
  components: {
    OrderFormValuesFinal
  },
  props: {
    form: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    icons: {
      faFileInvoiceDollar
    },
    totalGarmentsValue: ''
  }),
  computed: {
    finalValue () {
      const discount = this.$helpers.unformatCurrencyBRL(this.form.discount)
      const shippingValue = this.$helpers.unformatCurrencyBRL(this.form.shipping_value)
      const total = (+this.totalGarmentsValue + +shippingValue).toFixed(2)

      return this.$helpers.toBRL((+total - +discount).toFixed(2))
    },
    garments () {
      return this.form.garments
    }
  },
  watch: {
    form: {
      handler () {
        const result = this.garments.reduce((total, garment) => {
            const clothTotal = getClothTotalValue(garment)
            garment.total = clothTotal

            return (+clothTotal + +total).toFixed(2)
        }, 0)

        this.totalGarmentsValue = result
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
        :form="form"
      />
    </template>
  </AppContainer>
</template>
