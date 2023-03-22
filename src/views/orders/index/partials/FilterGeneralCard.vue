<script>
import { map } from 'lodash-es'
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'
import { maskDate } from '@/utils/masks'
import { GetCities } from '@/graphql/City.gql'
import { GetStatus } from '@/graphql/Status.gql'
import { GetOrdersReport } from '@/graphql/Order.gql'
import Form from '@/utils/Form'

export default {
  apollo: {
    cities: {
      query: GetCities
    },
    status: {
      query: GetStatus
    }
  },
  data () {
    return {
      maskDate,
      cities: [],
      status: [],
      isLoading: false,
      form: new Form({
        city_id: '',
        status_id: '',
        closed_at: '',
        delivery_date: '',
        state: 'OPEN',
        order: 'OLDER',
        payment_pending: false,
        payment_paid: false,
        display_filter_info: false
      }),
      icons: {
        faClipboardList
      }
    }
  },
  computed: {
    stateOptions () {
      return [
        { id: 'OPEN', label: 'Em aberto', value: 'OPEN' },
        { id: 'ALL', label: 'Todos', value: 'ALL' }
      ]
    },
    orderOptions () {
      return [
        { id: 'OLDER', label: 'Mais antigo', value: 'OLDER' },
        { id: 'NEWER', label: 'Mais recente', value: 'NEWER' },
        { id: 'DELIVERY_DATE', label: 'Data de enterga', value: 'DELIVERY_DATE' }
      ]
    }
  },
  methods: {
    getFormattedData () {
      const data = this.form.data()

      data.city_id = data.city_id?.id ?? ''
      data.status_id = data.status_id ? map(data.status_id, 'id') : ''

      return data
    },
    filterOrders () {
      const data = this.getFormattedData()

      this.$emit('filter-orders', data)
    },
    async generateReport () {
      const input = this.getFormattedData()

      this.isLoading = true

      const { data } = await this.$apollo.query({
        query: GetOrdersReport,
        variables: {
          input
        },
        fetchPolicy: 'network-only'
      })

      this.isLoading = false

      this.$emit('report-generated', {
        title: 'Relatório geral de pedidos',
        src: data.ordersReport,
      })
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
        /> Relatório e filtro
      </h6>
    </template>

    <template #body>
      <h6 class="fw-bold">
        Filtros
      </h6>
      <div class="small text-secondary">
        Filtre por <b>um</b> ou <b>vários campos</b> combinados.
      </div>
      <div class="small text-secondary">
        Pedidos pré-registrados não são incluídos no relatório.
      </div>

      <AppForm
        :form="form"
        :on-submit="generateReport"
      >
        <div class="row">
          <div class="col-12 col-sm-6">
            <AppSelect
              id="city_id"
              v-model="form.city_id"
              name="city_id"
              placeholder="Selecione uma cidade"
              :options="cities"
              :custom-label="customLabelCity"
            >
              Cidade
            </AppSelect>
          </div>
          <div class="col-12 col-sm-6">
            <AppSelect
              id="status_id"
              v-model="form.status_id"
              name="status_id"
              :options="status"
              :custom-label="({text}) => text"
              :tags-as-block="false"
              multiple
              :close-on-select="false"
              track-by="id"
              placeholder="Selecione uma ou mais opções"
            >
              Status
            </AppSelect>
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-sm-6">
            <AppInput
              id="closed_at"
              v-model="form.closed_at"
              :mask="maskDate"
              name="closed_at"
              placeholder="dd/mm/aaaa"
              type="date"
              numeric
            >
              Data de fechamento
            </AppInput>
          </div>
          <div class="col-12 col-sm-6">
            <AppInput
              id="delivery_date"
              v-model="form.delivery_date"
              :mask="maskDate"
              name="delivery_date"
              placeholder="dd/mm/aaaa"
              type="date"
              numeric
            >
              Data de entrega
            </AppInput>
          </div>
        </div>

        <AppRadio
          v-model="form.state"
          name="state"
          :options="stateOptions"
        >
          Pedidos:
        </AppRadio>

        <AppRadio
          v-model="form.order"
          name="order"
          :options="orderOptions"
          :align="$isMobile ? 'vertical' : 'horizontal'"
        >
          Ordem:
          <template #hint>
            Ordem dos pedidos que deve aparecer primeiro
          </template>
        </AppRadio>

        <div>
          <div>
            <label class="form-label fw-bold">Com pagamentos</label>
            <small class="text-secondary">
              (apenas filtro, indisponível para relatório)
            </small>
          </div>
          <div class="d-flex">
            <AppCheckbox
              id="payment-pending"
              v-model="form.payment_pending"
              class="me-2"
            >
              Pendentes
            </AppCheckbox>
            <AppCheckbox
              id="payment-paid"
              v-model="form.payment_paid"
            >
              Algum valor já pago
            </AppCheckbox>
          </div>
        </div>

        <AppCheckboxSwitch
          id="displayFilterInfo"
          v-model="form.display_filter_info"
        >
          Exibir informações do filtro no relatório
        </AppCheckboxSwitch>

        <div class="mt-3">
          <AppButton
            class="me-2"
            outlined
            @click.prevent="filterOrders"
          >
            Filtrar pedidos
          </AppButton>
          <AppButton
            outlined
            :loading="isLoading"
            @click.prevent="generateReport"
          >
            Gerar relatório
          </AppButton>
        </div>
      </AppForm>
    </template>
  </AppCard>
</template>
