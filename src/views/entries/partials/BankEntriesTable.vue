<script>
import { formatCurrencyBRL } from '@/utils/formatters'

import BankEntriesTableActionBtn from './BankEntriesTableActionBtn.vue'

export default {
  components: {
    BankEntriesTableActionBtn
  },
  props: {
    fileEntry: {
      type: Object,
      required: true
    }
  },
  computed: {
    entries () {
      return this.fileEntry.entries
    },
    headers () {
      return [
        { value: 'action', text: '' },
        { value: 'value', text: 'Valor' },
        { value: 'date', text: 'Data' },
        { value: 'description', text: 'Descrição', wrap: true }
      ]
    }
  },
  methods: {
    formatCurrencyBRL,
    onAddEntry (item) {
      this.$emit('add-entry', item)
    },
    onCancelEntry (item) {
      this.$emit('cancel-entry', item)
    },
    isItemDisabled (item) {
      return item.isDuplicated || item.isCanceled
    },
    getItemColor (item) {
      if (this.isItemDisabled(item)) {
        return 'secondary'
      }

      return item.value > 0 ? 'success' : 'danger'
    },
    tableRowClass (item) {
      const itemColor = this.getItemColor(item)
      const classes = []

      if (item.isCanceled) {
        classes.push('text-decoration-line-through')
      }

      classes.push(`table-${itemColor}`)

      return classes
    }
  }
}
</script>

<template>
  <AppTable
    :row-class="tableRowClass"
    :headers="headers"
    :items="entries"
  >
    <template #[`items.action`]="{ item }">
      <BankEntriesTableActionBtn
        :item="item"
        :disabled="isItemDisabled(item)"
        :color="getItemColor(item)"
        @add-entry="onAddEntry"
        @cancel-entry="onCancelEntry"
      />
    </template>
    <template #[`items.value`]="{ item }">
      <b :class="`text-${getItemColor(item)}`">{{ formatCurrencyBRL(item.value) }}</b>
    </template>
    <template #[`items.date`]="{ item }">
      <span :class="isItemDisabled(item) && 'text-secondary'">{{ item.date }}</span>
    </template>
    <template #[`items.description`]="{ item }">
      <span :class="isItemDisabled(item) && 'text-secondary'">{{ item.description || 'N/A' }}</span>
    </template>
  </AppTable>
</template>
