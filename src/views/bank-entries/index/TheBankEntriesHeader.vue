<script>
import { faFileImport, faCog } from '@fortawesome/free-solid-svg-icons'

export default {
  data () {
    return {
      icons: {
        faFileImport,
        faCog
      }
    }
  },
  methods: {
    onImport(event) {
      if (!event.target.files.length) {
        return
      }

      this.$emit('file-imported', event.target.files[0])
      this.$refs.fileInput.value = ''
    },
    openBankSettingsClick() {
      this.$emit('open-bank-settings')
    }
  }
}
</script>

<template>
  <div class="d-flex justify-content-between">
    <input
      id="inputImportFile"
      ref="fileInput"
      hidden
      type="file"
      accept=".csv"
      @change="onImport"
    >

    <label
      for="inputImportFile"
      class="btn btn-primary btn-lg fw-bold me-2"
    >
      <FontAwesomeIcon :icon="icons.faFileImport" />
      Importar
    </label>

    <AppButton
      outlined
      :icon="icons.faCog"
      @click.prevent="openBankSettingsClick"
    >
      Configurações
    </AppButton>
  </div>
</template>
