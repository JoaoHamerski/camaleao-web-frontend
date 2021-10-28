<script>
import accounting from 'accounting-js'
import { formatCurrencyBRL } from '@/utils/formatters'
import { maskCurrencyBRL, maskInteger } from '@/utils/masks'

import OrderFormValuesFinal from './OrderFormValuesFinal'

export default {
  components: {
    OrderFormValuesFinal
  },
  chimera: {
    _clothingTypes () {
      return {
        url: '/api/clothing-types?hidden=false',
        on: {
          success ({ data }) {
            const clothingTypes = data.data

            this.$emit('clothing-types-loaded', clothingTypes)
          }
        }
      }
    }
  },
  props: {
    form: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      maskCurrencyBRL: maskCurrencyBRL({ numeralPositiveOnly: true }),
      maskInteger: maskInteger()
    }
  },
  computed: {
    clothingTypes () {
      return this.$chimera._clothingTypes?.data?.data || []
    },
    totalQuantity () {
      return this.clothingTypes.reduce((total, type) => {
        const value = accounting.unformat(this.form[`value_${type.key}`], ',')

        if (value > 0) {
          total += +this.form[`quantity_${type.key}`]
        }

        return total
      }, 0)
    },
    totalValue () {
      const total = this.clothingTypes.reduce((total, type) => {
        const quantity = this.form[`quantity_${type.key}`]

        if (quantity > 0) {
          total += accounting.unformat(this.evaluateTotalType(type.key), ',')
        }

        return total
      }, 0)

      return formatCurrencyBRL(total)
    },
    finalValue () {
      const sanitizedTotalValue = accounting.unformat(this.totalValue, ',')
      const sanitizedDiscount = accounting.unformat(this.form.discount, ',')

      const finalValue = accounting.toFixed(
        sanitizedTotalValue - sanitizedDiscount,
        2
      )

      return formatCurrencyBRL(finalValue)
    }
  },
  methods: {
    isValidType (key) {
      const sanitizedValue = accounting.unformat(this.form[`value_${key}`], ',')

      return this.form[`quantity_${key}`] > 0 && sanitizedValue > 0
    },
    evaluateTotalType (key) {
      const value = accounting.unformat(this.form[`value_${key}`], ',')
      const quantity = this.form[`quantity_${key}`]
      const result = accounting.toFixed(quantity * value, 2)

      return formatCurrencyBRL(result)
    }
  }
}
</script>

<template>
  <div class="mt-3">
    <h5 class="fw-bold text-secondary">
      Valores
    </h5>
    <h6 class="text-secondary">
      Tipos de roupas
    </h6>

    <div>
      <div class="row mb-3 text-secondary">
        <div class="col" />
        <div class="col text-center fw-bold">
          QUANTIDADE
        </div>
        <div class="col text-center fw-bold">
          VALOR UNIT.
        </div>
        <div class="col text-center fw-bold">
          TOTAL
        </div>
      </div>

      <div
        v-for="type in clothingTypes"
        :key="type.key"
        class="row"
      >
        <div
          class="col text-subtitle fw-bold"
          :class="isValidType(type.key) && 'text-success'"
        >
          {{ type.name }}
        </div>

        <div class="col">
          <AppInput
            v-model="form[`quantity_${type.key}`]"
            :name="'quantity_' + type.key"
          />
        </div>

        <div class="col">
          <AppInput
            v-model="form[`value_${type.key}`]"
            :mask="maskCurrencyBRL"
            :name="'value_' + type.key"
          />
        </div>

        <div class="col">
          <AppInput
            :value="evaluateTotalType(type.key)"
            :name="'total_' + type.key"
            disabled
          />
        </div>
      </div>
      <div class="row">
        <div class="col fw-bold text-subtitle">
          TOTAL
        </div>
        <div class="col">
          <AppInput
            input-class="fw-bold"
            :value="totalQuantity"
            name="total_quantity"
            disabled
          />
        </div>
        <div class="col">
          <hr>
        </div>
        <div class="col">
          <AppInput
            input-class="fw-bold"
            :value="totalValue"
            name="total_value"
            disabled
          />
        </div>
      </div>
    </div>

    <small class="text-secondary">O valor só é estimado quando a <b>QUANTIDADE</b> e <b>VALOR UNIT.</b> de um linha é preenchido.</small>

    <OrderFormValuesFinal
      :form="form"
      :final-value="finalValue"
    />
  </div>
</template>
