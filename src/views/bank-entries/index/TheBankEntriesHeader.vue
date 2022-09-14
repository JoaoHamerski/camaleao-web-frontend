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
    isValid(file) {
      return file.type.includes('csv')
    },
    onImport(event) {
      if (!event.target.files.length) {
        return
      }

      this.$emit('files-imported', Array.from(event.target.files))
      this.$refs.fileInput.value = ''
    }
  }
}
</script>

<template>
  <div>
    <input
      id="inputImportFile"
      ref="fileInput"
      hidden
      type="file"
      accept=".csv"
      multiple
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
