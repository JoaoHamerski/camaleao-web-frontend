<script>
import Form from '@/utils/Form'
import { handleSuccess, handleError } from '@/utils/forms'

import { GetBudgets, CreateBudget, UpdateBudget } from '@/graphql/Budget.gql'
import { cloneDeep, omit, uniqueId } from 'lodash-es'
import { formatDatetime } from '@/utils/formatters'

import { maskDate } from '@/utils/masks'

import BudgetFormProducts from './BudgetFormProducts.vue'

const PRODUCT_ITEM = {
  id: uniqueId('new_'),
  item: 1,
  description: '',
  quantity: '',
  unity: 'un',
  value: 'R$ ',
  errors: []
}

export default {
  components: {
    BudgetFormProducts,
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    budget: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      maskDate,
      isLoading: false,
      form: new Form({
        product: '',
        client: '',
        date: '',
        product_items: [
          { ...PRODUCT_ITEM }
        ]
      })
    }
  },
  mounted () {
    if (this.isEdit) {
      this.populateForm()
    }
  },
  methods: {
    populateForm() {
      const productItemsParsed = JSON.parse(this.budget.product_items)
      const productItems = productItemsParsed.map(
        (productItem) => ({
          ...productItem,
          id: uniqueId('stored_'),
          value: this.$helpers.toBRL(productItem.value),
          errors: [],
        })
      )

      this.form.set({
        ...omit(this.budget, ['product_items', 'date']),
        product_items: productItems,
        date: formatDatetime(this.budget.date),
        }
      )
    },
    onNewItem () {
      this.form.product_items.push({
        ...PRODUCT_ITEM,
        id: uniqueId('_new'),
        item: this.form.product_items.length + 1,
      })
    },
    onDeleteItem (productItem) {
      if (this.form.product_items.length === 1) {
        return
      }

      const indexToDelete = this.form.product_items.findIndex(
        ({item}) => item === productItem.item
      )

      this.form.product_items.splice(indexToDelete, 1)

      this.form.product_items.forEach((product, index) => {
        product.item = index + 1
      })
    },
    getFormattedForm () {
      const form = cloneDeep(this.form.data())

      form.product_items = form.product_items.map(
        (item) => ({...omit(item, ['id', 'errors'])})
      )

      return form
    },
    async submitForm (input) {
      if (this.isEdit) {
        await this.update(input)

        return
      }

      await this.create(input)
    },
    async onSubmit () {
      const input = this.getFormattedForm()

      this.isLoading = true

      try {
        await this.submitForm(input)
      } catch (error) {
        handleError(this, error)
        this.handleProductItemsError(error)
      }

      this.isLoading = false
    },
    async create (input) {
      await this.$apollo.mutate({
        mutation: CreateBudget,
        variables: { input },
        refetchQueries: [GetBudgets],
        awaitRefetchQueries: true
      })

      handleSuccess(this, {
        resetForm: true,
        message: 'Orçamento cadastrado!'
      })
    },
    async update (input) {
      await this.$apollo.mutate({
        mutation: UpdateBudget,
        variables: {
          id: this.budget.id,
          input
        }
      })

      handleSuccess(this, {
        message: 'Orçamento atualizado!'
      })
    },
    handleProductItemsError(error) {
      const errors = omit(
        error.graphQLErrors[0].extensions.validation,
        ['client', 'product', 'date']
      )

      this.form.product_items.forEach((productItem, index) => {
        const keys = Object.keys(errors)
        const indexKeys = keys.filter((key) => key.includes(`.${index}.`))
        const errorKeys = indexKeys.map((key) => key.split(`.${index}.`)[1])

        productItem.errors = errorKeys
      })
    },
    clearProductItemsError (event) {
      const [formGroup, id, fieldToClear] = event.target.name.split('.')

      if (formGroup !== 'product_items') {
        return
      }

      const index = this.form.product_items.findIndex(
        (productItem) => id === productItem.id
      )

      const productItem = this.form.product_items[index]
      productItem.errors = productItem.errors.filter(field => field !== fieldToClear)
    }
  }
}
</script>
<template>
  <AppForm
    :form="form"
    :on-submit="onSubmit"
    @focus.native.capture="clearProductItemsError"
  >
    <div class="row">
      <div class="col">
        <AppInput
          id="client"
          v-model="form.client"
          name="client"
          placeholder="Digite o cliente..."
          :error="form.errors.get('client')"
        >
          Cliente
        </AppInput>
      </div>

      <div class="col">
        <AppInput
          id="product"
          v-model="form.product"
          name="product"
          placeholder="Digite o produto..."
          :error="form.errors.get('product')"
        >
          Nome do produto
        </AppInput>
      </div>
    </div>

    <BudgetFormProducts
      class="my-3"
      :form="form"
      @new-item="onNewItem"
      @delete-item="onDeleteItem"
    />

    <AppInput
      id="date"
      v-model="form.date"
      name="date"
      type="date"
      placeholder="dd/mm/aaaa"
      :error="form.errors.get('date')"
      :mask="maskDate"
    >
      Data
    </AppInput>

    <div class="row mt-2">
      <div class="col">
        <AppButton
          block
          color="success"
          btn-class="fw-bold"
          :loading="isLoading"
        >
          {{ isEdit ? 'Atualizar' : 'Cadastrar' }}
        </AppButton>
      </div>
      <div class="col">
        <AppButton
          block
          color="light"
          :disabled="isLoading"
          type="button"
          data-bs-dismiss="modal"
        >
          Cancelar
        </AppButton>
      </div>
    </div>
  </AppForm>
</template>
