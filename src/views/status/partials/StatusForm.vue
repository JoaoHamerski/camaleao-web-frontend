<script>
import Form from '@/utils/Form'
import { handleSuccess, handleError } from '@/utils/forms'
import { CreateStatus, UpdateStatus } from '@/graphql/Status.gql'

export default {
  props: {
    status: {
      type: Object,
      default: null
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isLoading: false,
      form: new Form({
        text: ''
      })
    }
  },
  mounted () {
    if (this.isEdit) {
      this.populateForm()
    }

    this.$parent.$once('shown', this.focusInput)
  },
  methods: {
    focusInput () {
      this.$refs.textInput.focusInput()
    },
    populateForm () {
      this.form.text = this.status.text
    },
    async create (input) {
      try {
        await this.$apollo.mutate({
          mutation: CreateStatus,
          variables: { input }
        })

        handleSuccess(this, {message: 'Novo status registrado!', resetForm: true})
      } catch (error) {
        handleError(this, error)
      }
    },
    async update (input) {
      try {
        await this.$apollo.mutate({
          mutation: UpdateStatus,
          variables: {
            id: this.status.id,
            input
          }
        })

        handleSuccess(this, { message: 'Status atualizado!'})
      } catch (error) {
        handleError(this, error)
      }
    },
    async onSubmit() {
      const input = this.form.data()

      this.isLoading = true

      if (this.isEdit) {
        await this.update(input)
      } else {
        await this.create(input)
      }

      this.$helpers.clearCacheFrom({fieldName: 'status'})

      this.isLoading = false
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
      id="text"
      ref="textInput"
      v-model="form.text"
      name="text"
      placeholder="Digite um nome para o status..."
      :error="form.errors.get('text')"
    >
      Nome do status
    </AppInput>

    <div class="row mt-4">
      <div class="col">
        <AppButton
          type="submit"
          color="success"
          btn-class="fw-bold"
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
          block
          color="light"
          :disabled="isLoading"
        >
          Cancelar
        </AppButton>
      </div>
    </div>
  </AppForm>
</template>
