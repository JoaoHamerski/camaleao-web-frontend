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

import Vue from 'vue'
import VueViewer from 'v-viewer'
import ModalExpensesDelete from './modals/ModalExpensesDelete.vue'
import ModalExpensesEdit from './modals/ModalExpensesEdit.vue'
import { config as viewerConfig } from '@/components/AppViewer/AppViewer'
import DailyCashStatusConfirmation from '@/views/daily-cash/partials/DailyCashStatusConfirmation.vue'
import DailyCashStatusInfo from '@/views/daily-cash/partials/DailyCashStatusInfo.vue'
Vue.use(VueViewer)

export default {
  components: {
    ModalExpensesDelete,
    ModalExpensesEdit,
    ViewerFileModal: () => import('@/components/AppViewer/ViewerFileModal'),
    DailyCashStatusConfirmation,
    DailyCashStatusInfo
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
        { text: 'TIPO', value: 'type' },
        { text: 'VIA', value: 'via' },
        { text: 'VALOR', value: 'value', format: 'currencyBRL', nowrap: true },
        { text: 'DATA', value: 'date', format: 'datetime' },
        { text: 'COMPROVANTE', value: 'receipt', align: 'center' },
        { text: 'STATUS', value: 'status', align: 'center' },
        { text: 'EDITAR', value: 'editar', align: 'center' },
      ]
    },
    authUser () {
      return this.$store.getters['auth/authUser']
    }
  },
  methods: {
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
      this.$emit('refresh-expenses')
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
    showEditButton (expense) {
      if (expense.is_confirmed === false) {
        return false
      }

      return expense.is_confirmed === null
        || expense.is_confirmed === true && this.$helpers.canView(roles.GERENCIA)
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

    <ModalExpensesDelete
      v-model="modalExpensesDelete.modal"
      :expense="modalExpensesDelete.expense"
      @show-receipt="showReceipt"
      @success="onSuccessDelete"
    />

    <ViewerFileModal
      v-model="modalFileViewer.modal"
      :src="modalFileViewer.src"
      modal-dialog-class="modal-fullscreen"
      @hidden="onViewerFileModalHidden"
    />

    <div class="text-secondary small">
      <FontAwesomeIcon
        :icon="icons.faExclamationCircle"
        fixed-width
      />
      <span v-if="+authUser.role.id === roles.GERENCIA">
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
          <template #[`items.type`]="{ item }">
            {{ item.type.name }}
          </template>
          <template #[`items.via`]="{ item }">
            {{ item.via.name }}
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
              v-if="showEditButton(item)"
              class="me-2"
              tooltip="Editar"
              btn-class="btn-sm px-3"
              :icon="icons.faEdit"
              outlined
              @click.prevent="onEditButtonClick(item)"
            />
            <AppButton
              v-else
              class="me-2"
              btn-class="btn-sm px-3"
              outlined
              color="secondary"
              disabled
              :icon="icons.faEdit"
            />
          </template>
          <template #[`items.status`]="{ item }">
            <DailyCashStatusConfirmation
              v-if="item.is_confirmed === null && $helpers.canView(roles.GERENCIA)"
              :entry="{...item, is_expense: true}"
            />
            <DailyCashStatusInfo
              v-else
              :entry="{...item, is_expense: true}"
            />
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
