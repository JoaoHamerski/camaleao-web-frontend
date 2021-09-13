<script>
import { faList } from '@fortawesome/free-solid-svg-icons'

export default {
  metaInfo: {
    title: 'Clientes'
  },
  data () {
    return {
      faList
    }
  }
}
</script>

<template>
  <AppCard
    color="primary"
    class="mt-5"
  >
    <template #header>
      <h6 class="fw-bold mb-0">
        <FontAwesomeIcon
          :icon="faList"
          fixed-width
          class="me-1"
        />
        Lista de clientes
      </h6>
    </template>

    <template #body>
      <!--  -->
    </template>
  </AppCard>
</template>
