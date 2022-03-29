<script>
import { faUserEdit, faUserCircle } from '@fortawesome/free-solid-svg-icons'

import { isEmpty } from 'lodash-es'
import { handleSuccess } from '@/utils/forms'

import { userChangeRole } from '@/graphql/User.gql'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: () => ({})
    },
    roles: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      selectedRole: '',
      isLoading: false,
      icons: {
        faUserEdit,
        faUserCircle
      }
    }
  },
  methods: {
    isEmpty,
    async onChangeClick () {
      this.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: userChangeRole,
          variables: {
            id: this.user.id,
            new_role_id: +this.selectedRole
          }
        })

        handleSuccess(this, { message: 'Privilégio alterado!' })
      } catch (error) {
        this.$toast.error('Ops! Algo deu errrado, tente novamente!')
      }

      this.isLoading = false
    },
    onModalShow () {
      try {
        this.selectedRole = this.user.role.id
      } catch (error) {
        this.$toast.error('Ops! Algo deu errado, tente novamente!')
      }
    }
  }
}
</script>

<template>
  <AppModal
    id="changeUserRoleModal"
    :value="value"
    centered
    v-on="$listeners"
    @show="onModalShow"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faUserEdit"
        fixed-width
      />
      Alterar privilégio de usuário
    </template>
    <template #body>
      <div v-if="!isEmpty(user)">
        <div class="text-center text-primary mb-3">
          <FontAwesomeIcon
            :icon="icons.faUserCircle"
            size="4x"
          />
        </div>
        <h5 class="text-center fw-bold mb-2">
          {{ user.name }}
        </h5>
        <div class="text-center">
          <small>{{ user.email }}</small>
        </div>

        <hr>

        <label class="form-label fw-bold">Selecione o privilégio: </label>
        <div class="ms-2">
          <AppRadio
            v-model="selectedRole"
            :options="roles"
            name="selectedRole"
            label-prop="name"
            value-prop="id"
            align="vertical"
          />
        </div>

        <AppButton
          class="mt-4"
          btn-class="fw-bold"
          color="success"
          block
          :loading="isLoading"
          @click.prevent="onChangeClick"
        >
          ALTERAR
        </AppButton>
      </div>
    </template>
  </AppModal>
</template>
