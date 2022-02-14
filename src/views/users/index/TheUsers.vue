<script>
import { users } from '@/graphql/User.gql'
import { roles } from '@/graphql/Role.gql'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'

import TheUsersCard from './TheUsersCard'
import NewUserModal from '../partials/NewUserModal'

export default {
  metaInfo: {
    title () {
      return 'Usuários'
    }
  },
  components: {
    TheUsersCard,
    NewUserModal
  },
  apollo: {
    users: {
      query: users
    },
    roles: {
      query: roles
    }
  },
  data () {
    return {
      users: [],
      roles: [],
      icons: {
        faUserPlus
      },
      newUserModal: false
    }
  },
  computed: {
    isLoading () {
      return !!this.$apollo.queries.users.loading
    }
  },
  methods: {
    onNewUserSuccess () {
      this.refresh()
      this.newUserModal = false
    },
    onNewUserClick () {
      this.newUserModal = true
    },
    refresh () {
      this.$apollo.queries.users.refetch()
    }
  }
}
</script>
<template>
  <div>
    <div class="mt-5 mb-2">
      <AppButton
        :icon="icons.faUserPlus"
        color="success"
        btn-class="fw-bold"
        @click.prevent="onNewUserClick"
      >
        Novo usuário
      </AppButton>
    </div>

    <NewUserModal
      v-model="newUserModal"
      :roles="roles"
      @success="onNewUserSuccess"
    />

    <TheUsersCard
      :users="users"
      :roles="roles"
      :is-loading="isLoading"
      @refresh="refresh"
    />
  </div>
</template>
