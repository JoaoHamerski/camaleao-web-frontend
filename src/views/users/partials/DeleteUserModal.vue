<script>
import { userDelete } from '@/graphql/User.gql'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { formatDatetime } from '@/utils/formatters'
import { isEmpty } from 'lodash-es'
import Form from '@/utils/Form'
import { handleSuccess, handleError } from '@/utils/forms'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      form: new Form({
        auth_password: ''
      }),
      icons: {
        faTrashAlt
      },
      isLoading: false
    }
  },
  methods: {
    isEmpty,
    formatDatetime,
    async onDeleteClick () {
      this.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: userDelete,
          variables: {
            id: this.user.id,
            auth_password: this.form.auth_password
          }
        })

        this.$helpers.clearCacheFrom({ fieldName: 'users' })

        handleSuccess(this, { message: 'Usuário deletado!', resetForm: true })
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
    id="deleteUserModal"
    :value="value"
    color="danger"
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faTrashAlt"
        fixed-width
      />
      Deletar usuário
    </template>
    <template
      v-if="!isEmpty(user)"
      #body
    >
      <div class="text-center">
        <FontAwesomeIcon
          :icon="icons.faTrashAlt"
          class="text-danger"
          size="4x"
        />
      </div>

      <div class="text-danger text-center mt-3 fw-bold">
        Você está deletando o seguinte usuário:
      </div>

      <h5 class="text-center fw-bold mt-3">
        {{ user.name }}
      </h5>

      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <b>Email:</b>
          {{ user.email }}
        </li>
        <li class="list-group-item">
          <b>Privilégio:</b>
          {{ user.role.name }}
        </li>
        <li class="list-group-item">
          <b>Criado em:</b>
          {{ formatDatetime(user.created_at) }}
        </li>
      </ul>

      <div class="text-secondary small mt-3">
        A exclusão deste usuário não afeta nenhum dado no sistema.
      </div>

      <div class="mt-3">
        <AppForm
          :form="form"
          :on-submit="onDeleteClick"
        >
          <input
            type="text"
            hidden
            name="email"
            autocomplete="new-email"
          >

          <AppInput
            v-model="form.auth_password"
            type="password"
            name="auth_password"
            autocomplete="new-password"
            :error="form.errors.get('auth_password')"
          >
            Digite sua senha para confirmar:
          </AppInput>
        </AppForm>
      </div>

      <div class="mt-4">
        <AppButton
          btn-class="fw-bold"
          color="success"
          block
          :loading="isLoading"
          @click.prevent="onDeleteClick"
        >
          Confirmar
        </AppButton>
      </div>
    </template>
  </AppModal>
</template>
