<script>
import { faUserEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export default {
  props: {
    items: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      icons: {
        faUserEdit,
        faTrashAlt
      }
    }
  },
  computed: {
    authUser () {
      return this.$store.getters['auth/authUser']
    },
    headers () {
      return [
        { text: 'Nome', value: 'name' },
        { text: 'E-mail', value: 'email' },
        { text: 'Nível de usuário', value: 'role.name' },
        { text: 'Editar', value: 'change_role', align: 'center' },
        { text: 'Deletar', value: 'delete', align: 'center' }
      ]
    },
    cantEditOwnAccountMessage () {
      return 'Use o menu Minha conta para alterar os próprios dados'
    },
    cantDeleteOwnAccountMessage () {
      return 'Use o menu Minha conta para deletar a própria conta'
    }
  },
  methods: {
    onEditUserClick (user) {
      this.$emit('action-button-clicked', { user, action: 'edit_user' })
    },
    onDeleteUserClick (user) {
      this.$emit('action-button-clicked', { user, action: 'delete_user' })
    },
    isAuthUser (user) {
      return user.id === this.authUser.id
    }
  }
}
</script>

<template>
  <AppTable
    :headers="headers"
    :items="items"
  >
    <template #[`items.change_role`]="{ item }">
      <AppButton
        :disabled-message="isAuthUser(item) && cantEditOwnAccountMessage"
        btn-class="btn-sm"
        :icon="icons.faUserEdit"
        outlined
        @click.prevent="onEditUserClick(item)"
      />
    </template>

    <template #[`items.delete`]="{ item }">
      <AppButton
        :disabled-message="isAuthUser(item) && cantDeleteOwnAccountMessage"
        btn-class="btn-sm"
        color="danger"
        :icon="icons.faTrashAlt"
        outlined
        @click.prevent="onDeleteUserClick(item)"
      />
    </template>
  </AppTable>
</template>
