<script>
import { faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons'
import { take, deburr, isEmpty } from 'lodash'
import csvParser from 'papaparse'
import { GetBankSettings } from '@/graphql/BankSetting.gql'

import BankEntriesFilesList from '../partials/BankEntriesFilesList.vue'
import BankEntriesTables from '../partials/BankEntriesTables.vue'
import BankSettingsHandleModal from '../partials/BankSettingsHandleModal.vue'
import BankModalEntry from '../partials/BankModalEntry.vue'

export default {
  apollo: {
    bankSettings: {
      query: GetBankSettings,
      update ({ bankSettings }) {
        return bankSettings.map((item) => {
          return {...item, settings: JSON.parse(item.settings)}
        })
      }
    }
  },
  components: {
    BankEntriesFilesList,
    BankEntriesTables,
    BankSettingsHandleModal,
    BankModalEntry
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
      isLoadingFile: false,
      modalEntry: {
        value: false,
        item: {},
        fields: {},
        isExpense: false,
      },
      modalBankSettings: {
        value: false,
        fields: [],
        samples: []
      },
      icons: {
        faHandHoldingUsd
      }
    }
  },
  computed: {
    isBankSettingsLoading () {
      return !!this.$apollo.queries.bankSettings.loading
    }
  },
  methods: {
    fieldsMatch (fields, bankFields) {
      return fields.every(
        (field, index) => bankFields[index] === field
      )
    },
    getBankSettings (fields) {
      return this.bankSettings.find(bank => {
        if (this.fieldsMatch(fields, bank.settings.bank_fields)) {
          return bank
        }
      })
    },
    isFirstPropEmpty(item) {
      return isEmpty(item[Object.keys(item)[0]])
    },
    getFormattedData (data) {
      const filtered = data.filter(item => !this.isFirstPropEmpty(item))

      return filtered.map(item => ({...item, isDuplicated: false}))
    },
    isAlreadyLoaded() {
      return this.entries.some(entry => entry.file.name === this.fileToLoad.name)
    },
    handleFile(file) {
      if (this.isAlreadyLoaded()) {
        this.$toast.warning('Este arquivo já está carregado')
        return
      }

      const csv = file.target.result
      const parsed = csvParser.parse(csv, {
        header: true,
        transformHeader: (field) => deburr(field).toLowerCase()
      })
      const bankSettings = this.getBankSettings(parsed.meta.fields)

      if (!bankSettings) {
        this.modalBankSettings.fields = parsed.meta.fields
        this.modalBankSettings.samples = take(parsed.data, 10)
        this.modalBankSettings.value = true
        return
      }

      const entry = {
        id: +new Date(),
        file: this.fileToLoad,
        data: this.getFormattedData(parsed.data),
        settings: bankSettings.settings
      }

      this.entries.push(entry)
    },
    onFileLoad(file) {
      const reader = new FileReader()
      this.fileToLoad = file
      reader.onload = this.handleFile
      reader.readAsText(file)
    },
    onFileRemove({file, index}) {
      const entryIndex = this.entries.findIndex(entry => {
        return entry.file.name === file.name
      })

      if (entryIndex !== -1) {
        this.entries.splice(entryIndex, 1)
      }

      this.$emit('file-remove', {file, index})
    },
    onAddEntry ({item, fields, isExpense}) {
      Object.assign(
        this.modalEntry,
        {
          item,
          fields,
          isExpense,
          value: true
        }
      )
    },
    onModalEntryHidden () {
      Object.assign(
        this.modalEntry,
        {
          item: {},
          fields: {},
          isExpense: false,
          value: false
        }
      )
    },
    onModalEntrySuccess (item) {
      this.entries.forEach(entry => {
        const index = entry.data.findIndex(
          _item => _item[entry.settings.fields.bank_uid] === item.bank_uid
        )

        if (index !== -1) {
          entry.data.splice(index, 1)
        }
      })
    },
    onBankSettingsSuccess () {
      Object.assign(
        this.modalBankSettings,
        {
          value: false,
          fields: [],
          sampleRow: {}
        }
      )

      this.$apollo.queries.bankSettings.refetch()
    },
    onDuplicatedEntries({id: entryId, duplicates}) {
      const entry = this.entries.find(entry => entry.id === entryId)

      entry.data.forEach(item => {
        if (duplicates.includes(item[entry.settings.fields.bank_uid])) {
          item.isDuplicated = true
        }
      })
    },
    onRemoveDuplicates({id: entryId }) {
      const entry = this.entries.find(entry => entry.id === entryId)

      entry.data.forEach(item => {
        const index = entry.data.findIndex(
          _item => _item.isDuplicated
        )

        if (index !== -1) {
          entry.data.splice(index, 1)
        }
      })
    }
  }
}
</script>

<template>
  <div>
    <BankModalEntry
      v-model="modalEntry.value"
      :item="modalEntry.item"
      :fields="modalEntry.fields"
      :is-expense="modalEntry.isExpense"
      @success="onModalEntrySuccess"
      @hidden="onModalEntryHidden"
    />

    <BankSettingsHandleModal
      v-model="modalBankSettings.value"
      :samples="modalBankSettings.samples"
      :fields="modalBankSettings.fields"
      @success="onBankSettingsSuccess"
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
        <AppLoading v-show="isBankSettingsLoading" />
        <div
          v-if="!fileList.length"
          class="text-secondary text-center py-5"
        >
          Nenhuma entrada inserida
        </div>
        <div v-else>
          <BankEntriesFilesList
            :is-loading="isLoadingFile"
            :file-list="fileList"
            @file-load="onFileLoad"
            @file-remove="onFileRemove"
          />
          <BankEntriesTables
            class="mt-3"
            :entries="entries"
            @add-entry="onAddEntry"
            @duplicated-entries="onDuplicatedEntries"
            @remove-duplicates="onRemoveDuplicates"
          />
        </div>
      </template>
    </AppCard>
  </div>
</template>
