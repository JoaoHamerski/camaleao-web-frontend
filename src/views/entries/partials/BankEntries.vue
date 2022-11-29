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
    },
    onHideDuplicates (value) {
      this.$emit('hide-duplicates-toggle', value)
    },
    onHideCanceled (value) {
      this.$emit('hide-canceled-toggle', value)
    }
  }
}
</script>

<template>
  <div>
    <BankEntriesHeader
      :file-entry="fileEntry"
      @hide-duplicates="onHideDuplicates"
      @hide-canceled="onHideCanceled"
    />

    <BankEntriesTable
      :file-entry="fileEntry"
      @add-entry="onAddEntry"
      @cancel-entry="onCancelEntry"
    />
  </div>
</template>
