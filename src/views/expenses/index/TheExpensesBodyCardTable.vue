<script>
import roles from '@/constants/roles'
import {
  faFunnelDollar,
  faEdit,
  faFilePdf,
  faFile,
  faFileImage,
  faCheck,
  faTimes,
  faMinus,
  faTrashAlt,
  faUserTie,
  faBox
} from '@fortawesome/free-solid-svg-icons'

import Vue from 'vue'
import VueViewer from 'v-viewer'
Vue.use(VueViewer)

import ExpenseState from './ExpenseState.vue'

export default {
  components: {
    ExpenseState
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      expenseEmployee: null,
      expenseProductType: null,
      roles,
      icons: {
        faFunnelDollar,
        faEdit,
        faFilePdf,
        faFile,
        faFileImage,
        faCheck,
        faTimes,
        faMinus,
        faTrashAlt,
        faUserTie,
        faBox
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
        { text: 'AÇÕES', value: 'actions', align: 'center' },
      ]
    }
  },
  methods: {
    onReceiptClick (expense) {
      this.$emit('view-receipt', expense)
    },
    onEditButtonClick (expense) {
      this.$emit('edit', expense)
    },
    onDeleteButtonClick (expense) {
      this.$emit('delete', expense)
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
    getReceiptIcon (expense) {
      if (this.$helpers.strContainsAny(expense.receipt_path, '.pdf')) {
        return this.icons.faFilePdf
      }

      if (!expense.receipt_path) {
        return this.icons.faFile
      }

      return this.icons.faFileImage
    },
    isEditEnabled (expense) {
      if (expense.is_confirmed === null) {
        return true
      }

      if (expense.is_confirmed === true && this.$helpers.canView(roles.GERENCIA)) {
        return true
      }

      return false
    },
    hasRelatedType(expense) {
      return !!expense.product_type || !!expense.employee
    }
  }
}
</script>

<template>
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
        :items="items"
      >
        <template #[`table-row.item`]="{ item }">
          <tr
            v-if="hasRelatedType(item)"
            class="small border-bottom-2"
          >
            <td
              :colspan="headers.length"
              class="py-0"
            >
              <b v-if="item.product_type">
                <FontAwesomeIcon
                  :icon="icons.faBox"
                  fixed-width
                /> {{ item.product_type.name }}
              </b>
              <b v-if="item.employee">
                <FontAwesomeIcon
                  :icon="icons.faUserTie"
                  fixed-width
                /> {{ item.employee.name }}
              </b>
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
            @click="onReceiptClick(item)"
          />
        </template>
        <template #[`items.actions`]="{ item }">
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

          <AppButton
            v-if="$helpers.canView(roles.GERENCIA)"
            color="danger"
            outlined
            :icon="icons.faTrashAlt"
            btn-class="btn-sm px-3"
            class="ms-1"
            tooltip="Excluir"
            @click.prevent="onDeleteButtonClick(item)"
          />
        </template>
        <template #[`items.status`]="{ item }">
          <ExpenseState :expense="item" />
        </template>
      </AppTable>
    </template>
  </AppCard>
</template>
