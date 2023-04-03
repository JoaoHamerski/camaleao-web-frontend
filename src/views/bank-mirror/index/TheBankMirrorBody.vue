<script>
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons'

import BankMirrorNavs from '../partials/BankMirrorNavs.vue'

export default {
  components: {
    BankMirrorNavs
  },
  data () {
    return {
      icons: {
        faFileInvoiceDollar
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
          :icon="icons.faFileInvoiceDollar"
          fixed-width
        />
        Espelho bancário
      </h6>
    </template>
    <template #body>
      <BankMirrorNavs />
    </template>
  </AppCard>
</template>
