<script>
import { isEmpty } from 'lodash-es'
import roles from '@/constants/roles'
import {
  faClipboardCheck,
  faFileAlt,
  faHandHoldingUsd,
  faFunnelDollar,
  faEdit
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
        faEdit
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
        { text: 'COMPROVANTE', value: 'payment_voucher', align: 'center'},
        { text: 'STATUS', value: 'status', align: 'center' },
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
    entryRowClass (entry) {
      return [
        'align-middle',
        entry.is_expense ? 'table-danger' : 'table-success'
      ]
    },
    onEditClick (entry) {
      this.$emit('edit', entry)
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
      <div class="d-flex flex-column justify-content-center flex-sm-row">
        <DailyCashStatus :entry="item" />
        <AppButton
          v-if="item.is_confirmed === null"
          :icon="icons.faEdit"
          color="primary"
          btn-class="btn-sm px-3"
          tooltip="Editar"
          outlined
          @click.prevent="onEditClick(item)"
        />
      </div>
    </template>
  </AppTable>
</template>
