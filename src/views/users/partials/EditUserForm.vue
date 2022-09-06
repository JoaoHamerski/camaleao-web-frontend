<script>
import Form from '@/utils/Form'
import { EditUser } from '@/graphql/User.gql'
import { handleSuccess, handleError } from '@/utils/forms'

export default {
  props: {
    user: {
      type: Object,
      required: true
    },
    roles: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      changePassword: false,
      isLoading: false,
      form: new Form({
        role: '',
        password: ''
      })
    }
  },
  mounted () {
    this.form.role = this.user.role.id
  },
  methods: {
    async submit () {
      const input = this.form.data()

      this.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: EditUser,
          variables: {
            id: this.user.id,
            input
          }
        })

        handleSuccess(this, { message: 'Usuário atualizado!' })
      } catch (error) {
        handleError(this, error)
      }

      this.isLoading = false
    }
  }
}
</script>

<template>
  <AppForm
    :on-submit="submit"
    :form="form"
  >
    <label class="form-label fw-bold">Selecione o privilégio: </label>

    <div class="ms-2">
      <AppRadio
        v-model="form.role"
        :options="roles"
        name="role"
        label-prop="name"
        value-prop="id"
        align="vertical"
      />
    </div>

    <AppCheckbox
      id="changePassword"
      v-model="changePassword"
    >
      Alterar senha
    </AppCheckbox>
    <AppInput
      v-show="changePassword"
      id="password"
      v-model="form.password"
      name="password"
      type="password"
      placeholder="Digite uma nova senha..."
    >
      Nova senha:
      <template #hint>
        Deixe em branco caso não queira alterar.
      </template>
    </AppInput>

    <div class="row mt-4">
      <div class="col">
        <AppButton
          type="submit"
          btn-class="fw-bold"
          color="success"
          block
          :loading="isLoading"
        >
          Atualizar
        </AppButton>
      </div>

      <div class="col">
        <AppButton
          type="button"
          color="light"
          data-bs-dismiss="modal"
          block
          :disabled="isLoading"
        >
          Cancelar
        </AppButton>
      </div>
    </div>
  </AppForm>
</template>
