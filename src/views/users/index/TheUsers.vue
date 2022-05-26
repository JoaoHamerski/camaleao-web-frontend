<script>
import { GetUsers } from '@/graphql/User.gql'
import { roles } from '@/graphql/Role.gql'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'

import TheUsersCard from './TheUsersCard.vue'
import NewUserModal from '../partials/NewUserModal.vue'

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
      query: GetUsers
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
      this.newUserModal = false
    },
    onNewUserClick () {
      this.newUserModal = true
    }
  }
}
</script>
<template>
  <div class="py-5">
    <div class="mb-2">
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
    />
  </div>
</template>
