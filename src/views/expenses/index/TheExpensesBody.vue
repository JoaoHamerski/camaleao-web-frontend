<script>
import { faFunnelDollar } from '@fortawesome/free-solid-svg-icons'

export default {
  data () {
    return {
      icons: {
        faFunnelDollar
      }
    }
  }
}
</script>

<template>
  <AppCard color="primary">
    <template #header>
      <h6 class="fw-bold mb-0">
        <FontAwesomeIcon
          :icon="icons.faFunnelDollar"
          fixed-width
        />
        Despesas
      </h6>
    </template>

    <template #body />
  </AppCard>
</template>
