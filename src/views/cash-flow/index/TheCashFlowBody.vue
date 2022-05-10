<script>
import {
  faCashRegister,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons'
import { isEmpty } from 'lodash-es'

import PaymentExpenseTable, { headers } from '@/views/resources/payments-expenses/PaymentExpenseTable.vue'
import CashFlowBalance from './partials/CashFlowBalance.vue'

export default {
  components: {
    PaymentExpenseTable,
    CashFlowBalance
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    filterDates: {
      type: Object,
      default: () => ({})
    },
    data: {
      type: Array,
      default: () => []
    },
    pagination: {
      type: Object,
      default: () => ({})
    },
    page: {
      type: Number,
      required: true
    },
    balance: {
      type: Object,
      default: () => {}
    },
    showBalance: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      icons: {
        faCashRegister,
        faExclamationCircle
      }
    }
  },
  computed: {
    headers () {
      const index = headers.findIndex(item => item.value === 'created_at')

      headers.splice(
        index,
        1,
        {text: 'CADASTRO EM', value: 'created_at', format: 'datetime', formatting: 'dd/MM/y HH:mm' }
      )

      return headers
    },
    displayFilteredDate () {
      const { start_date, final_date } = this.filterDates

      if (start_date && final_date) {
        return `${start_date} ~ ${final_date}`
      }

      return `${start_date}`
    }
  },
  methods: {
    isEmpty
  }
}
</script>

<template>
  <div>
    <AppCard class="mt-2">
      <template #header>
        <h6 class="mb-0 fw-bold d-flex justify-content-between">
          <div>
            <FontAwesomeIcon
              :icon="icons.faCashRegister"
              fixed-width
            />
            Fluxo de caixa
          </div>
          <div>
            <FontAwesomeIcon
              v-tippy="{placement: 'left'}"
              content="Lista de informações de DESPESAS com PAGAMENTOS RECEBIDOS"
              :icon="icons.faExclamationCircle"
              size="lg"
            />
          </div>
        </h6>
      </template>

      <template #body>
        <AppLoading v-show="isLoading" />

        <div
          v-if="!isEmpty(filterDates.start_date)"
          class="text-center"
        >
          <div><small class="text-secondary">Filtragem por data</small></div>
          <h5 class="fw-bold">
            {{ displayFilteredDate }}
          </h5>
        </div>

        <CashFlowBalance
          v-if="!balance.isLoading"
          :balance="balance"
          :show-balance="showBalance"
        />
        <AppLoading v-else />

        <PaymentExpenseTable
          :items="data"
          :headers="headers"
        />
      </template>
    </AppCard>

    <AppPaginator
      :value="page"
      class="mt-2"
      :pagination="pagination"
      @input="$emit('update:page', $event)"
    />
  </div>
</template>
