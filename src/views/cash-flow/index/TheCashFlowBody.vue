<script>
import { faCashRegister, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

import { formatCurrencyBRL } from '@/utils/formatters'
import 'tippy.js/themes/light-border.css'

import CashFlowBodyTable from './partials/CashFlowBodyTable'

export default {
  components: {
    CashFlowBodyTable
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => ({})
    },
    pagination: {
      type: Object,
      default: () => ({})
    },
    page: {
      type: Number,
      required: true
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
  methods: {
    formatCurrencyBRL,
    onPaginationUpdate (page) {
      this.$emit('update:page', page)
    }
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
        <CashFlowBodyTable :data="data" />
      </template>
    </AppCard>

    <AppPaginator
      class="mt-2"
      :pagination="pagination"
      :page="page"
      @update:page="onPaginationUpdate"
    />
  </div>
</template>
