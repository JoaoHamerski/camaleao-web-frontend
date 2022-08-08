<script>
import ExpensesTypesOverview from '@/views/expenses/index/ExpensesTypesOverview.vue'
import { formatDatetime } from '@/utils/formatters'

export default {
  components: {
    ExpensesTypesOverview
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    date: {
      type: String,
      default: ''
    }
  },
  computed: {
    getFormattedData () {
      return formatDatetime(this.date, "LLLL 'de' y").toUpperCase()
    }
  }
}
</script>

<template>
  <AppModal
    id="dailyCashExpensesModal"
    color="danger"
    :value="value"
    modal-dialog-class="modal-lg"
    v-on="$listeners"
  >
    <template #title>
      Despesas
    </template>

    <template #body>
      <h4 class="text-center fw-bold text-secondary mb-5 mt-4 horizontal-line">
        <span>{{ getFormattedData }}</span>
      </h4>

      <ExpensesTypesOverview
        v-if="value && date"
        :date="date"
      />

      <div class="text-end mt-3">
        <AppButton
          color="light"
          btn-class="fw-bold"
          data-bs-dismiss="modal"
        >
          Fechar
        </AppButton>
      </div>
    </template>
  </AppModal>
</template>
