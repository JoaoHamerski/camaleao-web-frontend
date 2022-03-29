<script>
import { UpdateCity, CreateCity } from '@/graphql/City.gql'
import { handleError, handleSuccess } from '@/utils/forms'

import Form from '@/utils/Form'

export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    states: {
      type: Array,
      default: () => ([])
    },
    city: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      isLoading: false,
      form: new Form({
        name: '',
        state_id: ''
      })
    }
  },
  mounted () {
    if (this.isEdit) {
      this.populateForm()
    }
  },
  methods: {
    populateForm () {
      const state = this.states.find(state => state.id === this.city.state?.id)

      this.form.name = this.city.name
      this.form.state_id = state
    },
    getFormattedData () {
      const data = { ...this.form.data() }

      data.state_id = data.state_id.id || ''

      return data
    },
    async update (data) {
      try {
        await this.$apollo.mutate({
          mutation: UpdateCity,
          variables: {
            id: this.city.id,
            input: data
          }
        })

        handleSuccess(this, { message: 'Cidade atualizada!' })
      } catch (error) {
        handleError(this, error)
      }
    },
    async create (data) {
      try {
        await this.$apollo.mutate({
          mutation: CreateCity,
          variables: {
            input: data
          },
          refetchQueries: ['GetSimpleCities']
        })

        handleSuccess(this, { message: 'Cidade cadastrada!', resetForm: true })
      } catch (error) {
        handleError(this, error)
      }
    },
    async onSubmit () {
      const data = this.getFormattedData()

      this.isLoading = true

      if (this.isEdit) {
        await this.update(data)
      } else {
        await this.create(data)
      }

      this.isLoading = false
    },
    stateCustomLabel (state) {
      return `${state.name} - ${state.abbreviation}`
    }
  }
}
</script>

<template>
  <AppForm
    :form="form"
    :on-submit="onSubmit"
  >
    <AppInput
      id="name"
      v-model="form.name"
      name="name"
      placeholder="Digite o nome da cidade..."
      :error="form.errors.get('name')"
    >
      Nome da cidade:
    </AppInput>

    <AppSelect
      v-model="form.state_id"
      name="state_id"
      :options="states"
      placeholder="Selecione um estado"
      :custom-label="stateCustomLabel"
      :error="form.errors.get('state_id')"
    >
      Selecione um estado:
    </AppSelect>

    <div class="text-secondary">
      <small>
        <strong>Atenção:</strong> As alterações aqui refletem nos dados relacionados com as cidades no restante do sistema.
      </small>
    </div>

    <div class="row mt-4">
      <div class="col">
        <AppButton
          btn-class="fw-bold"
          color="success"
          block
          :loading="isLoading"
        >
          {{ isEdit ? 'Atualizar' : 'Cadastrar' }}
        </AppButton>
      </div>
      <div class="col">
        <AppButton
          type="button"
          data-bs-dismiss="modal"
          color="light"
          block
        >
          Cancelar
        </AppButton>
      </div>
    </div>
  </AppForm>
</template>
