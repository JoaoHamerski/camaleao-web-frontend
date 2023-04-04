<script>
import { faFileInvoiceDollar, faSyncAlt } from '@fortawesome/free-solid-svg-icons'

import BankMirrorNavs from '../partials/BankMirrorNavs.vue'

export default {
  components: {
    BankMirrorNavs
  },
  data () {
    return {
      icons: {
        faFileInvoiceDollar,
        faSyncAlt
      }
    }
  },
  methods: {
    onRefreshClick () {
      this.$refs.bankMirrorNavs.refreshEntries()
    }
  }
}
</script>

<template>
  <AppCard>
    <template #header>
      <div class="d-flex align-items-center justify-content-between">
        <h6 class="fw-bold mb-0">
          <FontAwesomeIcon
            :icon="icons.faFileInvoiceDollar"
            fixed-width
          />
          Espelho bancário
        </h6>
        <AppButton
          :icon="icons.faSyncAlt"
          class="text-primary"
          color="light"
          @click.prevent="onRefreshClick"
        />
      </div>
    </template>
    <template #body>
      <BankMirrorNavs ref="bankMirrorNavs" />
    </template>
  </AppCard>
</template>
