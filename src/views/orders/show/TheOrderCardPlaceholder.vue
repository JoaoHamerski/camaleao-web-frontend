<script>
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons'

export default {
  data () {
    return {
      icons: {
        faBoxOpen
      }
    }
  }
}
</script>

<template>
  <AppCard>
    <template #header>
      <h6 class="fw-bold mb-0">
        <FontAwesomeIcon
          :icon="icons.faBoxOpen"
          class="me-1"
        />Pedido -
      </h6>
    </template>
    <template #body>
      <div class="py-5">
        <AppLoading />
      </div>
    </template>
  </AppCard>
</template>
