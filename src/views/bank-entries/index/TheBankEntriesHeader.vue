<script>
import { faPlus, faFileImport } from '@fortawesome/free-solid-svg-icons'

export default {
  data () {
    return {
      icons: {
        faPlus,
        faFileImport
      }
    }
  },
  methods: {
    handleFileLoad(event) {
      console.log(event.target.result)
    },
    onImport(event) {
      const reader = new FileReader()
      reader.onload = this.handleFileLoad
      reader.readAsText(event.target.files[0])
    }
  }
}
</script>

<template>
  <div>
    <input
      id="inputImportFile"
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
      class="me-2"
      btn-class="btn-lg fw-bold"
      color="success"
      :icon="icons.faPlus"
    >
      Entrada
    </AppButton>
    <AppButton
      btn-class="btn-lg fw-bold"
      color="danger"
      :icon="icons.faPlus"
    >
      Saída
    </AppButton>
  </div>
</template>
