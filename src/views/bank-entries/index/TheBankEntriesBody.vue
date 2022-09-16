<script>
import { faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons'
import { first, deburr } from 'lodash'
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
      modalEntry: {
        value: false,
        item: {},
        fields: {},
        isExpense: false,
      },
      modalBankSettings: {
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
    handleFile(file) {
      const csv = file.target.result
      const parsed = csvParser.parse(csv, {
        header: true,
        transformHeader: (field) => deburr(field).toLowerCase()
      })
      const bankSettings = this.getBankSettings(parsed.meta.fields)

      if (!bankSettings) {
        this.modalBankSettings.fields = parsed.meta.fields
        this.modalBankSettings.sampleRow = first(parsed.data)
        this.modalBankSettings.value = true
        return
      }

      this.entries.push({
        id: +new Date(),
        file: this.fileToLoad,
        data: parsed.data,
        settings: bankSettings.settings
      })
    },
    onFileLoad(file) {
      const reader = new FileReader()
      this.fileToLoad = file
      reader.onload = this.handleFile
      reader.readAsText(file)
    },
    onFileRemove({file, index}) {
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
      @hidden="onModalEntryHidden"
    />

    <BankSettingsHandleModal
      v-model="modalBankSettings.value"
      :sample-row="modalBankSettings.sampleRow"
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
            @add-entry="onAddEntry"
          />
        </div>
      </template>
    </AppCard>
  </div>
</template>
