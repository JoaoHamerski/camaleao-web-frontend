<script>
import roles from '@/constants/roles'
import {
  faFunnelDollar,
  faFilePdf,
  faFileImage,
  faFile,
  faEdit,
  faTrashAlt,
  faExclamationCircle,
  faTimes,
  faCheck,
  faMinus
} from '@fortawesome/free-solid-svg-icons'
import { config as viewerConfig } from '@/components/AppViewer/AppViewer'
import { GetConfig } from '@/graphql/Config.gql'

import Vue from 'vue'
import VueViewer from 'v-viewer'
import ModalExpensesEdit from './modals/ModalExpensesEdit.vue'
import ExpenseState from './ExpenseState.vue'

Vue.use(VueViewer)

export default {
  apollo: {
    expenseEmployee: {
      query: GetConfig,
      variables: {
        name: 'app',
        key: 'employee_expense',
        encoded: false
      },
      update ({ configGet }) {
        return configGet
      }
    },
    expenseProductType: {
      query: GetConfig,
      variables: {
        name: 'app',
        key: 'product_types_expense',
        encoded: false
      },
      update ({ configGet }) {
        return configGet
      }
    }
  },
  components: {
    ModalExpensesEdit,
    ExpenseState,
    TheExpensesTypesOverview: () => import('./TheExpensesTypesOverview.vue'),
    ViewerFileModal: () => import('@/components/AppViewer/ViewerFileModal'),
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
      expenseEmployee: null,
      expenseProductType: null,
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
      },
      icons: {
        faFunnelDollar,
        faFilePdf,
        faFile,
        faFileImage,
        faEdit,
        faTrashAlt,
        faExclamationCircle
      }
    }
  },
  computed: {
    headers () {
      return [
        { text: 'DESCRIÇÃO', value: 'description', wrap: true },
        { text: 'TIPO', value: 'type.name' },
        { text: 'VIA', value: 'via.name' },
        { text: 'VALOR', value: 'value', format: 'currencyBRL' },
        { text: 'DATA', value: 'date', format: 'datetime' },
        { text: 'COMPROVANTE', value: 'receipt', align: 'center' },
        { text: 'STATUS', value: 'status', align: 'center' },
        { text: 'EDITAR', value: 'editar', align: 'center' },
      ]
    }
  },
  methods: {
    hasRelationType (expense) {
      return expense.type.id === this.expenseEmployee
        || expense.type.id === this.expenseProductType
    },
    getReceiptIcon (expense) {
      if (this.$helpers.strContainsAny(expense.receipt_path, '.pdf')) {
        return this.icons.faFilePdf
      }

      if (!expense.receipt_path) {
        return this.icons.faFile
      }

      return this.icons.faFileImage
    },
    onDeleteButtonClick (expense) {
      this.modalExpensesDelete.expense = expense
      this.modalExpensesDelete.modal = true
    },
    onEditButtonClick (expense) {
      this.modalExpensesEdit.expense = expense
      this.modalExpensesEdit.modal = true
    },
    showReceipt (expense) {
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
    onViewerFileModalHidden () {
      this.modalFileViewer.src = ''
    },
    onSuccessEdit () {
      this.modalExpensesEdit.modal = false
      this.$emit('refresh-expenses')
    },
    onSuccessDelete () {
      this.modalExpensesDelete.modal = false
      this.$toast.success('Despesa deletada com sucesso!')
    },
    getStatusColor (expense) {
      if (expense.is_confirmed === true) {
        return 'success'
      }

      if (expense.is_confirmed === false) {
        return 'danger'
      }

      return 'warning'
    },
    getStatusIcon(expense) {
      if (expense.is_confirmed === true) {
        return faCheck
      }

      if (expense.is_confirmed === false) {
        return faTimes
      }

      return faMinus
    },
    isEditEnabled (expense) {
      if (expense.is_confirmed === null) {
        return true
      }

      if (expense.is_confirmed === true && this.$helpers.canView(roles.GERENCIA)) {
        return true
      }

      return false
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

    <ViewerFileModal
      v-model="modalFileViewer.modal"
      :src="modalFileViewer.src"
      modal-dialog-class="modal-fullscreen"
      @hidden="onViewerFileModalHidden"
    />

    <TheExpensesTypesOverview
      v-if="$helpers.canView(roles.GERENCIA)"
      class="my-3"
    />

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


    <AppCard
      color="primary"
      class="mb-2"
    >
      <template #header>
        <h6 class="fw-bold mb-0">
          <FontAwesomeIcon
            :icon="icons.faFunnelDollar"
            fixed-width
          />
          Despesas
        </h6>
      </template>
      <template #body>
        <AppLoading v-show="isLoading" />
        <AppTable
          :headers="headers"
          :items="expenses"
        >
          <template
            #[`table-row.item`]="{ item }"
          >
            <tr
              v-if="hasRelationType(item)"
              class="small border-bottom-2"
            >
              <td
                :colspan="headers.length"
                class="py-0"
              >
                <template v-if="item.type.id === expenseProductType">
                  <b>Produto relacionado ao tipo:</b> {{ item.product_type.name }}
                </template>
                <template v-if="item.type.id === expenseEmployee">
                  <b>Funcionário relacionado ao tipo:</b> {{ item.employee.name }}
                </template>
              </td>
            </tr>
          </template>
          <template #[`items.receipt`]="{ item }">
            <AppButton
              :color="item.receipt_path ? 'primary' : 'secondary'"
              btn-class="btn-sm px-3"
              :icon="getReceiptIcon(item)"
              outlined
              :tooltip="item.receipt_path ? 'Ver' : 'Sem comprovante'"
              :disabled="!item.receipt_path"
              @click="showReceipt(item)"
            />
          </template>
          <template #[`items.editar`]="{ item }">
            <AppButton
              :disabled="!isEditEnabled(item)"
              :color="isEditEnabled(item) ? 'primary' : 'secondary'"
              class="me-2"
              :tooltip="isEditEnabled(item) ? 'Editar' : 'Não é possível editar'"
              btn-class="btn-sm px-3"
              :icon="icons.faEdit"
              outlined
              @click.prevent="onEditButtonClick(item)"
            />
          </template>
          <template #[`items.status`]="{ item }">
            <ExpenseState :expense="item" />
          </template>
        </AppTable>
      </template>
    </AppCard>

    <AppPaginator
      :is-loading="isLoading"
      :value="page"
      :pagination="pagination"
      @input="$emit('update:page', $event)"
    />
  </div>
</template>
