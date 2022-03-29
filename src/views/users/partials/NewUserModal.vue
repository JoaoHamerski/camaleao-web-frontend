<script>
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'

import NewUserForm from './NewUserForm'

export default {
  components: {
    NewUserForm
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    roles: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      icons: {
        faUserPlus
      }
    }
  },
  methods: {
    onSuccess () {
      this.$emit('success')
    }
  }
}
</script>

<template>
  <AppModal
    id="newUserModal"
    color="success"
    :value="value"
    centered
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faUserPlus"
        fixed-width
      />
      Novo usuário
    </template>
    <template #body>
      <NewUserForm
        :roles="roles"
        @success="onSuccess"
      />
    </template>
  </AppModal>
</template>
