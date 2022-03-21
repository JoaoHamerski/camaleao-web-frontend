<script>
import { isEmpty } from 'lodash-es'
import { faList, faEdit } from '@fortawesome/free-solid-svg-icons'
import Form from '@/utils/Form'
import { handleSuccess, handleError } from '@/utils/forms'
import { expenseTypesCreate, expenseTypesUpdate } from '@/graphql/ExpenseType.gql'

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

      type.isEdit = true
    },
    async onCreate () {
      const data = { ...this.form.data() }

      this.isLoadingCreate = true

      try {
        await this.$apollo.mutate({
          mutation: expenseTypesCreate,
          variables: {
            input: data
          }
        })

        handleSuccess(this, { message: 'Tipo de despesa registrado!' })
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
          mutation: expenseTypesUpdate,
          variables: {
            id: this.editingType.id,
            input: data
          }
        })

        handleSuccess(this, { message: 'Tipo de despesa atualizado!' })
      } catch (error) {
        handleError(this, error)
      }

      this.isLoadingEdit = false
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
      <AppInput
        v-model="form.name"
        name="name"
        placeholder="Nome do tipo de despesa..."
        :error="form.errors.get('name')"
        @focus="form.errors.clear('name')"
      >
        <template #append>
          <AppButton
            outlined
            :loading="isLoadingCreate"
            @click="onCreate"
          >
            Adicionar
          </AppButton>
        </template>
      </AppInput>

      <ul class="list-group">
        <li
          v-for="type in expenseTypes"
          :key="type.id"
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <template v-if="editingType === type">
            <AppInput
              v-model="editForm.name"
              class="col"
              name="name"
              placeholder="Nome do tipo de despesa..."
              :error="editForm.errors.get('name')"
              :default-margin="false"
              @focus="editForm.errors.clear('name')"
            >
              <template #append>
                <AppButton
                  outlined
                  :loading="isLoadingEdit"
                  @click.prevent="onUpdate()"
                >
                  Atualizar
                </AppButton>
              </template>
            </AppInput>
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
