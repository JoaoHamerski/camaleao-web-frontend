<script>
import { faUsers } from '@fortawesome/free-solid-svg-icons'

import TheUsersCardTable from './TheUsersCardTable.vue'
import EditUserModal from '../partials/EditUserModal.vue'
import DeleteUserModal from '../partials/DeleteUserModal.vue'

export default {
  components: {
    TheUsersCardTable,
    EditUserModal,
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
      editUserModal: {
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
      this.deleteUser.modal = false
      this.deleteUser.user = {}
    },
    onDeleteUserModalHidden () {
      this.deleteUser.user = {}
    },
    onEditSuccess () {
      this.editUserModal.modal = false
      this.editUserModal.user = {}
    },
    onEditModalHidden () {
      this.editUserModal.user = {}
    },
    onActionButtonClicked ({ user, action }) {
      if (action === 'edit_user') {
        this.editUserModal.user = user
        this.editUserModal.modal = true

        return
      }

      if (action === 'delete_user') {
        this.deleteUser.user = user
        this.deleteUser.modal = true
        return
      }

      throw new Error('Nenhuma action foi identificada no evento')
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
        Gerenciamento de usuários do sistema
      </h6>
    </template>
    <template #body>
      <EditUserModal
        v-model="editUserModal.modal"
        :user="editUserModal.user"
        :roles="roles"
        @hidden="onEditModalHidden"
        @success="onEditSuccess"
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
