<script>
import { faUserEdit, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import EditUserForm from './EditUserForm.vue'


export default {
  components: {
    EditUserForm
  },
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
      icons: {
        faUserEdit,
        faUserCircle
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
    id="changeUserRoleModal"
    :value="value"
    centered
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faUserEdit"
        fixed-width
      />
      Editar dados do usuário
    </template>
    <template #body>
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

      <EditUserForm
        v-if="value"
        :roles="roles"
        :user="user"
        @success="onSuccess"
      />
    </template>
  </AppModal>
</template>
