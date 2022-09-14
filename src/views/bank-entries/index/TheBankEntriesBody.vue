<script>
import { faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons'

export default {
  data () {
    return {
      icons: {
        faHandHoldingUsd
      }
    }
  }
}
</script>

<template>
  <AppCard class="mt-3">
    <template #header>
      <h6 class="fw-bold mb-0">
        <FontAwesomeIcon
          :icon="icons.faHandHoldingUsd"
          fixed-width
        />
        Entradas bancárias
      </h6>
    </template>

    <template #body>
      Algo aqui
    </template>
  </AppCard>
</template>
