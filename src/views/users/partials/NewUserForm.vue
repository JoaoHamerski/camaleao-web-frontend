<script>
import { userCreate } from '@/graphql/User.gql'
import { handleSuccess, handleError } from '@/utils/forms'
import Form from '@/utils/Form'

export default {
  props: {
    roles: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      isLoading: false,
      form: new Form({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role_id: ''
      })
    }
  },
  methods: {
    async onSubmit () {
      const data = this.form.data()

      this.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: userCreate,
          variables: {
            input: data
          }
        })

        handleSuccess(this, { message: 'Usuário cadastrado!' })
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
    :form="form"
    :on-submit="onSubmit"
  >
    <AppInput
      id="name"
      v-model="form.name"
      name="name"
      placeholder="Digite o nome..."
      autocomplete="off"
      :error="form.errors.get('name')"
    >
      Nome
    </AppInput>
    <AppInput
      id="email"
      v-model="form.email"
      name="email"
      autocomplete="off"
      placeholder="Digite o email..."
      :error="form.errors.get('email')"
    >
      Email
    </AppInput>

    <div class="row">
      <div class="col">
        <AppInput
          id="password"
          v-model="form.password"
          name="password"
          type="password"
          placeholder="Digite uma senha..."
          autocomplete="new-password"
          :error="form.errors.get('password')"
        >
          Senha
        </AppInput>
      </div>

      <div class="col">
        <AppInput
          id="password_confirmation"
          v-model="form.password_confirmation"
          name="password_confirmation"
          type="password"
          placeholder="Repita a senha..."
          autocomplete="new-password"
          :error="form.errors.get('password_confirmation')"
        >
          Confirme a senha
        </AppInput>
      </div>
    </div>

    <AppSimpleSelect
      id="role_id"
      v-model="form.role_id"
      name="role_id"
      label-prop="name"
      :options="roles"
      placeholder="Selecione o privilégio"
      :error="form.errors.get('role_id')"
    >
      Privilégio de usuário
    </AppSimpleSelect>

    <div class="row mt-4">
      <div class="col">
        <AppButton
          btn-class="fw-bold"
          color="success"
          block
          :loading="isLoading"
          @click.prevent="onSubmit"
        >
          Cadastrar
        </AppButton>
      </div>

      <div class="col">
        <AppButton
          type="button"
          data-bs-dismiss="modal"
          block
          color="light"
        >
          Cancelar
        </AppButton>
      </div>
    </div>
  </AppForm>
</template>
