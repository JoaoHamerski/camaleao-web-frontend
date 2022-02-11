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
        { text: 'Nível de usuário', value: 'role' },
        { text: 'Alterar nível', value: 'change_role', align: 'center' },
        { text: 'Deletar', value: 'delete', align: 'center' }
      ]
    }
  },
  methods: {
    onChangeUserRoleClick (user) {
      this.$emit('action-button-clicked', { user, action: 'change_role' })
    },
    onDeleteUserClick (user) {
      this.$emit('action-button-clicked', { user, action: 'delete_user' })
    }
  }
}
</script>

<template>
  <AppTable
    :headers="headers"
    :items="items"
  >
    <template #[`items.role`]="{ item }">
      {{ item.role.name }}
    </template>

    <template #[`items.change_role`]="{ item }">
      <AppButton
        :disabled="+item.id === +authUser.id"
        btn-class="btn-sm"
        :icon="icons.faUserEdit"
        outlined
        @click.prevent="onChangeUserRoleClick(item)"
      />
    </template>

    <template #[`items.delete`]="{ item }">
      <AppButton
        :disabled="+item.id === +authUser.id"
        btn-class="btn-sm"
        color="danger"
        :icon="icons.faTrashAlt"
        outlined
        @click.prevent="onDeleteUserClick(item)"
      />
    </template>
  </AppTable>
</template>
