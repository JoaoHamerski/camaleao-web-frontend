<script>
import { faReceipt } from '@fortawesome/free-solid-svg-icons'

export default {
  data () {
    return {
      icons: {
        faReceipt
      }
    }
  }
}
</script>

<template>
  <AppContainer
    collapsible
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faReceipt"
        fixed-width
      />
      Fluxo detalhado
    </template>

    <template #body>
      Corpo
    </template>
  </AppContainer>
</template>
