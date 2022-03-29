<script>
import { isEmpty } from 'lodash-es'

import EntryDetailsPayment from './EntryDetailsPayment'
import EntryDetailsExpense from './EntryDetailsExpense'

export default {
  components: {
    EntryDetailsPayment,
    EntryDetailsExpense
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    entry: {
      type: Object,
      required: true
    }
  },
  computed: {
    modalColor () {
      return this.is_expense ? 'danger' : 'success'
    }
  },
  methods: {
    isEmpty
  }
}
</script>
<template>
  <AppModal
    id="modalEntryDetails"
    :color="modalColor"
    :value="value"
    v-on="$listeners"
  >
    <template #title>
      Informações da entrada
    </template>

    <template #body>
      <div v-if="!isEmpty(entry)">
        <EntryDetailsExpense
          v-if="entry.is_expense"
          :expense="entry"
        />
        <EntryDetailsPayment
          v-else
          :payment="entry"
        />
      </div>
    </template>
  </AppModal>
</template>
