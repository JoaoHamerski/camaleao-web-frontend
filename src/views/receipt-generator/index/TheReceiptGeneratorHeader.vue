<script>
import { faPlus, faCog } from '@fortawesome/free-solid-svg-icons'

import ReceiptSettingsModal from '../partials/ReceiptSettingsModal.vue'
import ReceiptCreateModal from '../partials/ReceiptCreateModal.vue'

export default {
  components: {
    ReceiptSettingsModal,
    ReceiptCreateModal
  },
  data () {
    return {
      receiptCreateModal: {
        value: false
      },
      receiptSettingsModal: {
        value: false
      },
      icons: {
        faPlus,
        faCog
      }
    }
  },
  methods: {
    onReceiptSettingsClick () {
      this.receiptSettingsModal.value = true
    },
    onReceiptCreateClick () {
      this.receiptCreateModal.value = true
    },
    onReceiptSuccess () {
      this.receiptCreateModal.value = false
    }
  }
}
</script>

<template>
  <div>
    <ReceiptSettingsModal v-model="receiptSettingsModal.value" />
    <ReceiptCreateModal
      v-model="receiptCreateModal.value"
      @success="onReceiptSuccess"
    />

    <div class="d-flex justify-content-between">
      <AppButton
        :icon="icons.faPlus"
        class="fw-bold"
        color="success"
        @click.prevent="onReceiptCreateClick"
      >
        Novo recibo
      </AppButton>
      <AppButton
        :icon="icons.faCog"
        class="fw-bold"
        @click.prevent="onReceiptSettingsClick"
      >
        Configurações
      </AppButton>
    </div>
  </div>
</template>
