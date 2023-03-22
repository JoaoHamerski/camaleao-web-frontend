<script>
import { isEmpty } from 'lodash-es'

const EntryDetailsPayment = () => import('./EntryDetailsPayment.vue')
const EntryDetailsExpense = () => import('./EntryDetailsExpense.vue')

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    entry: {
      type: Object,
      default: null
    }
  },
  computed: {
    modalColor () {
      if (this.entry) {
        return this.entry.is_expense ? 'danger' : 'success'
      }

      return ''
    },
    getEntryComponent () {
      if (!this.entry) {
        return
      }

      if (this.entry.is_expense) {
        return EntryDetailsExpense
      }

      return EntryDetailsPayment
    },
    getEntryBinds () {
      if (!this.entry) {
        return
      }

      if (this.entry.is_expense) {
        return {
          expense: this.entry
        }
      }

      return {
        payment: this.entry
      }
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
      <Component
        :is="getEntryComponent"
        v-if="entry"
        v-bind="getEntryBinds"
      />
    </template>
  </AppModal>
</template>
