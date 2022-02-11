<script>
import { faUsers } from '@fortawesome/free-solid-svg-icons'

import TheUsersCardTable from './TheUsersCardTable'
import ChangeUserRoleModal from '../partials/ChangeUserRoleModal'
import DeleteUserModal from '../partials/DeleteUserModal'

export default {
  components: {
    TheUsersCardTable,
    ChangeUserRoleModal,
    DeleteUserModal
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    users: {
      type: Array,
      default: () => ([])
    },
    roles: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      changeUserRole: {
        modal: false,
        user: {}
      },
      deleteUser: {
        modal: false,
        user: {}
      },
      icons: {
        faUsers
      }
    }
  },
  methods: {
    onDeleteUserSuccess () {
      this.$emit('refresh')
      this.deleteUser.modal = false
      this.deleteUser.user = {}
    },
    onDeleteUserModalHidden () {
      this.deleteUser.user = {}
    },
    onChangeUserRoleSuccess () {
      this.$emit('refresh')
      this.changeUserRole.modal = false
      this.changeUserRole.user = {}
    },
    onChangeUserModalHidden () {
      this.changeUserRole.user = {}
    },
    onActionButtonClicked ({ user, action }) {
      if (action === 'change_role') {
        this.changeUserRole.user = user
        this.changeUserRole.modal = true

        return
      }

      if (action === 'delete_user') {
        this.deleteUser.user = user
        this.deleteUser.modal = true
        return
      }

      throw new Error('Nenhuma action foi identificado no evento')
    }
  }
}
</script>

<template>
  <AppCard color="camaleao">
    <template #header>
      <h6 class="fw-bold mb-0">
        <FontAwesomeIcon
          :icon="icons.faUsers"
          fixed-width
        />
        Lista de usuários do sistema
      </h6>
    </template>
    <template #body>
      <ChangeUserRoleModal
        v-model="changeUserRole.modal"
        :user="changeUserRole.user"
        :roles="roles"
        @hidden="onChangeUserModalHidden"
        @success="onChangeUserRoleSuccess"
      />

      <DeleteUserModal
        v-model="deleteUser.modal"
        :user="deleteUser.user"
        @hidden="onDeleteUserModalHidden"
        @success="onDeleteUserSuccess"
      />

      <AppLoading v-show="isLoading" />
      <TheUsersCardTable
        :items="users"
        @action-button-clicked="onActionButtonClicked"
      />
    </template>
  </AppCard>
</template>
