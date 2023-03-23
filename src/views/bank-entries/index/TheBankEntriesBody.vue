<script>
import { faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons'
import { take, deburr, isEmpty } from 'lodash-es'
import csvParser from 'papaparse'
import { GetBankSettings } from '@/graphql/BankSetting.gql'
import { DateTime } from 'luxon'

import BankEntryTable from '../partials/BankEntryTable.vue'
import BankSettingsFormModal from '../partials/BankSettingsFormModal.vue'
import BankEntryUploadModal from '../partials/BankEntryUploadModal.vue'

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
    BankEntryTable,
    BankSettingsFormModal,
    BankEntryUploadModal
  },
  props: {
    fileImported: undefined
  },
  data () {
    return {
      entry: {},
      bankSettings: [],
      uploadEntryModal: {
        value: false,
        entry: {}
      },
      modalBankSettings: {
        value: false,
        fields: [],
        samples: []
      },
      icons: {
        faHandHoldingUsd,
      }
    }
  },
  computed: {
    isBankSettingsLoading () {
      return !!this.$apollo.queries.bankSettings.loading
    }
  },
  methods: {
    isEmpty,
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
    getDateFormatted(date, dateFormat) {
      const format = dateFormat.replace('mm', 'MM')
      const possibleDates = [
        DateTime.fromFormat(date, format),
        DateTime.fromFormat(date, `${format} hh:mm`),
        DateTime.fromFormat(date, `${format} hh:mm:ss`),
      ]

      return possibleDates.find(
        (dateTime) => dateTime.isValid
      ).toFormat('dd/MM/yyyy')
    },
    getFormattedData (data, settings) {
      const { fields } = settings
      const filtered = data.filter(item => !this.isFirstPropEmpty(item))
      const additionalOptions = {
        isDuplicated: false,
        isVisible: true,
        display: true,
      }

      return filtered.map(item => ({
        bank_uid: item[fields.bank_uid],
        date: this.getDateFormatted(item[fields.date], settings.date_format),
        description: item[fields.description],
        value: item[fields.value],
        via_id: settings.via_id,
        ...additionalOptions
      }))
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
        this.modalBankSettings.samples = take(parsed.data, 10)
        this.modalBankSettings.value = true
        return
      }

      this.entry = {
        id: +new Date(),
        file: this.fileImported,
        data: this.getFormattedData(parsed.data, bankSettings.settings),
        settings: bankSettings.settings
      }
    },
    loadFile(file) {
      const reader = new FileReader()
      reader.onload = this.handleFile
      reader.readAsText(file)
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
    onDuplicatedEntries(duplicates) {
      this.entry.data.forEach(item => {
        if (duplicates.includes(item.bank_uid)) {
          item.isDuplicated = true
        }
      })
    },
    onRemoveDuplicates() {
      this.entry.data.forEach(() => {
        const index = this.entry.data.findIndex(
          _item => _item.isDuplicated
        )

        if (index !== -1) {
          this.entry.data.splice(index, 1)
        }
      })
    },
    onUploadFileClick() {
      this.uploadEntryModal.value = true
      this.uploadEntryModal.entry = this.entry
    },
    onSuccessUploadEntry() {
      this.uploadEntryModal.value = false
      this.uploadEntryModal.entry = {}

      this.onClearFile()
    },
    onClearFile () {
      this.entry = {}
      this.$emit('clear-file')
    }
  }
}
</script>

<template>
  <div>
    <BankSettingsFormModal
      v-model="modalBankSettings.value"
      :samples="modalBankSettings.samples"
      :fields="modalBankSettings.fields"
      @success="onBankSettingsSuccess"
    />

    <BankEntryUploadModal
      v-model="uploadEntryModal.value"
      :entry="uploadEntryModal.entry"
      @success="onSuccessUploadEntry"
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
          v-if="isEmpty(entry)"
          class="text-secondary text-center py-5"
        >
          Nenhum arquivo carregado
        </div>
        <div v-else>
          <div class="d-flex justify-content-between mb-2">
            <AppButton
              :icon="icons.faUpload"
              btn-class="fw-bold"
              @click.prevent="onUploadFileClick"
            >
              Enviar arquivo
            </AppButton>
          </div>
          <BankEntryTable
            class="mt-3"
            :entry="entry"
            @duplicated-entries="onDuplicatedEntries"
            @remove-duplicates="onRemoveDuplicates"
          />
        </div>
      </template>
    </AppCard>
  </div>
</template>
