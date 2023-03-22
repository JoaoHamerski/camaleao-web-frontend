<script>
import {
  faFunnelDollar,
  faHandHoldingUsd
} from '@fortawesome/free-solid-svg-icons'

export default {
  data () {
    return {
      icons: {
        faFunnelDollar,
        faHandHoldingUsd
      }
    }
  }
}
</script>

<template>
  <div class="text-start fw-bold">
    <div class="text-success mb-1">
      <FontAwesomeIcon
        :icon="icons.faHandHoldingUsd"
        fixed-width
      />
      Pagamento recebido
    </div>
    <div class="text-danger">
      <FontAwesomeIcon
        :icon="icons.faFunnelDollar"
        fixed-width
      />
      Despesa
    </div>
  </div>
</template>
