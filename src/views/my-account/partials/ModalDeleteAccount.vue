<script>
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { authDelete } from '@/graphql/Auth.gql'
import Form from '@/utils/Form'
import { handleSuccess, handleError } from '@/utils/forms'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isLoading: false,
      form: new Form({
        password: ''
      }),
      icons: {
        faTrashAlt
      }
    }
  },
  methods: {
    async onSubmit () {
      const { password } = this.form.data()

      this.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: authDelete,
          variables: {
            password
          }
        })

        handleSuccess(this, { message: 'Sua conta foi deletada!' })
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
    id="modalDeleteAccount"
    :value="value"
    color="danger"
    centered
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon :icon="icons.faTrashAlt" />
      Deletar conta
    </template>

    <template #body>
      <div class="text-center">
        <FontAwesomeIcon
          size="5x"
          class="text-danger"
          :icon="icons.faTrashAlt"
        />
        <h6 class="fw-bold mt-3">
          Você tem certeza que deseja deletar a sua conta?
        </h6>
      </div>

      <AppForm
        :form="form"
        :on-submit="onSubmit"
        class="mt-5"
        autocomplete="off"
      >
        <input
          class="d-none"
          type="email"
          name="email"
          autocomplete="off"
        >

        <AppInput
          id="password"
          v-model="form.password"
          name="password"
          placeholder="Sua senha..."
          :error="form.errors.get('password')"
          type="password"
          autocomplete="new-password"
        >
          Confirme sua senha:
        </AppInput>

        <div class="row mt-4">
          <div class="col">
            <AppButton
              color="success"
              btn-class="fw-bold"
              block
              :loading="isLoading"
            >
              Confirmar
            </AppButton>
          </div>
          <div class="col">
            <AppButton
              color="light"
              block
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
