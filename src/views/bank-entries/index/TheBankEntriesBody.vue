<script>
import { faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons'
import { first, deburr } from 'lodash'
import csvParser from 'papaparse'
import { GetBankSettings } from '@/graphql/BankSetting.gql'

import BankEntriesFilesList from '../partials/BankEntriesFilesList.vue'
import BankEntriesTables from '../partials/BankEntriesTables.vue'
import BankSettingsHandleModal from '../partials/BankSettingsHandleModal.vue'

export default {
  apollo: {
    bankSettings: {
      query: GetBankSettings
    }
  },
  components: {
    BankEntriesFilesList,
    BankEntriesTables,
    BankSettingsHandleModal,
  },
  props: {
    fileList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      fileToLoad: null,
      entries: [],
      bankSettings: [],
      bankSettingsModal: {
        value: false,
        fields: [],
        sampleRow: {}
      },
      icons: {
        faHandHoldingUsd
      }
    }
  },
  methods: {
    hasBankSettings(fields) {
      if (!this.bankSettings.length) {
        return false
      }

      // More...
    },
    handleFile(file) {
      const csv = file.target.result
      const parsed = csvParser.parse(csv, {
        header: true,
        transformHeader: (field) => deburr(field).toLowerCase()
      })

      console.log(parsed.data)
      if (!this.hasBankSettings(parsed.meta.fields)) {
        this.bankSettingsModal.fields = parsed.meta.fields
        this.bankSettingsModal.sampleRow = first(parsed.data)
        this.bankSettingsModal.value = true
        return
      }

      // this.entries.push({
      //   id: +new Date(),
      //   file: this.fileToLoad,
      //   data: parsed.data,
      //   fields: parsed.meta.fields
      // })
    },
    onFileLoad(file) {
      const reader = new FileReader()
      this.fileToLoad = file
      reader.onload = this.handleFile
      reader.readAsText(file)
    },
    onFileRemove({file, index}) {
      this.$emit('file-remove', {file, index})
    }
  }
}
</script>

<template>
  <div>
    <BankSettingsHandleModal
      v-model="bankSettingsModal.value"
      :sample-row="bankSettingsModal.sampleRow"
      :fields="bankSettingsModal.fields"
    />

    <AppCard class="mt-3">
      <template #header>
        <h6 class="fw-bold mb-0">
          <FontAwesomeIcon
            :icon="icons.faHandHoldingUsd"
            fixed-width
          />
          Entradas bancárias
        </h6>
      </template>
      <template #body>
        <div
          v-if="!fileList.length"
          class="text-secondary text-center py-5"
        >
          Nenhuma entrada inserida
        </div>
        <div v-else>
          <BankEntriesFilesList
            :file-list="fileList"
            @file-load="onFileLoad"
            @file-remove="onFileRemove"
          />
          <BankEntriesTables
            class="mt-3"
            :entries="entries"
          />
        </div>
      </template>
    </AppCard>
  </div>
</template>
