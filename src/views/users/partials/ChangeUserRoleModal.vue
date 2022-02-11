<script>
import { userChangeRole } from '@/graphql/User.gql'

import { isEmpty } from 'lodash-es'

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
      isLoading: false
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

        this.$emit('success')
        this.$toast.success('Privilégio alterado!')
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
    v-on="$listeners"
    @show="onModalShow"
  >
    <template #title>
      Alterar privilégio de usuário
    </template>
    <template #body>
      <div v-if="!isEmpty(user)">
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
