<script>
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import Form from '@/utils/Form'
import { handleError, handleSuccess } from '@/utils/forms'
import { UpdateAuthUser } from '@/graphql/Auth.gql'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    authUser: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      changePassword: false,
      isLoading: false,
      icons: {
        faEdit
      },
      form: new Form({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      })
    }
  },
  methods: {
    onModalShow () {
      const { name, email } = this.authUser

      this.form.name = name
      this.form.email = email
    },
    async onSubmit () {
      const input = this.form.data()

      this.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: UpdateAuthUser,
          variables: { input }
        })

        handleSuccess(this, { message: 'Dados atualizados!' })
      } catch (error) {
        handleError(this, error)
      }

      this.isLoading = false
    }
  }
}
</script>

<template>
  <AppModal
    id="modalEditAccount"
    :value="value"
    centered
    v-on="$listeners"
    @show="onModalShow"
  >
    <template #title>
      <FontAwesomeIcon :icon="icons.faEdit" />
      Editar dados da sua conta
    </template>
    <template #body>
      <AppForm
        v-if="value"
        :form="form"
        :on-submit="onSubmit"
      >
        <AppInput
          id="name"
          v-model="form.name"
          name="name"
          placeholder="Seu nome..."
          :error="form.errors.get('name')"
          autocomplete="name"
        >
          Nome:
        </AppInput>
        <AppInput
          id="email"
          v-model="form.email"
          name="email"
          placeholder="Seu email..."
          :error="form.errors.get('email')"
          autocomplete="email"
        >
          E-mail:
        </AppInput>

        <AppCheckbox
          id="changePassword"
          v-model="changePassword"
        >
          Alterar senha
        </AppCheckbox>

        <template v-if="changePassword">
          <div class="row">
            <div class="col">
              <AppInput
                id="password"
                v-model="form.password"
                name="password"
                autocomplete="new-password"
                :error="form.errors.get('password')"
                :default-margin="false"
                type="password"
              >
                Nova senha:
              </AppInput>
            </div>
            <div class="col">
              <AppInput
                id="password_confirmation"
                v-model="form.password_confirmation"
                name="password_confirmation"
                autocomplete="new-password"
                :error="form.errors.get('password_confirmation')"
                :default-margin="false"
                type="password"
              >
                Confirme a senha:
              </AppInput>
            </div>
          </div>
          <small class="form-text">Você também pode deixar em branco caso não queira alterá-la</small>
        </template>

        <div class="row mt-4">
          <div class="col">
            <AppButton
              block
              color="success"
              btn-class="fw-bold"
              :loading="isLoading"
            >
              Atualizar
            </AppButton>
          </div>

          <div class="col">
            <AppButton
              block
              color="light"
              type="button"
              data-bs-dismiss="modal"
              :disabled="isLoading"
            >
              Cancelar
            </AppButton>
          </div>
        </div>
      </AppForm>
    </template>
  </AppModal>
</template>
