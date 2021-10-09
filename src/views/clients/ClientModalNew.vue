<script>
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import ClientForm from './ClientForm'

export default {
  components: {
    ClientForm
  },
  data () {
    return {
      icons: {
        faUserPlus
      }
    }
  }
}
</script>

<template>
  <AppModal
    id="clientModalNew"
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
      <ClientForm />
    </template>
  </AppModal>
</template>
