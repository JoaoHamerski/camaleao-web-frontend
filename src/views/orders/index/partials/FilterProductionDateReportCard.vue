<script>
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'
import { maskDate } from '@/utils/masks'
import { isNil, pickBy } from 'lodash-es'

import ModalReport from './ModalReport'

const PRODUCTION_DATE_REPORT_PATH_URL = '/api/orders/reports/production-date'

export default {
  components: {
    ModalReport
  },
  data () {
    return {
      maskDate,
      src: '',
      modal: false,
      filter: {
        production_date: '',
        order: 'is_open'
      },
      icons: {
        faClipboardList
      }
    }
  },
  computed: {
    apiUrl () {
      return this.$store.getters.apiURL
    },
    orderOptions () {
      return [
        { id: 'is_open_2', label: 'Em aberto', value: 'is_open' },
        { id: 'all_2', label: 'Todos', value: 'all' }
      ]
    }
  },
  methods: {
    generateURL () {
      const url = new URL(this.apiUrl + PRODUCTION_DATE_REPORT_PATH_URL)
      const filters = { ...this.filter }
      const validFilters = pickBy(filters, item => !isNil(item) && item !== '')

      url.search = new URLSearchParams(validFilters)

      return url.toString()
    },
    onGenerateReportClick () {
      const url = this.generateURL()

      this.src = url
      this.modal = true
    },
    onModalHidden () {
      this.src = ''
    }
  }
}
</script>

<template>
  <AppCard
    id="productionDateReportCard"
    color="success"
    :collapsible="true"
    :collapsed="true"
  >
    <template #header>
      <h6 class="fw-bold mb-0">
        <FontAwesomeIcon
          :icon="icons.faClipboardList"
          fixed-width
        /> Relatório por data de produção
      </h6>
    </template>
    <template #body>
      <ModalReport
        id="productionDateReportModal"
        v-model="modal"
        :src="src"
        @hidden="onModalHidden"
      />

      <h6 class="fw-bold">
        Filtros
      </h6>

      <AppInput
        id="production_date"
        v-model="filter.production_date"
        name="production_date"
        placeholder="dd/mm/aaaa"
        :mask="maskDate"
        type="date"
      >
        Data de produção
      </AppInput>

      <div class="d-flex mb-3">
        <div class="fw-bold me-2">
          Pedidos:
        </div>
        <AppRadio
          v-model="filter.order"
          :options="orderOptions"
        />
      </div>

      <AppButton
        outlined
        @click.prevent="onGenerateReportClick"
      >
        Gerar relatório
      </AppButton>
    </template>
  </AppCard>
</template>
