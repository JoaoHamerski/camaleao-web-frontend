<script>
import roles from '@/constants/roles'
import {
  faFunnelDollar,
  faFilePdf,
  faFileImage,
  faFile,
  faEdit,
  faTrashAlt,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons'

import Vue from 'vue'
import VueViewer from 'v-viewer'
import ModalExpensesDelete from './modals/ModalExpensesDelete'
import ModalExpensesEdit from './modals/ModalExpensesEdit'
import { config as viewerConfig } from '@/components/AppViewer/AppViewer'

Vue.use(VueViewer)

export default {
  components: {
    ModalExpensesDelete,
    ModalExpensesEdit,
    ViewerFileModal: () => import('@/components/AppViewer/ViewerFileModal')
  },
  props: {
    vias: {
      type: Array,
      default: () => ([])
    },
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
    expenseTypes: {
      type: Array,
      default: () => ([])
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
        { text: 'Descrição', value: 'description' },
        { text: 'Tipo', value: 'type' },
        { text: 'Via', value: 'via' },
        { text: 'Valor', value: 'value', format: 'currencyBRL' },
        { text: 'Data', value: 'date', format: 'datetime' },
        { text: 'Comprovante', value: 'receipt', align: 'center' },
        { text: 'Ações', value: 'actions', align: 'center' }
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
    }
  }
}
</script>

<template>
  <div>
    <ModalExpensesEdit
      v-model="modalExpensesEdit.modal"
      :vias="vias"
      :expense="modalExpensesEdit.expense"
      :expense-types="expenseTypes"
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
              btn-class="btn-sm"
              :icon="getReceiptIcon(item)"
              outlined
              :tooltip="item.receipt_path ? 'Ver' : 'Sem comprovante'"
              :disabled="!item.receipt_path"
              @click="showReceipt(item)"
            />
          </template>
          <template #[`items.actions`]="{ item }">
            <div>
              <AppButton
                class="me-2"
                tooltip="Editar"
                btn-class="btn-sm"
                :icon="icons.faEdit"
                outlined
                @click.prevent="onEditButtonClick(item)"
              />
              <AppButton
                v-if="authUser.role.id === roles.GERENCIA"
                btn-class="btn-sm"
                tooltip="Excluir"
                :icon="icons.faTrashAlt"
                outlined
                color="danger"
                @click.prevent="onDeleteButtonClick(item)"
              />
            </div>
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
