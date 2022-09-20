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
    item: {
      type: Object,
      required: true
    },
    fields: {
      type: Object,
      required: true
    },
    isExpense: {
      type: Boolean,
      default: false
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
      if (isEmpty(this.item)) {
        return this.emptyFields
      }

      if (this.isExpense) {
        return {
          expense: {
            bank_uid: this.item[this.fields.bank_uid],
            value: Math.abs(this.item[this.fields.value]),
            date: this.item[this.fields.date],
            description: this.item[this.fields.description]
          }
        }
      }

      return {
        payment: {
          bank_uid: this.item[this.fields.bank_uid],
          value: this.item[this.fields.value],
          date: this.item[this.fields.date],
          note: this.item[this.fields.description]
        }
      }
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
    v-on="$listeners"
    @hook:created="componentCreated"
    @hidden="onModalHidden"
    @success="onSuccess"
  />
</template>
