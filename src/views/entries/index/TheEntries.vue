<script>
import { LoadBankEntry } from '@/graphql/BankEntry.gql'

import TheEntriesList from './TheEntriesList.vue'
import TheEntriesBody from './TheEntriesBody.vue'
import EntriesMonthlyBalance from '../partials/EntriesMonthlyBalance.vue'

export default {
  metaInfo: {
    title: 'Entradas financeiras'
  },
  components: {
    TheEntriesList,
    TheEntriesBody,
    EntriesMonthlyBalance
  },
  data () {
    return {
      entry: {},
      isLoading: false,
    }
  },
  methods: {
    findEntry (entry) {
      return this
        .entry
        .entries
        .find(
          (item) => item.bank_uid === entry.bank_uid
        )
    },
    onEntryRegistered(_entry) {
      const entry = this.findEntry(_entry)

      entry.isDuplicated = true
    },
    onEntryCanceled (_entry) {
      const entry = this.findEntry(_entry)

      entry.isCanceled = true
    },
    onHideDuplicatesToggle(state) {
      this.entry.entries.forEach(entry => {
        if (entry.isDuplicated) {
          entry.display = state
        }
      })
    },
    onHideCanceledToggle (state) {
      this.entry.entries.forEach(entry => {
        if (entry.isCanceled) {
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
        const formattedEntries = Object.entries(parsedData)
          .map(
            ([, obj]) => ({...obj})
          )

        console.log(formattedEntries)
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

    <EntriesMonthlyBalance class="mt-3" />

    <TheEntriesBody
      class="mt-3"
      :file-entry="entry"
      :is-loading="isLoading"
      @hide-duplicates-toggle="onHideDuplicatesToggle"
      @hide-canceled-toggle="onHideCanceledToggle"
      @entry-registered="onEntryRegistered"
      @entry-canceled="onEntryCanceled"
    />
  </div>
</template>
