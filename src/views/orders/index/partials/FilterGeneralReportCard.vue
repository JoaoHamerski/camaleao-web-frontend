<script>
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'
import { maskDate } from '@/utils/masks'
import { isEmpty, isNil, pickBy } from 'lodash-es'

import ModalReport from './ModalReport'

const GENERAL_REPORT_PATH_URL = '/api/orders/reports/general'

export default {
  components: {
    ModalReport
  },
  chimera: {
    _status () {
      return {
        method: 'GET',
        url: 'api/status'
      }
    },
    _cities () {
      return {
        method: 'GET',
        url: 'api/cities'
      }
    }
  },
  data () {
    return {
      maskDate,
      modal: false,
      src: '',
      filter: {
        city: '',
        status: '',
        closing_date: '',
        delivery_date: '',
        order: 'is_open',
        sort: 'older',
        client: true
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
    status () {
      return this.$chimera._status?.data?.data || []
    },
    cities () {
      return this.$chimera._cities?.data?.data || []
    },
    orderOptions () {
      return [
        { id: 'is_open', label: 'Em aberto', value: 'is_open' },
        { id: 'all', label: 'Todos', value: 'all' }
      ]
    },
    sortOptions () {
      return [
        { id: 'older', label: 'Mais antigo', value: 'older' },
        { id: 'newer', label: 'Mais recente', value: 'newer' },
        { id: 'delivery_date', label: 'Data de enterga', value: 'delivery_date' }
      ]
    }
  },
  methods: {
    isEmpty,
    generateURL () {
      const url = new URL(this.apiUrl + GENERAL_REPORT_PATH_URL)
      const filters = { ...this.filter }
      const validFilters = pickBy(filters, item => !isNil(item) && item !== '')

      filters.city = filters.city.id

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
    },
    customLabelCity (city) {
      if (city.state) {
        return `${city.name} - ${city.state.abbreviation}`
      }

      return city.name
    },
    customLabelStatus ({ id, text }) {
      return `${id}. ${text}`
    }
  }
}
</script>

<template>
  <AppCard
    id="generalReportCard"
    color="success"
    :collapsible="true"
    :collapsed="true"
  >
    <template #header>
      <h6 class="fw-bold mb-0">
        <FontAwesomeIcon
          :icon="icons.faClipboardList"
          fixed-width
        /> Relatório geral
      </h6>
    </template>
    <template #body>
      <ModalReport
        id="generalReportModal"
        v-model="modal"
        :src="src"
        @hidden="onModalHidden"
      >
        <template #title>
          Relatório geral de pedidos
        </template>
      </ModalReport>

      <h6 class="fw-bold">
        Filtros
      </h6>
      <div class="small text-secondary">
        Filtre por <b>um</b> ou <b>vários campos</b> combinados
      </div>

      <div class="row">
        <div class="col-3">
          <AppSelect
            id="city"
            v-model="filter.city"
            name="city"
            placeholder="Selecione uma cidade"
            :options="cities"
            :custom-label="customLabelCity"
          >
            Cidade
          </AppSelect>
        </div>
        <div class="col-3">
          <AppSimpleSelect
            id="status"
            v-model="filter.status"
            name="city"
            :options="status"
            value-prop="id"
            :label-prop="customLabelStatus"
          >
            Status
          </AppSimpleSelect>
        </div>
        <div class="col-3">
          <AppInput
            id="closing_date"
            v-model="filter.closing_date"
            :mask="maskDate"
            name="closing_date"
            placeholder="dd/mm/aaaa"
            type="date"
          >
            Data de fechamento
          </AppInput>
        </div>
        <div class="col-3">
          <AppInput
            id="delivery_date"
            v-model="filter.delivery_date"
            :mask="maskDate"
            name="delivery_date"
            placeholder="dd/mm/aaaa"
            type="date"
          >
            Data de entrega
          </AppInput>
        </div>
      </div>

      <div class="d-flex mb-3">
        <div class="fw-bold me-2">
          Pedidos:
        </div>
        <AppRadio
          v-model="filter.order"
          :options="orderOptions"
        />
      </div>

      <div class="d-flex">
        <div class="fw-bold me-2">
          Ordem:
        </div>

        <AppRadio
          v-model="filter.sort"
          :options="sortOptions"
        />
      </div>

      <AppButton
        outlined
        class="mt-4"
        @click.prevent="onGenerateReportClick"
      >
        Gerar relatório
      </AppButton>
    </template>
  </AppCard>
</template>
