<script>
import { faPlus, faTrashAlt, faBoxOpen } from '@fortawesome/free-solid-svg-icons'
import BudgetFormProductsHeader from '@/views/budget-generator/partials/BudgetFormProductsHeader.vue'

import { maskCurrencyBRL, maskInteger } from '@/utils/masks'
import * as accounting from 'accounting-js'


const UNITIES = [
  { abbr: 'un', name: 'Unidade' },
  { abbr: 'pc', name: 'Peça' },
  { abbr: 'pct', name: 'Pacote' },
  { abbr: 'cx', name: 'Caixa' },
  { abbr: 'm', name: 'Metro' },
]

export default {
  components: {
    BudgetFormProductsHeader
  },
  props: {
    form: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      UNITIES,
      maskCurrencyBRL: maskCurrencyBRL(),
      maskInteger: maskInteger({ delimiter: '', numeralDecimalScale: 0}),
      icons: {
        faPlus,
        faTrashAlt,
        faBoxOpen
      }
    }
  },
  computed: {
    isDeleteProductDisabled () {
      return this.form.product_items.length === 1
    },
    getTotal () {
      const total = this.form.product_items.reduce((sum, item) => {
        const value = this.$helpers.unformatCurrencyBRL(item.value)

        if (!item.quantity || !value) {
          return sum
        }

        return sum + +accounting.toFixed(item.quantity * value, 2)
      }, 0)

      return this.$helpers.toBRL(total)
    }
  },
  methods: {
    getTotalRow({quantity, value}) {
      const unformattedValue = this.$helpers.unformatCurrencyBRL(value)

      if (!quantity || !unformattedValue) {
        return 'R$ '
      }

      const total = accounting.toFixed(quantity * unformattedValue, 2)

      return this.$helpers.toBRL(total)
    },
    onNewItemClick () {
      this.$emit('new-item')
    },
    onDeleteItemClick(item) {
      this.$emit('delete-item', item)
    },
    unityLabelProp (item) {
      return `${item.abbr.toUpperCase()} - ${item.name}`
    },
    getProductItem (id, prop = null) {
      const index = this.form.product_items.findIndex(
        (product) => id === product.id
      )

      if (prop) {
        return this.form.product_items[index][prop]
      }

      return this.form.product_items[index]
    },
    setFormById(id, prop, value) {
      const index = this.form.product_items.findIndex(
        (product) => id === product.id
      )

      this.form.set({
        [`product_items.${index}.${prop}`]: value
      })
    },
    hasError (productItem, prop) {
      return productItem.errors.includes(prop)
    }
  }
}
</script>

<template>
  <AppContainer>
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faBoxOpen"
        fixed-width
        class="me-1"
      />
      <span>Produtos</span>
    </template>
    <template #body>
      <BudgetFormProductsHeader />

      <template v-for="(productItem) in form.product_items">
        <div
          :key="productItem.id"
          class="row"
        >
          <div class="col-1">
            <AppInput
              :id="`product_items.${productItem.id}.item`"
              :name="`product_items.${productItem.id}.item`"
              disabled
              :value="getProductItem(productItem.id, 'item')"
            />
          </div>
          <div class="col-3">
            <AppInput
              :id="`product_items.${productItem.id}.description`"
              :name="`product_items.${productItem.id}.description`"
              :value="getProductItem(productItem.id, 'description')"
              :error="hasError(productItem, 'description')"
              @input="setFormById(productItem.id, 'description', $event)"
            />
          </div>
          <div class="col-2">
            <AppSimpleSelect
              :id="`product_items.${productItem.id}.unity`"
              :name="`product_items.${productItem.id}.unity`"
              :value="getProductItem(productItem.id, 'unity')"
              :options="UNITIES"
              :label-prop="unityLabelProp"
              value-prop="abbr"
              hide-default-option
              @input="setFormById(productItem.id, 'unity', $event)"
            />
          </div>
          <div class="col-1">
            <AppInput
              :id="`product_items.${productItem.id}.quantity`"
              :name="`product_items.${productItem.id}.quantity`"
              :value="getProductItem(productItem.id, 'quantity')"
              :error="hasError(productItem, 'quantity')"
              :mask="maskInteger"
              @input="setFormById(productItem.id, 'quantity', $event)"
            />
          </div>
          <div class="col-2">
            <AppInput
              :id="`product_items.${productItem.id}.value`"
              :name="`product_items.${productItem.id}.value`"
              :value="getProductItem(productItem.id, 'value')"
              :error="hasError(productItem, 'value')"
              :mask="maskCurrencyBRL"
              @input="setFormById(productItem.id, 'value', $event)"
            />
          </div>
          <div class="col-2">
            <AppInput
              :id="`product_items.${productItem.id}.total`"
              :name="`product_items.${productItem.id}.total`"
              :value="getTotalRow(getProductItem(productItem.id))"
              disabled
            />
          </div>
          <div class="col-1">
            <AppButton
              outlined
              color="danger"
              :icon="icons.faTrashAlt"
              :disabled="isDeleteProductDisabled"
              @click.prevent="onDeleteItemClick(productItem)"
            />
          </div>
        </div>
      </template>

      <div class="text-center">
        <AppButton
          outlined
          color="success"
          :icon="icons.faPlus"
          @click.prevent="onNewItemClick"
        />
      </div>
    </template>
  </AppContainer>
</template>
