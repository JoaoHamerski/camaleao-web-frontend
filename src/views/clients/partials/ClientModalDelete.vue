<script>
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { DeleteClient } from '@/graphql/Client.gql'
import { handleSuccess, handleError } from '@/utils/forms'
import Form from '@/utils/Form'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    client: {
      type: Object,
      default: null
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
    async destroy () {
      this.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: DeleteClient,
          variables: {
            id: this.client.id,
            password: this.form.password
          }
        })

        handleSuccess(this, {message: 'Cliente deletado!'})
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
    id="clientModalDelete"
    :value="value"
    color="danger"
    v-on="$listeners"
  >
    <template
      #title
    >
      <FontAwesomeIcon
        :icon="icons.faTrashAlt"
        fixed-width
      />
      Deletar cliente
    </template>
    <template #body>
      <div v-if="client">
        <div class="text-center">
          <FontAwesomeIcon
            :icon="icons.faTrashAlt"
            class="text-danger"
            size="4x"
          />
        </div>
        <div class="text-center mt-2">
          Você está deletando o cliente:
        </div>
        <div class="text-center fw-bold">
          {{ client.name }}
        </div>
        <div class="text-warning fw-bold small my-3">
          Isso deletará todos os pedidos e pagamentos do cliente.
        </div>

        <AppForm
          :form="form"
          :on-submit="destroy"
        >
          <AppInput
            id="passowrd"
            v-model="form.password"
            name="password"
            type="password"
            :error="form.errors.get('password')"
          >
            Digite sua senha para continuar:
          </AppInput>

          <div class="row">
            <div class="col">
              <AppButton
                block
                color="success"
                btn-class="fw-bold"
                :loading="isLoading"
              >
                Confirmar
              </AppButton>
            </div>
            <div class="col">
              <AppButton
                :disabled="isLoading"
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
      </div>
    </template>
  </AppModal>
</template>
