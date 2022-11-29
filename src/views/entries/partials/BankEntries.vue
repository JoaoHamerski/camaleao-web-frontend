<script>
import BankEntriesHeader from './BankEntriesHeader.vue'
import BankEntriesTable from './BankEntriesTable.vue'

export default {
  components: {
    BankEntriesHeader,
    BankEntriesTable
  },
  props: {
    fileEntry: {
      type: Object,
      required: true
    }
  },
  methods: {
    onAddEntry(item) {
      this.$emit('add-entry', item)
    },
    onCancelEntry (item) {
      this.$emit('cancel-entry', item)
    }
  }
}
</script>

<template>
  <div>
    <BankEntriesHeader :file-entry="fileEntry" />

    <BankEntriesTable
      :file-entry="fileEntry"
      @add-entry="onAddEntry"
      @cancel-entry="onCancelEntry"
    />
  </div>
</template>
