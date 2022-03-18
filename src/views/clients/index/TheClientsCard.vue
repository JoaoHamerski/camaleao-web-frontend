<script>
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import TheClientsCardTable from './TheClientsCardTable'

export default {
  components: {
    TheClientsCardTable
  },
  props: {
    clients: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      icons: {
        faUsers
      }
    }
  }
}
</script>

<template>
  <AppCard
    :is-loading="isLoading"
    :has-body-padding="false"
    color="primary"
    class="mt-2"
  >
    <template #header>
      <h6 class="fw-bold mb-0">
        <FontAwesomeIcon
          :icon="icons.faUsers"
          fixed-width
          class="me-1"
        />
        Clientes
      </h6>
    </template>

    <template #body>
      <TheClientsCardTable :items="clients" />
    </template>
  </AppCard>
</template>
