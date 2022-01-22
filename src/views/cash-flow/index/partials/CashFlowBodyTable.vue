<script>
import {
  faExclamationCircle,
  faFileAlt,
  faFunnelDollar,
  faHandHoldingUsd
} from '@fortawesome/free-solid-svg-icons'

import { formatCurrencyBRL } from '@/utils/formatters'
import { TippyComponent } from 'vue-tippy'

import ModalEntryDetails from './ModalEntryDetails'
import CashFlowLegendType from './CashFlowLegendType'

export default {
  components: {
    ModalEntryDetails,
    CashFlowLegendType,
    Tippy: TippyComponent
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      modalEntryDetails: {
        modal: false,
        entry: {}
      },
      icons: {
        faExclamationCircle,
        faFileAlt,
        faFunnelDollar,
        faHandHoldingUsd
      }
    }
  },
  computed: {
    headers () {
      return [
        { text: 'Tipo', value: 'type', align: 'center' },
        { text: 'Descrição/Pedido', value: 'description' },
        { text: 'Via', value: 'via' },
        { text: 'Valor', value: 'value', format: 'currencyBRL' },
        { text: 'Data', value: 'date', align: 'center', format: 'datetime' },
        { text: 'Detalhes', value: 'details', align: 'center' }
      ]
    },
    items () {
      return this.data?.entries?.data || []
    }
  },
  methods: {
    formatCurrencyBRL,
    isPayment (entry) {
      return 'order' in entry
    },
    rowClass (item) {
      if (this.isPayment(item)) {
        return 'table-success'
      }

      return 'table-danger'
    },
    getDescription (entry) {
      if (this.isPayment(entry)) {
        return entry.order.name || `[CÓD.] ${entry.order.code}`
      }

      return entry.description
    },
    getVia (entry) {
      if (this.isPayment(entry)) {
        return entry.payment_via.name
      }

      return entry.via.name
    },
    getOrderUrl (entry) {
      const resolvedRoute = this.$router.resolve({
        name: 'orders.show',
        params: {
          clientKey: entry.order.client.id,
          orderKey: entry.order.code
        }
      })

      return resolvedRoute.href
    },
    onDetailsShowClick (entry) {
      this.modalEntryDetails.modal = true
      this.modalEntryDetails.entry = entry
    },
    onModalHidden () {
      this.modalEntryDetails.entry = {}
    }
  }
}
</script>

<template>
  <div>
    <ModalEntryDetails
      v-model="modalEntryDetails.modal"
      :entry="modalEntryDetails.entry"
      @hidden="onModalHidden"
    />
    <AppTable
      :headers="headers"
      :items="items"
      :row-class="rowClass"
    >
      <template #[`headers.type`]>
        <div>
          Tipo
          <FontAwesomeIcon
            class="text-primary"
            name="type-explanation"
            :icon="icons.faExclamationCircle"
            fixed-width
          />
        </div>
        <Tippy
          placement="right"
          to="type-explanation"
          theme="light-border"
        >
          <CashFlowLegendType />
        </Tippy>
      </template>
      <template #[`items.details`]="{ item }">
        <AppButton
          outlined
          btn-class="btn-sm "
          :icon="icons.faFileAlt"
          tooltip="Ver detalhes"
          @click="onDetailsShowClick(item)"
        />
      </template>
      <template #[`items.type`]="{ item }">
        <FontAwesomeIcon
          v-if="isPayment(item)"
          :icon="icons.faHandHoldingUsd"
          class="text-success"
        />
        <FontAwesomeIcon
          v-else
          :icon="icons.faFunnelDollar"
          class="text-danger"
        />
      </template>
      <template #[`items.description`]="{ item }">
        <a
          v-if="isPayment(item)"
          target="_blank"
          class="text-decoration-none"
          :href="getOrderUrl(item)"
        >
          {{ getDescription(item) }}
        </a>
        <span v-else>
          {{ getDescription(item) }}
        </span>
      </template>
      <template #[`items.via`]="{ item }">
        {{ getVia(item) }}
      </template>
      <template #[`items.value`]="{ item }">
        {{ formatCurrencyBRL(isPayment(item) ? item.value : -item.value) }}
      </template>
    </AppTable>
  </div>
</template>
