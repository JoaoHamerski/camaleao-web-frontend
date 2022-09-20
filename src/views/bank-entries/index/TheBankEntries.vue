<script>
import TheBankEntriesHeader from './TheBankEntriesHeader.vue'
import TheBankEntriesBody from './TheBankEntriesBody.vue'

export default {
  metaInfo: {
    title: 'Entradas bancárias'
  },
  components: {
    TheBankEntriesHeader,
    TheBankEntriesBody
  },
  data () {
    return {
      fileList: []
    }
  },
  methods: {
    showDuplicatedFileWarning(filesImportedLength, duplicatesLength) {
      if (filesImportedLength === 1) {
        this.$toast.warning('Arquivo já carregado')
        return
      }

      if (duplicatesLength > 1 && filesImportedLength === duplicatesLength) {
        this.$toast.warning('Os arquivos selecionados já foram importados')
        return
      }

      this.$toast.warning('Alguns arquivos selecionados já foram importados')
    },
    onFilesImport(files) {
      const filesImportedName = this.fileList.map(file => file.name)
      const duplicatedFiles = []

      files.forEach(file => {
        if (filesImportedName.includes(file.name)) {
          duplicatedFiles.push(file.name)
          return
        }

        this.fileList.push(file)
      })

      if (duplicatedFiles.length) {
        this.showDuplicatedFileWarning(files.length, duplicatedFiles.length)
      }
    },
    onFileRemove({index}) {
      this.fileList.splice(index, 1)
    },
    openModalEntry(entryType) {
      if (entryType === 'payment') {
        this.$refs.entriesBody.modalEntry.isExpense = false
      } else {
        this.$refs.entriesBody.modalEntry.isExpense = true
      }

      this.$refs.entriesBody.modalEntry.value = true
    }
  }
}
</script>

<template>
  <div class="pt-2 pb-5">
    <TheBankEntriesHeader
      @files-imported="onFilesImport"
      @open-payment-modal="openModalEntry('payment')"
      @open-expense-modal="openModalEntry('expense')"
    />
    <TheBankEntriesBody
      ref="entriesBody"
      :file-list="fileList"
      @file-remove="onFileRemove"
    />
  </div>
</template>
