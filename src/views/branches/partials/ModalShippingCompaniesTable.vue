<script>
import {
  faEdit,
  faTrashAlt,
  faCheck,
  faTimes
} from '@fortawesome/free-solid-svg-icons'
import { shippingCompanyEdit } from '@/graphql/ShippingCompany.gql'
import { branches } from '@/graphql/Branch.gql'
import { handleSuccess, handleError } from '@/utils/forms'
import Form from '@/utils/Form'

export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    setCompaniesDefaultEditState: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      isLoading: false,
      form: new Form({
        name: ''
      }),
      icons: {
        faEdit,
        faTrashAlt,
        faCheck,
        faTimes
      }
    }
  },
  computed: {
    headers () {
      return [
        { text: 'Nome', value: 'name' },
        { text: 'Ações', value: 'actions', align: 'center' }
      ]
    }
  },
  methods: {
    async onSubmitEdit ({ id }) {
      const data = this.form.data()

      this.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: shippingCompanyEdit,
          variables: {
            id,
            name: data.name
          },
          refetchQueries: [
            { query: branches }
          ]
        })

        handleSuccess(this, { message: 'Transportadora editada!' })
      } catch (error) {
        handleError(this, error)
      }

      this.isLoading = false
    },
    onEditClick (item) {
      this.setCompaniesDefaultEditState()

      item.isEdit = true
      this.form.name = item.name
      this.$nextTick(() => {
        this.$refs.editCompanyNameInput.focusInput()
      })
    },
    onCancelEditClick (item) {
      item.isEdit = false
    },
    onActionButtonClick (action, item) {
      this.$emit('action', { action, item })
    }
  }
}
</script>

<template>
  <AppTable
    :headers="headers"
    :items="items"
  >
    <template #[`items.name`]="{ item }">
      <div class="w-100">
        <template v-if="item.isEdit">
          <AppForm
            :form="form"
            :on-submit="() => onSubmitEdit(item)"
          >
            <AppInput
              ref="editCompanyNameInput"
              v-model="form.name"
              input-class="form-control-sm"
              name="name"
              placeholder="Nome da transportadora..."
              :default-margin="false"
              :error="form.errors.get('name')"
            />
          </AppForm>
        </template>
        <template v-else>
          {{ item.name }}
        </template>
      </div>
    </template>
    <template #[`items.actions`]="{ item }">
      <div
        v-if="item.isEdit"
      >
        <AppButton
          v-tippy
          btn-class="btn-sm fw-bold"
          color="success"
          :icon="icons.faCheck"
          class="me-1"
          content="Salvar"
          :loading="isLoading"
          @click.prevent="onSubmitEdit(item)"
        />
        <AppButton
          v-tippy
          class="ms-1"
          btn-class="btn-sm"
          color="light"
          :icon="icons.faTimes"
          content="Cancelar"
          @click.prevent="onCancelEditClick(item)"
        />
      </div>
      <div
        v-else
        class="d-flex justify-content-center"
      >
        <AppButton
          v-tippy
          :icon="icons.faEdit"
          btn-class="btn-sm"
          outlined
          class="me-1"
          content="Editar"
          @click.prevent="onEditClick(item)"
        />
        <AppButton
          v-tippy
          :icon="icons.faTrashAlt"
          color="danger"
          btn-class="btn-sm"
          outlined
          class="ms-1"
          content="Deletar"
          @click.prevent="onActionButtonClick('delete', item)"
        />
      </div>
    </template>
  </AppTable>
</template>
