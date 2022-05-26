<script>
import {
  GetProductTypes,
  CreateProductType,
  UpdateProductType,
  ChangeProductTypesExpenseField
} from '@/graphql/ProductType.gql'
import { GetExpenseTypes } from '@/graphql/ExpenseType.gql'

import Form from '@/utils/Form'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { handleSuccess, handleError } from '@/utils/forms'

export default {
  apollo: {
    productTypes: {
      query: GetProductTypes
    },
    expenseTypes: {
      query: GetExpenseTypes,
      async result ({loading}) {
        if (!loading) {
          const expense_type = await this.$helpers.getConfig('app', 'product_types_expense')

          this.$nextTick(() => {
            this.formExpense.id = expense_type
          })
        }
      }
    }
  },
  data () {
    return {
      isLoading: false,
      isEditLoading: false,
      isProductTypeExpenseLoading: false,
      productTypes: [],
      expenseTypes: [],
      icons: {
        faEdit
      },
      editingType: {},
      form: new Form({
        name: ''
      }),
      formEdit: new Form({
        name: ''
      }),
      formExpense: new Form({
        id: ''
      })
    }
  },
  methods: {
    async submitExpenseOfProduct () {
      const { id } = this.formExpense.data()

      this.isProductTypeExpenseLoading = true

      try {
        await this.$apollo.mutate({
          mutation: ChangeProductTypesExpenseField,
          variables: { id }
        })

        handleSuccess(this, {message: 'Alterado!'})
      } catch (error) {
        handleError(this, error)
      }

      this.isProductTypeExpenseLoading = false
    },
    async create () {
      const input = this.form.data()

      this.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: CreateProductType,
          variables: { input },
          refetchQueries: [GetProductTypes],
          awaitRefetchQueries: true
        })

        handleSuccess(this, { message: 'Novo tipo de produto criado!', resetForm: true })
      } catch (error) {
        handleError(this, error)
      }

      this.isLoading = false
    },
    async update () {
      const input = this.formEdit.data()

      this.isEditLoading = true

      try {
        await this.$apollo.mutate({
          mutation: UpdateProductType,
          variables: {
            id: this.editingType.id,
            input
          }
        })

        handleSuccess(this, { message: 'Nome do produto atualizado!'})
      } catch (error) {
        handleError(this, error)
      }

      this.editingType = ''
      this.isEditLoading = false
    },
    onEditProductTypeClick (type) {
      this.editingType = type
      this.formEdit.name = type.name
    }
  }
}
</script>

<template>
  <div>
    <AppForm
      :form="formExpense"
      :on-submit="submitExpenseOfProduct"
    >
      <AppSimpleSelect
        id="expenses"
        v-model="formExpense.id"
        name="expenses"
        label-prop="name"
        :options="expenseTypes"
        hint="O campo produto é exibido no formulário de despesas"
      >
        Mostrar o campo produto quando o tipo de despesa selecionada for:
        <template #append>
          <AppButton
            outlined
            :loading="isProductTypeExpenseLoading"
          >
            Aplicar
          </AppButton>
        </template>
      </AppSimpleSelect>
    </AppForm>

    <AppForm
      :form="form"
      :on-submit="create"
    >
      <AppInput
        id="name"
        v-model="form.name"
        name="name"
        placeholder="Nome do tipo de produto"
        :error="form.errors.get('name')"
      >
        <template #append>
          <AppButton
            outlined
            type="submit"
            :loading="isLoading"
          >
            Adicionar
          </AppButton>
        </template>
      </AppInput>
    </AppForm>

    <div>
      <ul class="list-group">
        <li
          v-for="type in productTypes"
          :key="type.id"
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <template v-if="editingType.id === type.id">
            <AppForm
              :form="formEdit"
              :on-submit="update"
              class="col"
            >
              <div class="col">
                <AppInput
                  id="name-edit"
                  v-model="formEdit.name"
                  name="name-edit"
                  :default-margin="false"
                  placeholder="Nome do tipo de produto"
                >
                  <template #append>
                    <AppButton
                      outlined
                      type="submit"
                      :loading="isEditLoading"
                    >
                      Atualizar
                    </AppButton>
                  </template>
                </AppInput>
              </div>
            </AppForm>
          </template>
          <template v-else>
            <div>{{ type.name }}</div>
            <AppButton
              btn-class="btn-sm"
              :icon="icons.faEdit"
              outlined
              @click.prevent="onEditProductTypeClick(type)"
            />
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>
