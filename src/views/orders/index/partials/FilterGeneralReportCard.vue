<script>
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'
import { maskDate } from '@/utils/masks'
import { cities } from '@/graphql/City.gql'
import { status } from '@/graphql/Status.gql'
import { GetOrdersReport } from '@/graphql/Order.gql'
import Form from '@/utils/Form'

export default {
  apollo: {
    cities: {
      query: cities
    },
    status: {
      query: status
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
      data.status_id = data.status_id?.id ?? ''

      return data
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

      this.$emit('report-generated', data.ordersReport)
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
      <h6 class="fw-bold">
        Filtros
      </h6>
      <div class="small text-secondary">
        Filtre por <b>um</b> ou <b>vários campos</b> combinados.
      </div>
      <div class="small text-secondary">
        Pedidos pré-registrados não são incluidos no relatório.
      </div>

      <AppForm
        :form="form"
        :on-submit="generateReport"
      >
        <div class="row">
          <div class="col-3">
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
          <div class="col-3">
            <AppSimpleSelect
              id="status_id"
              v-model="form.status_id"
              name="status_id"
              :options="status"
              value-prop="id"
              :label-prop="customLabelStatus"
            >
              Status
            </AppSimpleSelect>
          </div>
          <div class="col-3">
            <AppInput
              id="closed_at"
              v-model="form.closed_at"
              :mask="maskDate"
              name="closed_at"
              placeholder="dd/mm/aaaa"
              type="date"
            >
              Data de fechamento
            </AppInput>
          </div>
          <div class="col-3">
            <AppInput
              id="delivery_date"
              v-model="form.delivery_date"
              :mask="maskDate"
              name="delivery_date"
              placeholder="dd/mm/aaaa"
              type="date"
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
        >
          Ordem:
          <template #hint>
            Ordem dos pedidos que deve aparecer primeiro
          </template>
        </AppRadio>

        <AppCheckboxSwitch
          id="displayFilterInfo"
          v-model="form.display_filter_info"
        >
          Exibir informações do filtro no relatório
        </AppCheckboxSwitch>

        <AppButton
          outlined
          class="mt-4"
          :loading="isLoading"
          @click.prevent="generateReport"
        >
          Gerar relatório
        </AppButton>
      </AppForm>
    </template>
  </AppCard>
</template>
