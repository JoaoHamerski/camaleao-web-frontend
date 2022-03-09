<script>
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'
import { maskDate } from '@/utils/masks'
import { ordersReportProductionDate } from '@/graphql/Order.gql'
import Form from '@/utils/Form'
import { handleError } from '@/utils/forms'

export default {
  data () {
    return {
      maskDate,
      isLoading: false,
      form: new Form({
        date: '',
        state: 'OPEN'
      }),
      icons: {
        faClipboardList
      }
    }
  },
  computed: {
    orderOptions () {
      return [
        { id: 'is_open_p', label: 'Em aberto', value: 'OPEN' },
        { id: 'all_p', label: 'Todos', value: 'ALL' }
      ]
    }
  },
  methods: {
    async generateReport () {
      const input = this.form.data()

      this.isLoading = true

      try {
        const { data } = await this.$apollo.query({
          query: ordersReportProductionDate,
          variables: {
            input
          },
          fetchPolicy: 'network-only'
        })

        this.$emit('report-generated', data.ordersReportProductionDate)
      } catch (error) {
        handleError(this, error)
      }

      this.isLoading = false
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
      <h6 class="fw-bold">
        Filtros
      </h6>

      <AppForm
        :form="form"
        :on-submit="generateReport"
      >
        <AppInput
          id="date"
          v-model="form.date"
          name="date"
          placeholder="dd/mm/aaaa"
          :mask="maskDate"
          type="date"
          :error="form.errors.get('date')"
        >
          Data de produção
        </AppInput>
        <AppRadio
          v-model="form.state"
          name="state_p"
          :options="orderOptions"
          :error="form.errors.get('state')"
        >
          Pedidos:
        </AppRadio>
        <AppButton
          outlined
          :loading="isLoading"
          @click.prevent="generateReport"
        >
          Gerar relatório
        </AppButton>
      </AppForm>
    </template>
  </AppCard>
</template>
