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
    isPayment () {
      return 'order' in this.entry
    },
    modalColor () {
      return this.isPayment ? 'success' : 'danger'
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
        <EntryDetailsPayment
          v-if="isPayment"
          :payment="entry"
        />
        <EntryDetailsExpense
          v-else
          :expense="entry"
        />
      </div>
    </template>
  </AppModal>
</template>
