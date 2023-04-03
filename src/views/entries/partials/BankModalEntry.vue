<script>
import { isEmpty } from 'lodash-es'

import DailyPaymentModal from '@/views/daily-cash/partials/daily-cash-payment/DailyPaymentModal.vue'
import ModalExpensesNew from '@/views/expenses/index/modals/ModalExpensesNew.vue'

export default {
  components: {
    DailyPaymentModal,
    ModalExpensesNew
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    entry: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      modal: false
    }
  },
  computed: {
    emptyFields () {
      return {
        bank_uid: '',
        value: 'R$ ',
        date: '',
        description: ''
      }
    },
    getAttrs () {
      if (isEmpty(this.entry)) {
        return this.emptyFields
      }

      if (this.isExpense) {
        return {
          expense: {
            filename_entry_from: this.entry.filename,
            bank_uid: this.entry.bank_uid,
            value: Math.abs(this.entry.value),
            date: this.entry.date,
            description: this.entry.description,
            expense_via_id: this.entry.via_id
          }
        }
      }

      return {
        payment: {
          filename_entry_from: this.entry.filename,
          bank_uid: this.entry.bank_uid,
          value: this.entry.value,
          date: this.entry.date,
          note: this.entry.description,
          via_id: this.entry.via_id
        }
      }
    },
    isExpense () {
      return this.entry.value < 0
    },
    getComponent () {
      if (this.isExpense) {
        return ModalExpensesNew
      }

      return DailyPaymentModal
    }
  },
  methods: {
    componentCreated () {
      this.modal = this.value
    },
    onModalHidden () {
      this.modal = false
    },
    onSuccess () {
      this.modal = false
      this.$emit('success', this.entry)
    }
  }
}
</script>

<template>
  <Component
    :is="getComponent"
    v-if="value"
    :value="modal"
    v-bind="getAttrs"
    hide-bank-entries
    v-on="$listeners"
    @hook:created="componentCreated"
    @hidden="onModalHidden"
    @success="onSuccess"
  />
</template>
