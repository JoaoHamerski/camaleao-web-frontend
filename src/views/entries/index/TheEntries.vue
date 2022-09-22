<script>
import { LoadBankEntry } from '@/graphql/BankEntry.gql'

import TheEntriesList from './TheEntriesList.vue'
import TheEntriesBody from './TheEntriesBody.vue'

export default {
  metaInfo: {
    title: 'Entradas financeiras'
  },
  components: {
    TheEntriesList,
    TheEntriesBody
  },
  data () {
    return {
      entry: {},
      isLoading: false,
    }
  },
  methods: {
    onEntryRegistered(_entry) {
      const entry = this.entry.entries.find((item) => item.bank_uid === _entry.bank_uid)
      entry.isDuplicated = true
    },
    onHideDuplicatesToggle(state) {
      this.entry.entries.forEach(entry => {
        if (entry.isDuplicated) {
          entry.display = state
        }
      })
    },
    async onLoadEntry (entry) {
      this.isLoading = true

      try {
        const { data: { bankEntryLoad: entries } } = await this.$apollo.query({
          query: LoadBankEntry,
          variables: {
            id: entry.id
          },
          fetchPolicy: this.entry.filename === entry.filename
            ? 'network-only'
            : 'cache-first'
        })

        const parsedData = JSON.parse(entries)
        const formattedEntries = Object.entries(parsedData).map(([prop, obj]) => ({...obj}))

        this.entry = {
          entries: formattedEntries,
          filename: entry.filename,
          created_at: entry.created_at
        }
      } catch (error) {
        this.$toast.error('Ops! Algo deu errado.')
      }

      this.isLoading = false
    }
  }
}
</script>

<template>
  <div class="pt-3 pb-5">
    <TheEntriesList
      :entry="entry"
      :is-loading="isLoading"
      @load-entry="onLoadEntry"
    />
    <TheEntriesBody
      class="mt-3"
      :file-entry="entry"
      :is-loading="isLoading"
      @hide-duplicates-toggle="onHideDuplicatesToggle"
      @entry-registered="onEntryRegistered"
    />
  </div>
</template>
