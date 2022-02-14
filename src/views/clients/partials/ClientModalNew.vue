<script>
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import ClientForm from '../partials/ClientForm'

export default {
  components: {
    ClientForm
  },
  data () {
    return {
      modal: false,
      icons: {
        faUserPlus
      }
    }
  },
  methods: {
    onSuccess () {
      this.modal = false
      this.$emit('refresh')
    }
  }
}
</script>

<template>
  <div>
    <AppModal
      id="clientModalNew"
      v-model="modal"
      color="success"
      centered
    >
      <template #title>
        <FontAwesomeIcon
          :icon="icons.faUserPlus"
          class="me-1"
          fixed-width
        />Novo cliente
      </template>
      <template #body>
        <ClientForm
          @success="onSuccess"
        />
      </template>
    </AppModal>
  </div>
</template>
