<script>
import { faReceipt, faSearch } from '@fortawesome/free-solid-svg-icons'
import { GetDailyCashDetailedFlow } from '@/graphql/DailyCash.gql'
import { last, first, isEmpty } from 'lodash-es'
import { formatDatetime } from '@/utils/formatters'
import { DateTime } from 'luxon'
import roles from '@/constants/roles'

import DailyCashDetailedFlowItems from './DailyCashDetailedFlowItems.vue'
import DailyCashDetailedFlowPaginate from './DailyCashDetailedFlowPaginate.vue'
import DailyCashExpensesModal from '../DailyCashExpensesModal.vue'

export default {
  components: {
    DailyCashDetailedFlowItems,
    DailyCashDetailedFlowPaginate,
    DailyCashExpensesModal
  },
  apollo: {
    dailyCashDetailedFlow() {
      return {
        query: GetDailyCashDetailedFlow,
        variables() {
          return {
            page: this.page,
            date: this.date
          }
        },
        skip: true
      }
    }
  },
  data() {
    return {
      collapse: false,
      dailyCashDetailedFlow: [],
      expensesModal: {
        value: false,
        date: ''
      },
      page: 1,
      date: '',
      roles,
      icons: {
        faReceipt,
        faSearch
      }
    }
  },
  computed: {
    isQueryLoading() {
      return !!this.$apollo.queries.dailyCashDetailedFlow.loading
    },
    datePaginationInterval() {
      if (!this.dailyCashDetailedFlow.length) {
        return
      }

      const firstDate = first(this.dailyCashDetailedFlow)
      const lastDate = last(this.dailyCashDetailedFlow)

      const interval = formatDatetime(firstDate.date, "LLLL 'de' y")
        + ' - '
        + formatDatetime(lastDate.date, "LLLL 'de' y")

      if (!isEmpty(this.date)) {
        return DateTime
          .fromFormat(`01/${this.date}`, 'dd/MM/y', { locale: 'pt-br' })
          .toFormat("LLLL 'de' y")
          .toUpperCase()
      }

      return interval.toUpperCase()
    }
  },
  methods: {
    onInputCollapse(value) {
      if (value) {
        this.$apollo.queries.dailyCashDetailedFlow.skip = false
      }
    },
    paginate(to) {
      if (to === 'next') {
        this.page--
        return
      }

      if (to === 'previous') {
        this.page++
        return
      }
    },
    openExpensesModal(date) {
      this.expensesModal.date = date
      this.expensesModal.value = true
    },
    onModalClose() {
      this.expensesModal.value = false
      this.expensesModal.date = ''
    }
  }
}
</script>

<template>
  <AppContainer
    v-model="collapse"
    collapsible
    @input="onInputCollapse"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faReceipt"
        fixed-width
      />

      {{
        $helpers.canView(roles.GERENCIA)
          ? 'Fluxo detalhado'
          : 'Pendências'
      }}
    </template>

    <template #body>
      <div class="position-relative">
        <AppLoading v-show="isQueryLoading" />

        <DailyCashExpensesModal
          v-model="expensesModal.value"
          :date="expensesModal.date"
          @hidden="onModalClose"
        />

        <DailyCashDetailedFlowPaginate
          v-model="date"
          v-bind="{
            page,
            date,
            datePaginationInterval
          }"
          @paginate="paginate"
        />

        <DailyCashDetailedFlowItems
          v-for="item in dailyCashDetailedFlow"
          :key="item.date"
          :item="item"
          class="mb-3"
          @open-pendency-orders="$emit('open-pendency-orders', $event)"
          @open-expenses-modal="openExpensesModal"
        />
      </div>
    </template>
  </AppContainer>
</template>
