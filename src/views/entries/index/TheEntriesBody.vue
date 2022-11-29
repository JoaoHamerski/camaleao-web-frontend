<script>
import { faListUl } from '@fortawesome/free-solid-svg-icons'
import { isEmpty } from 'lodash-es'

import BankEntries from '../partials/BankEntries.vue'
import BankModalEntry from '../partials/BankModalEntry.vue'
import EntryCancelModal from '../partials/EntryCancelModal.vue'

export default {
  components: {
    BankEntries,
    BankModalEntry,
    EntryCancelModal
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
      entryCancelModal: {
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
    onHideCanceledToggle (state) {
      this.$emit('hide-canceled-toggle', state)
    },
    onAddEntry (entry) {
      this.modalEntry.value = true
      this.modalEntry.entry = {filename: this.fileEntry.filename, ...entry}
    },
    onCancelEntry (entry) {
      this.entryCancelModal.value = true
      this.entryCancelModal.entry = entry
    },
    onCancelEntrySuccess (entry) {
      this.entryCancelModal.value = false
      this.entryCancelModal.entry = {}
      this.$emit('entry-canceled', entry)
    },
    onAddEntrySuccess(entry) {
      this.$emit('entry-registered', entry)
    },
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
        @success="onAddEntrySuccess"
      />

      <EntryCancelModal
        v-model="entryCancelModal.value"
        :entry="entryCancelModal.entry"
        @success="onCancelEntrySuccess"
      />

      <div
        v-if="isEmpty(fileEntry)"
        class="text-secondary text-center py-5"
      >
        Carregue um arquivo de entradas bancárias para exibir aqui
      </div>
      <div v-else>
        <BankEntries
          :file-entry="fileEntry"
          @hide-duplicates-toggle="onHideDuplicatesToggle"
          @hide-canceled-toggle="onHideCanceledToggle"
          @add-entry="onAddEntry"
          @cancel-entry="onCancelEntry"
        />
      </div>
    </template>
  </AppCard>
</template>
