<script>
import BankEntriesTable from './BankEntriesTable.vue'

export default {
  components: {
    BankEntriesTable
  },
  props: {
    entries: {
      type: Array,
      required: true
    }
  },
  methods: {
    onRegisterEntry (item) {
      this.$emit('add-entry', item)
    },
    onDuplicatedEntries({id, duplicates}) {
      this.$emit('duplicated-entries', {id, duplicates})
    },
    onRemoveDuplicates({ id }) {
      this.$emit('remove-duplicates', { id })
    }
  }
}
</script>

<template>
  <div>
    <AppContainer
      v-for="(entry, index) in entries"
      :key="index + entry.file.name"
      collapsible
      :value="true"
      class="mb-3"
    >
      <template #title>
        {{ entry.file.name }}
        <span class="badge bg-light text-dark ms-1">
          {{ entry.data.length }}
        </span>
      </template>
      <template #body>
        <BankEntriesTable
          :entry="entry"
          @register-entry="onRegisterEntry"
          @duplicated-entries="onDuplicatedEntries"
          @remove-duplicates="onRemoveDuplicates"
        />
      </template>
    </AppContainer>
  </div>
</template>
