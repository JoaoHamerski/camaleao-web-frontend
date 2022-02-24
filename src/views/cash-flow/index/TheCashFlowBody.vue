<script>
import { faCashRegister, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { isEmpty } from 'lodash-es'

import 'tippy.js/themes/light-border.css'

import CashFlowBodyTable from './partials/CashFlowBodyTable'
import CashFlowBodyStatistics from './partials/CashFlowBodyStatstics'

export default {
  components: {
    CashFlowBodyTable,
    CashFlowBodyStatistics
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
    statistics: {
      type: Object,
      default: () => ({})
    },
    showStatistics: {
      type: Boolean,
      default: false
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
    <AppCard
      class="mt-2"
      :has-body-padding="false"
    >
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
        <CashFlowBodyStatistics
          v-if="!isEmpty(statistics)"
          :show-statistics="showStatistics"
          :show-balance="showBalance"
          :data="statistics"
        />
        <CashFlowBodyTable :data="data" />
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
