<script>
import BankMirrorTable from './BankMirrorTable.vue'
import BankMirrorPaymentModal from './BankMirrorPaymentModal.vue'
import BankMirrorExpenseModal from './BankMirrorExpenseModal.vue'

export default {
  components: {
    BankMirrorTable,
    BankMirrorPaymentModal,
    BankMirrorExpenseModal,
  },
  props: {
    entries: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      bankMirrorExpenseModal: {
        value: false,
        expense: {}
      },
      bankMirrorPaymentModal: {
        value: false,
        payment: {}
      }
    }
  },
  methods: {
    openModalPayment (entry) {
      this.bankMirrorPaymentModal.payment = {
        value: entry.value,
        date: entry.date,
        bank_uid: entry.bank_uid,
        via_id: entry.via_id,
        note: entry.description
      }

      this.bankMirrorPaymentModal.value = true
    },
    onBankPaymentModalSuccess () {
      this.bankMirrorPaymentModal.value = false
      this.bankMirrorPaymentModal.payment = {}
    },
    openModalExpense (entry) {
      this.bankMirrorExpenseModal.expense = {
        bank_uid: entry.bank_uid,
        description: entry.description,
        expense_via_id: entry.via_id,
        date: entry.date,
        value: Math.abs(entry.value)
      }

      this.bankMirrorExpenseModal.value = true
    },
    onBankExpenseModalSuccess () {
      this.bankMirrorExpenseModal.value = false
      this.bankMirrorExpenseModal.expense = {}
    }
  }
}
</script>

<template>
  <div class="my-2">
    <BankMirrorPaymentModal
      v-model="bankMirrorPaymentModal.value"
      :payment="bankMirrorPaymentModal.payment"
      @success="onBankPaymentModalSuccess"
    />

    <BankMirrorExpenseModal
      v-model="bankMirrorExpenseModal.value"
      :expense="bankMirrorExpenseModal.expense"
      @success="onBankExpenseModalSuccess"
    />

    <div
      v-if="!entries.length"
      class="my-5 text-center text-secondary"
    >
      Nenhuma entrada encontrada
    </div>
    <div v-else>
      <BankMirrorTable
        :entries="entries"
        @link-payment="openModalPayment"
        @link-expense="openModalExpense"
      />
    </div>
  </div>
</template>
