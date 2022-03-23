<script>
import accounting from 'accounting-js'
import { isEmpty } from 'lodash-es'
import { formatCurrencyBRL } from '@/utils/formatters'
import { maskCurrencyBRL, maskInteger } from '@/utils/masks'
import { GetClothingTypes } from '@/graphql/ClothingType.gql'

import OrderFormValuesFinal from './OrderFormValuesFinal'

export default {
  components: {
    OrderFormValuesFinal
  },
  props: {
    form: {
      type: Object,
      required: true
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    order: {
      type: Object,
      default: () => ({})
    },
    isOrderPreRegistered: {
      type: Boolean,
      default: false
    }
  },
  apollo: {
    clothingTypes: {
      query: GetClothingTypes,
      variables: {
        is_hidden: false
      },
      result ({ data }) {
        this.$emit('clothing-types-loaded', data.clothingTypes)
      }
    }
  },
  data () {
    return {
      clothingTypes: [],
      maskCurrencyBRL: maskCurrencyBRL({ numeralPositiveOnly: true }),
      maskInteger: maskInteger({ delimiter: '', numeralDecimalScale: 0 })
    }
  },
  computed: {
    totalQuantity () {
      return this.clothingTypes.reduce((total, type, index) => {
        const value = accounting.unformat(this.form.clothing_types[index].value, ',')

        if (value > 0) {
          total += +this.form.clothing_types[index].quantity
        }

        return total
      }, 0)
    },
    totalValue () {
      const total = this.clothingTypes.reduce((total, type, index) => {
        const quantity = this.form.clothing_types[index].quantity

        if (quantity > 0) {
          total += accounting.unformat(this.evaluateTotalType(index), ',')
        }

        return total
      }, 0)

      return formatCurrencyBRL(total)
    },
    isSomeFieldFilled () {
      return this.form.clothing_types.some((item, index) => {
        return this.isValidType(index)
      })
    },
    finalValue () {
      const unformattedTotalValue = accounting.unformat(this.totalValue, ',')
      const unformattedDiscount = accounting.unformat(this.form.discount, ',')
      const finalValue = accounting.toFixed(
        unformattedTotalValue - unformattedDiscount,
        2
      )

      if (!this.isSomeFieldFilled) {
        return 'R$ '
      }

      return formatCurrencyBRL(finalValue)
    },
    showPreRegisterPriceInfo () {
      return !isEmpty(this.order)
        && this.isOrderPreRegistered
        && this.order.price !== null
    }
  },
  methods: {
    isEmpty,
    isValidType (index) {
      const sanitizedValue = accounting.unformat(
        this.form.clothing_types[index].value,
        ','
      )

      return this.form.clothing_types[index].quantity > 0 && sanitizedValue > 0
    },
    evaluateTotalType (index) {
      const value = accounting.unformat(this.form.clothing_types[index].value, ',')
      const quantity = this.form.clothing_types[index].quantity
      const result = accounting.toFixed(quantity * value, 2)

      return formatCurrencyBRL(result)
    }
  }
}
</script>

<template>
  <div
    class="mt-3 clothing-types-group"
    :class="form.errors.get('price') && 'is-invalid'"
  >
    <h5 class="fw-bold text-secondary">
      Valores
    </h5>
    <h6 class="text-secondary">
      Tipos de roupas
    </h6>

    <template v-if="showPreRegisterPriceInfo">
      <div
        class="small text-warning mb-3"
      >
        Pedido pré-registrado com o valor de
        <span class="fw-bold">{{ $helpers.toBRL(order.original_price) }}</span>
      </div>
    </template>

    <div>
      <div class="row mb-3 text-secondary">
        <div class="col" />
        <div
          class="col text-center fw-bold"
          :class="form.errors.get('price') && 'text-danger'"
        >
          QUANTIDADE
        </div>
        <div
          class="col text-center fw-bold"
          :class="form.errors.get('price') && 'text-danger'"
        >
          VALOR UNIT.
        </div>
        <div class="col text-center fw-bold">
          TOTAL
        </div>
      </div>

      <div
        v-for="(type, index) in clothingTypes"
        :key="type.key"
        class="row"
      >
        <div
          class="col text-subtitle fw-bold"
          :class="isValidType(index) && 'text-success'"
        >
          {{ type.name }}
        </div>

        <div class="col">
          <AppInput
            v-model="form.clothing_types[index].quantity"
            :name="'quantity_' + type.key"
            :mask="maskInteger"
            @focus="form.errors.clear('price')"
          />
        </div>

        <div class="col">
          <AppInput
            v-model="form.clothing_types[index].value"
            :mask="maskCurrencyBRL"
            :name="'value_' + type.key"
            @focus="form.errors.clear('price')"
          />
        </div>

        <div class="col">
          <AppInput
            :value="evaluateTotalType(index)"
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
    <div class="small text-danger mb-1">
      {{ form.errors.get('price') }}
    </div>
    <small class="text-secondary">
      O valor só é estimado quando a <b>QUANTIDADE</b> e <b>VALOR UNIT.</b> de um linha é preenchido.
    </small>

    <OrderFormValuesFinal
      :form="form"
      :final-value="finalValue"
      :is-edit="isEdit"
    />
  </div>
</template>

<style lang="scss" scoped>
@import '@/sass/variables/_colors.scss';

.clothing-types-group.is-invalid {

  .clothing-types-title,
  .clothing-types-subtitle {
    color: $danger !important;
  }
}
</style>
