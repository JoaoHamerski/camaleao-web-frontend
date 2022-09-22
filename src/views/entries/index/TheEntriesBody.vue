<script>
import { faListUl } from '@fortawesome/free-solid-svg-icons'
import { isEmpty } from 'lodash-es'

import BankEntriesTable from '../partials/BankEntriesTable.vue'
import BankModalEntry from '../partials/BankModalEntry.vue'

export default {
  components: {
    BankEntriesTable,
    BankModalEntry
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    fileEntry: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      modalEntry: {
        value: false,
        entry: {}
      },
      icons: {
        faListUl
      }
    }
  },
  methods: {
    isEmpty,
    onHideDuplicatesToggle (state) {
      this.$emit('hide-duplicates-toggle', state)
    },
    onAddEntry(entry) {
      this.modalEntry.value = true
      this.modalEntry.entry = {filename: this.fileEntry.filename, ...entry}
    },
    onEntrySuccess(entry) {
      this.$emit('entry-registered', entry)
    }
  }
}
</script>

<template>
  <AppCard>
    <template #header>
      <h6 class="fw-bold mb-0">
        <FontAwesomeIcon
          :icon="icons.faListUl"
          fixed-width
        />
        Entradas carregadas
      </h6>
    </template>

    <template #body>
      <BankModalEntry
        v-model="modalEntry.value"
        :entry="modalEntry.entry"
        @entry-success="onEntrySuccess"
      />

      <AppLoading v-show="isLoading" />

      <div
        v-if="isEmpty(fileEntry)"
        class="text-secondary text-center py-5"
      >
        Carregue um arquivo de entradas bancárias para exibir aqui
      </div>
      <div v-else>
        <BankEntriesTable
          :file-entry="fileEntry"
          @hide-duplicates-toggle="onHideDuplicatesToggle"
          @add-entry="onAddEntry"
        />
      </div>
    </template>
  </AppCard>
</template>
