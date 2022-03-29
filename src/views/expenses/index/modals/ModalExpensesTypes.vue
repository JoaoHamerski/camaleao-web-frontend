<script>
import { isEmpty } from 'lodash-es'
import { faList, faEdit } from '@fortawesome/free-solid-svg-icons'
import Form from '@/utils/Form'
import { handleSuccess, handleError } from '@/utils/forms'
import { CreateExpenseType, UpdateExpenseType } from '@/graphql/ExpenseType.gql'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    expenseTypes: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      icons: {
        faList,
        faEdit
      },
      isLoadingCreate: false,
      form: new Form({
        name: ''
      }),
      isLoadingEdit: false,
      editForm: new Form({
        name: ''
      }),
      editingType: {}
    }
  },
  methods: {
    isEmpty,
    onEditExpenseType (type) {
      this.editingType = type

      this.editForm.reset()
      this.editForm.name = type.name
    },
    async onCreate () {
      const data = { ...this.form.data() }

      this.isLoadingCreate = true

      try {
        await this.$apollo.mutate({
          mutation: CreateExpenseType,
          variables: {
            input: data
          },
          refetchQueries: ['GetExpenseTypes']
        })

        handleSuccess(this, {
          message: 'Tipo de despesa registrado!',
          resetForm: true
        })
      } catch (error) {
        handleError(this, error)
      }

      this.isLoadingCreate = false
    },
    async onUpdate () {
      const data = { ...this.editForm.data() }

      this.isLoadingEdit = true

      try {
        await this.$apollo.mutate({
          mutation: UpdateExpenseType,
          variables: {
            id: this.editingType.id,
            input: data
          }
        })

        handleSuccess(this, {
          message: 'Tipo de despesa atualizado!',
          formProp: 'editForm',
          resetForm: true
        })
      } catch (error) {
        handleError(this, error)
      }

      this.isLoadingEdit = false
      this.editingType = {}
    }
  }
}
</script>

<template>
  <AppModal
    id="expensesTypesModal"
    :value="value"
    centered
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faList"
        fixed-width
      />
      Gerenciar tipos de despesas
    </template>
    <template #body>
      <AppForm
        :form="form"
        :on-submit="onCreate"
      >
        <AppInput
          v-model="form.name"
          name="name"
          placeholder="Nome do tipo de despesa..."
          :error="form.errors.get('name')"
        >
          <template #append>
            <AppButton
              type="submit"
              outlined
              :loading="isLoadingCreate"
              @click.prevent="onCreate"
            >
              Adicionar
            </AppButton>
          </template>
        </AppInput>
      </AppForm>

      <ul class="list-group">
        <li
          v-for="type in expenseTypes"
          :key="type.id"
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <template v-if="editingType === type">
            <AppForm
              :form="editForm"
              :on-submit="onUpdate"
              class="w-100"
            >
              <AppInput
                v-model="editForm.name"
                class="col"
                name="name"
                placeholder="Nome do tipo de despesa..."
                :error="editForm.errors.get('name')"
                :default-margin="false"
              >
                <template #append>
                  <AppButton
                    type="submit"
                    outlined
                    :loading="isLoadingEdit"
                    @click.prevent="onUpdate"
                  >
                    Atualizar
                  </AppButton>
                </template>
              </AppInput>
            </AppForm>
          </template>
          <template v-else>
            <div>{{ type.name }}</div>

            <AppButton
              outlined
              btn-class="btn-sm"
              tooltip="Editar"
              :icon="icons.faEdit"
              @click.prevent="onEditExpenseType(type)"
            />
          </template>
        </li>
      </ul>

      <div class="d-flex mt-3">
        <AppButton
          class="ms-auto"
          color="light"
          data-bs-dismiss="modal"
        >
          Fechar
        </AppButton>
      </div>
    </template>
  </AppModal>
</template>
