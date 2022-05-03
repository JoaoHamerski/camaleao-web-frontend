<script>
import { isEmpty } from 'lodash-es'
import roles from '@/constants/roles'
import {
  faClipboardCheck,
  faFileAlt,
  faHandHoldingUsd,
  faFunnelDollar,
  faEdit,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons'
import { clients, orders } from '@/constants/route-names'
import { formatCurrencyBRL } from '@/utils/formatters'

import DailyCashStatus from '../partials/DailyCashStatus.vue'

export default {
  components: {
    DailyCashStatus
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      clients,
      orders,
      roles,
      icons: {
        faClipboardCheck,
        faFileAlt,
        faHandHoldingUsd,
        faFunnelDollar,
        faEdit,
        faExclamationCircle
      }
    }
  },
  computed: {
    headers () {
      return [
        { text: '', value: 'icon', align: 'center'},
        { text: 'PEDIDO/DESPESA', value: 'order', wrap: true },
        { text: 'CLIENTE', value: 'client' },
        { text: 'VALOR', value: 'value', format: 'currencyBRL' },
        { text: 'VIA', value: 'via.name' },
        { text: 'REGISTRO ÀS', value: 'created_at', format: 'datetime', formatting: 'HH:mm', align: 'center' },
        { text: 'DATA', value: 'date', format: 'datetime', formatting: 'dd/MM/y', align: 'center' },
        { text: 'COMPROVANTE', value: 'payment_voucher', align: 'center'},
        { text: 'STATUS', value: 'status', align: 'center' },
        { text: 'EDITAR', value: 'edit', align: 'center' }
      ]
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
    onShowVoucher (item) {
      this.$emit('show-voucher', item)
    },
    entryRowClass (entry, isNote) {
      return [
        'align-middle ',
        entry.is_expense ? 'table-danger' : 'table-success',
        isNote ? 'border-bottom-2' : ''
      ]
    },
    onEditClick (entry) {
      this.$emit('edit', entry)
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
    showLineAppend(entry) {
      if (entry.is_expense) {
        return !!entry.user
      }

      return !!entry.note
    }
  }
}
</script>
<template>
  <AppTable
    :headers="headers"
    :items="items"
    :row-class="entryRowClass"
  >
    <template
      #[`table-row.item`]="{ item }"
    >
      <tr
        v-if="showLineAppend(item)"
        class="text-secondary small"
        :class="entryRowClass(item, true)"
      >
        <template v-if="item.is_expense && $helpers.canView(roles.GERENCIA)">
          <td colspan="10">
            <strong>Registrado por: </strong>{{ item.user.name }}
          </td>
        </template>
        <template v-else-if="item.note">
          <td colspan="10">
            <strong>Nota:</strong> {{ item.note }}
          </td>
        </template>
      </tr>
    </template>
    <template #[`items.icon`]="{ item }">
      <FontAwesomeIcon
        v-show="item.is_expense"
        :icon="icons.faFunnelDollar"
        class="text-danger"
      />
      <FontAwesomeIcon
        v-show="!item.is_expense"
        :icon="icons.faHandHoldingUsd"
        class="text-success"
      />
    </template>

    <template #[`items.order`]="{ item }">
      <template v-if="item.order">
        <a
          :href="$helpers.getUrl(
            orders.show,
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
          :href="$helpers.getUrl(clients.show, {client: item.order.client})"
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
        class="text-primary"
        :icon="icons.faExclamationCircle"
        fixed-width
        content="Data para qual foi registrada a entrada/saída"
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
        @click.prevent="onShowVoucher(item)"
      />
    </template>

    <template #[`items.status`]="{ item }">
      <DailyCashStatus :entry="item" />
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
</template>

<style scoped>
.border-bottom-2 {
  border-bottom-width: 2px;
}
</style>
