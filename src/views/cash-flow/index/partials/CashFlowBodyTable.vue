<script>
import {
  faExclamationCircle,
  faFileAlt,
  faFunnelDollar,
  faHandHoldingUsd
} from '@fortawesome/free-solid-svg-icons'

import { formatCurrencyBRL } from '@/utils/formatters'
import { TippyComponent } from 'vue-tippy'

import ModalEntryDetails from './ModalEntryDetails.vue'
import CashFlowLegendType from './CashFlowLegendType.vue'

export default {
  components: {
    ModalEntryDetails,
    CashFlowLegendType,
    Tippy: TippyComponent
  },
  props: {
    data: {
      type: Array,
      default: () => []
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
        { text: 'Via', value: 'via.name' },
        { text: 'Valor', value: 'value', format: 'currencyBRL', nowrap: true },
        { text: 'Data', value: 'date', align: 'center', format: 'datetime' },
        { text: 'Detalhes', value: 'details', align: 'center' }
      ]
    }
  },
  methods: {
    formatCurrencyBRL,
    rowClass (item) {
      if (item.is_expense) {
        return 'table-danger'
      }

      return 'table-success'
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
      this.modalEntryDetails.entry = entry
      this.modalEntryDetails.modal = true
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
      :items="data"
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
      <template #[`items.type`]="{ item }">
        <FontAwesomeIcon
          v-if="item.is_expense"
          :icon="icons.faFunnelDollar"
          class="text-danger"
        />
        <FontAwesomeIcon
          v-else
          :icon="icons.faHandHoldingUsd"
          class="text-success"
        />
      </template>
      <template #[`items.description`]="{ item }">
        <span v-if="item.is_expense">
          {{ item.description }}
        </span>
        <a
          v-else
          target="_blank"
          class="text-decoration-none"
          :href="getOrderUrl(item)"
        >
          {{ item.description }}
        </a>
      </template>
      <template #[`items.value`]="{ item }">
        {{ formatCurrencyBRL(item.is_expense ? -item.value : item.value) }}
      </template>
      <template #[`items.details`]="{ item }">
        <AppButton
          outlined
          btn-class="btn-sm"
          :icon="icons.faFileAlt"
          tooltip="Ver detalhes"
          @click="onDetailsShowClick(item)"
        />
      </template>
    </AppTable>
  </div>
</template>
