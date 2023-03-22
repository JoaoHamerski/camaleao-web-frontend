<script>
import roles from '@/constants/roles'
import {
  faExclamationCircle,
  faFunnelDollar
} from '@fortawesome/free-solid-svg-icons'

import ModalExpensesEdit from './modals/ModalExpensesEdit.vue'
import TheExpensesBodyCardTable from './TheExpensesBodyCardTable.vue'
import { config as viewerConfig } from '@/components/AppViewer/AppViewer.vue'

export default {
  components: {
    ModalExpensesEdit,
    TheExpensesBodyCardTable,
    ExpensesTypesOverview: () => import('./ExpensesTypesOverview.vue'),
    ViewerFileModal: () => import('@/components/AppViewer/ViewerFileModal.vue'),
    PaymentExpenseDeleteModal: () => import('@/views/resources/payments-expenses/PaymentExpenseDeleteModal.vue')
  },
  props: {
    expenses: {
      type: Array,
      default: () => ([])
    },
    pagination: {
      type: Object,
      default: () => ({})
    },
    page: {
      type: Number,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      roles,
      icons: {
        faExclamationCircle,
        faFunnelDollar
      },
      expenseTypes: [],
      modalFileViewer: {
        src: '',
        modal: false
      },
      modalExpensesDelete: {
        expense: {},
        modal: false
      },
      modalExpensesEdit: {
        expense: {},
        modal: false
      }
    }
  },
  methods: {
    onViewReceipt (expense) {
      const url = expense.receipt_path

      if (this.$helpers.strContainsAny(url, '.pdf')) {
        this.modalFileViewer.src = url
        this.modalFileViewer.modal = true

        return
      }

      this.$viewerApi({
        images: [expense.receipt_path],
        options: viewerConfig
      })
    },
    onEdit(expense) {
      this.modalExpensesEdit.expense = expense
      this.modalExpensesEdit.modal = true
    },
    onDelete (expense) {
      this.modalExpensesDelete.expense = expense
      this.modalExpensesDelete.modal = true
    },
    onViewerFileModalHidden () {
      this.modalFileViewer.src = ''
    },
    onSuccessEdit () {
      this.modalExpensesEdit.modal = false
      this.$emit('refresh-expenses')
    },
    onSuccessDelete () {
      this.modalExpensesDelete.modal = false
    }
  }
}
</script>

<template>
  <div>
    <ModalExpensesEdit
      v-model="modalExpensesEdit.modal"
      :expense="modalExpensesEdit.expense"
      @success="onSuccessEdit"
    />

    <PaymentExpenseDeleteModal
      v-model="modalExpensesDelete.modal"
      :entry="modalExpensesDelete.expense"
      is-expense
      @success="onSuccessDelete"
    />

    <ViewerFileModal
      v-model="modalFileViewer.modal"
      :src="modalFileViewer.src"
      modal-dialog-class="modal-fullscreen"
      @hidden="onViewerFileModalHidden"
    />

    <AppContainer
      class="mb-3"
      collapsible
      color="danger"
    >
      <template #title>
        <FontAwesomeIcon
          :icon="icons.faFunnelDollar"
          fixed-width
        />
        Despesas por categoria
      </template>
      <template #body>
        <ExpensesTypesOverview
          v-if="$helpers.canView(roles.GERENCIA)"
          class="my-3"
        />
      </template>
    </AppContainer>

    <div class="text-secondary small">
      <FontAwesomeIcon
        :icon="icons.faExclamationCircle"
        fixed-width
      />
      <span v-if="$helpers.canView(roles.GERENCIA)">
        Exibindo despesas registradas por todos usuários.
      </span>
      <span v-else>
        Exibindo apenas despesas registradas por você.
      </span>
    </div>

    <TheExpensesBodyCardTable
      :items="expenses"
      :is-loading="isLoading"
      @edit="onEdit"
      @delete="onDelete"
      @view-receipt="onViewReceipt"
    />

    <AppPaginator
      :is-loading="isLoading"
      :value="page"
      :pagination="pagination"
      @input="$emit('update:page', $event)"
    />
  </div>
</template>
