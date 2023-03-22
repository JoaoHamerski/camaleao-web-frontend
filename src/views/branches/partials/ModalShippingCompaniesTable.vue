<script>
import {
  faEdit,
  faTrashAlt,
  faCheck,
  faTimes
} from '@fortawesome/free-solid-svg-icons'
import { UpdateShippingCompany } from '@/graphql/ShippingCompany.gql'
import { handleError } from '@/utils/forms'
import Form from '@/utils/Form'

export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      edit: {
        id: '',
        isLoading: false
      },
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
    isEditing ({ id }) {
      return this.edit.id === id
    },
    async onSubmitEdit ({ id }) {
      const data = this.form.data()

      this.edit.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: UpdateShippingCompany,
          variables: {
            id,
            name: data.name
          }
        })

        this.edit.id = ''
        this.$toast.success('Transportadora editada!')
      } catch (error) {
        handleError(this, error)
      }

      this.edit.isLoading = false
    },
    onEditClick ({ id, name }) {
      this.edit.id = id
      this.form.name = name
      this.$nextTick(() => {
        this.$refs.editCompanyNameInput.focusInput()
      })
    },
    onCancelEditClick () {
      this.edit.id = ''
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
        <template v-if="isEditing(item)">
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
        v-if="isEditing(item)"
      >
        <AppButton
          v-tippy
          btn-class="btn-sm fw-bold"
          color="success"
          :icon="icons.faCheck"
          class="me-1"
          content="Salvar"
          :loading="edit.isLoading"
          @click.prevent="onSubmitEdit(item)"
        />
        <AppButton
          v-tippy
          class="ms-1"
          btn-class="btn-sm"
          color="light"
          :icon="icons.faTimes"
          :disabled="edit.isLoading"
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
