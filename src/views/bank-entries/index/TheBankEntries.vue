<script>
import TheBankEntriesHeader from './TheBankEntriesHeader.vue'
import TheBankEntriesBody from './TheBankEntriesBody.vue'
import BankSettingsModal from '../partials/BankSettingsModal.vue'

export default {
  metaInfo: {
    title: 'Entradas bancárias'
  },
  components: {
    TheBankEntriesHeader,
    TheBankEntriesBody,
    BankSettingsModal
  },
  data () {
    return {
      bankSettingsModal: {
        value: false
      },
      fileImported: {}
    }
  },
  methods: {
    onFileImport(file) {
      this.fileImported = file
      this.$refs.bankEntriesBody.loadFile(file)
    },
    onClearFile() {
      this.fileImported = {}
    },
    onOpenBankSettings() {
      this.bankSettingsModal.value = true
    }
  }
}
</script>

<template>
  <div class="pt-2 pb-5">
    <TheBankEntriesHeader
      @file-imported="onFileImport"
      @open-bank-settings="onOpenBankSettings"
    />

    <BankSettingsModal v-model="bankSettingsModal.value" />

    <TheBankEntriesBody
      ref="bankEntriesBody"
      :file-imported="fileImported"
      @clear-file="onClearFile"
    />
  </div>
</template>
