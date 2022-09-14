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
    onFilesImport(files) {
      this.fileList.push(...files)
    },
    onFileRemove({index}) {
      this.fileList.splice(index, 1)
    }
  }
}
</script>

<template>
  <div class="pt-2 pb-5">
    <TheBankEntriesHeader @files-imported="onFilesImport" />
    <TheBankEntriesBody
      :file-list="fileList"
      @file-remove="onFileRemove"
    />
  </div>
</template>
