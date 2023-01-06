<script>
import Vue from 'vue'
import VueViewer from 'v-viewer'
import {
  faClipboardCheck,
  faFileAlt,
  faHandHoldingUsd,
  faFunnelDollar,
  faEdit,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons'
import { isEmpty } from 'lodash-es'
import roles from '@/constants/roles'
import { config as viewerConfig } from '@/components/AppViewer/AppViewer'
import { formatCurrencyBRL } from '@/utils/formatters'

import PaymentVouchersModal from '../payments/PaymentVouchersModal.vue'
import ViewerFileModal from '@/components/AppViewer/ViewerFileModal.vue'
import PaymentExpenseStatus from './PaymentExpenseStatus.vue'
import PaymentExpenseEditModal from './PaymentExpenseEditModal.vue'

Vue.use(VueViewer)

export const headers = [
  { text: '', value: 'icon', align: 'center'},
  { text: 'PEDIDO/DESPESA', value: 'order', wrap: true },
  { text: 'CLIENTE', value: 'client', wrap: true },
  { text: 'VALOR', value: 'value', format: 'currencyBRL' },
  { text: 'VIA', value: 'via.name' },
  { text: 'REGISTRO ÀS', value: 'created_at', format: 'datetime', formatting: 'HH:mm', align: 'center' },
  { text: 'DATA', value: 'date', format: 'datetime', formatting: 'dd/MM/y', align: 'center' },
  { text: 'COMPROVANTE', value: 'payment_voucher', align: 'center'},
  { text: 'STATUS', value: 'status', align: 'center' },
  { text: 'EDITAR', value: 'edit', align: 'center' }
]

export default {
  components: {
    PaymentExpenseStatus,
    PaymentVouchersModal,
    PaymentExpenseEditModal,
    ViewerFileModal
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    headers: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      roles,
      modalEdit: {
        value: false,
        entry: null
      },
      modalFileViewer: {
        value: false,
        src: ''
      },
      modalPaymentVouchers: {
        value: false,
        payment: null
      },
      icons: {
        faClipboardCheck,
        faFileAlt,
        faHandHoldingUsd,
        faFunnelDollar,
        faEdit,
        faQuestionCircle
      }
    }
  },
  methods: {
    formatCurrencyBRL,
    isEmpty,
    getVoucher (item) {
      if (item.is_expense) {
        return item.receipt_path
      }

      return item.order.payment_voucher_paths
    },
    showVoucher (item) {
      if (item.is_expense) {
        if (this.$helpers.strContainsAny(item.receipt_path, '.pdf')) {
          this.modalFileViewer.src = item.receipt_path
          this.modalFileViewer.value = true
          return
        }

        this.$viewerApi({
          images: [item.receipt_path],
          options: viewerConfig
        })

        return
      }

      this.modalPaymentVouchers.value = true
      this.modalPaymentVouchers.payment = item
    },
    entryRowClass (entry) {
      return [
        'align-middle',
        {
          'table-success': entry.is_confirmed === true,
          'table-warning': entry.is_confirmed === null,
          'table-danger': entry.is_confirmed === false
        }
      ]
    },
    onEditClick (entry) {
      this.modalEdit.value = true
      this.modalEdit.item = entry
    },
    showEditButton(entry) {
      return entry.is_confirmed === null
        || [null, true].includes(entry.is_confirmed) && this.$helpers.canView(roles.GERENCIA)
    },
    getDisabledEditMessage(entry) {
      const type = !entry.is_expense ? 'entradas' : 'saídas'

      if (entry.is_confirmed === false) {
        return `Impossível editar ${type} rejeitadas`
      }

      if (entry.is_confirmed === true) {
        return `Apenas usuários da gerência podem editar ${type} já confirmadas`
      }

      return 'Não é possível editar'
    },
    showTableRowAppend(entry) {
      if (entry.is_expense) {
        return !!entry.user
      }

      return !!entry.note || !!entry.sponsorship_client
    },
    onViewerFileModalHidden () {
      this.modalFileViewer.src = ''
    },
    hideEntryModal () {
      this.modalEdit.value = false
      this.modalEdit.item = null
    },
  }
}
</script>
<template>
  <div>
    <ViewerFileModal
      v-model="modalFileViewer.value"
      :src="modalFileViewer.src"
      modal-dialog-class="modal-fullscreen"
      @hidden="onViewerFileModalHidden"
    />

    <PaymentVouchersModal
      v-model="modalPaymentVouchers.value"
      :payment="modalPaymentVouchers.payment"
    />

    <PaymentExpenseEditModal
      v-model="modalEdit.value"
      :entry="modalEdit.item"
      @success="hideEntryModal"
      @hidden="hideEntryModal"
    />

    <AppTable
      :headers="headers"
      :items="items"
      :row-class="entryRowClass"
    >
      <template
        #[`table-row.item`]="{ item }"
      >
        <tr
          v-if="showTableRowAppend(item)"
          class="text-secondary small border-bottom-2"
          :class="entryRowClass(item)"
        >
          <template v-if="item.is_expense && $helpers.canView(roles.GERENCIA)">
            <td
              colspan="10"
              class="py-0"
            >
              <strong>Registrado por: </strong>{{ item.user.name }}
            </td>
          </template>
          <template v-else>
            <td
              colspan="10"
              class="py-0"
            >
              <div v-if="item.note">
                <strong>Nota:</strong> {{ item.note }}
              </div>
              <div v-if="item.sponsorship_client">
                <b>Patrocínio por: </b>
                <a
                  class="fw-bold text-decoration-none"
                  target="_blank"
                  :href="$helpers.getUrl('clients.show', {client: item.sponsorship_client.id })"
                >{{ item.sponsorship_client.name }}</a>
              </div>
            </td>
          </template>
        </tr>
      </template>
      <template #[`items.icon`]="{ item }">
        <FontAwesomeIcon
          v-show="item.is_expense"
          :icon="icons.faFunnelDollar"
          class="text-danger"
          size="lg"
        />
        <FontAwesomeIcon
          v-show="!item.is_expense"
          :icon="icons.faHandHoldingUsd"
          class="text-success"
          size="lg"
        />
      </template>
      <template #[`items.order`]="{ item }">
        <template v-if="item.order">
          <a
            :href="$helpers.getUrl(
              'orders.show',
              {client: item.order.client, order: item.order}
            )"
            target="_blank"
            class="text-decoration-none fw-bold"
          >{{ item.order.code }}</a>
        </template>
        <template v-else>
          {{ item.description }}
        </template>
      </template>
      <template #[`items.client`]="{ item }">
        <template v-if="item.order">
          <a
            :href="$helpers.getUrl('clients.show', {client: item.order.client})"
            target="_blank"
            class="text-decoration-none fw-bold"
          >{{ item.order.client.name }}</a>
        </template>
        <template v-else>
          N/A
        </template>
      </template>
      <template #[`items.value`]="{ item }">
        <span class="fw-bold">{{ formatCurrencyBRL(item.value) }}</span>
      </template>
      <template #[`headers.date`]>
        DATA <FontAwesomeIcon
          v-tippy
          class="text-secondary"
          :icon="icons.faQuestionCircle"
          fixed-width
          content="Data em que foi registrada a entrada/saída"
        />
      </template>
      <template #[`headers.payment_voucher`]>
        <FontAwesomeIcon
          :icon="icons.faFileAlt"
          size="lg"
        />
      </template>
      <template #[`items.payment_voucher`]="{ item }">
        <AppButton
          :color="isEmpty(getVoucher(item)) ? 'secondary' : 'primary'"
          :disabled-message="isEmpty(getVoucher(item)) && 'Sem comprovantes'"
          :icon="icons.faFileAlt"
          outlined
          btn-class="btn-sm px-3"
          @click.prevent="showVoucher(item)"
        />
      </template>
      <template #[`items.status`]="{ item }">
        <PaymentExpenseStatus :entry="item" />
      </template>
      <template #[`items.edit`]="{ item }">
        <AppButton
          v-if="showEditButton(item)"
          :icon="icons.faEdit"
          color="primary"
          btn-class="btn-sm px-3"
          tooltip="Editar"
          outlined
          @click.prevent="onEditClick(item)"
        />
        <AppButton
          v-else
          :icon="icons.faEdit"
          disabled
          color="secondary"
          btn-class="btn-sm px-3"
          :tooltip="getDisabledEditMessage(item)"
          outlined
        />
      </template>
    </AppTable>
  </div>
</template>
