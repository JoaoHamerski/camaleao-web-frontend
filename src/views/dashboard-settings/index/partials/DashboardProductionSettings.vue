<script>
import Form from '@/utils/Form';
import { handleError } from '@/utils/forms';
import { ChangeDashboardProductionSettings } from '@/graphql/Dashboard.gql'
import { GetConfig } from '@/graphql/Config.gql'

export default {
  props: {
    status: {
      type: Array,
      default: () => []
    }
  },
  apollo: {
    productionSettings: {
      query: GetConfig,
      variables: {
        name: 'dashboard',
        key: 'production',
        encoded: false
      },
      update ({ configGet }) {
        return JSON.parse(configGet)
      },
      result () {
        this.populateForm()
      }
    }
  },
  data: () => ({
    isLoading: false,
    productionSettings: {},
    form: new Form({
      estampados_no_dia_id: '',
      costurados_no_dia_id: '',
      month_production_id: '',
      late_orders_id: '',
      waiting_for_withdrawal_id: '',
      delivered_id: ''
    })
  }),
  methods: {
    populateForm() {
      Object.assign(this.form, {...this.productionSettings})
    },
    async onSubmit () {
      const input = this.form.data()

      this.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: ChangeDashboardProductionSettings,
          variables: {
            settings: input
          }
        })
      } catch (error) {
        handleError(this, error)
      }

      this.isLoading = false
    }
  }
}
</script>

<template>
  <AppContainer>
    <template #title>
      Produção
    </template>
    <template #body>
      <AppForm
        :form="form"
        :on-submit="onSubmit"
      >
        <div class="fw-bold mb-2">
          Selecione os status que cada seção da produção terá seus dados baseados.
        </div>
        <div class="row">
          <div class="col">
            <AppSimpleSelect
              id="estampados_no_dia_id"
              v-model="form.estampados_no_dia_id"
              name="estampados_no_dia_id"
              :options="status"
              label-prop="text"
              label-value="id"
              :error="form.errors.get('estampados_no_dia_id')"
            >
              Estampados no dia
            </AppSimpleSelect>
          </div>
          <div class="col">
            <AppSimpleSelect
              id="costurados_no_dia_id"
              v-model="form.costurados_no_dia_id"
              name="costurados_no_dia_id"
              :options="status"
              label-prop="text"
              label-value="id"
              :error="form.errors.get('costurados_no_dia_id')"
            >
              Costurados no dia
            </AppSimpleSelect>
          </div>
          <div class="col">
            <AppSimpleSelect
              id="month_production_id"
              v-model="form.month_production_id"
              name="month_production_id"
              :options="status"
              label-prop="text"
              label-value="id"
              :error="form.errors.get('month_production_id')"
            >
              Produção no mês
            </AppSimpleSelect>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <AppSimpleSelect
              id="late_orders_id"
              v-model="form.late_orders_id"
              name="late_orders_id"
              :options="status"
              label-prop="text"
              label-value="id"
              :error="form.errors.get('late_orders_id')"
            >
              Pedidos atrasados
              <template #hint>
                <div>Selecione o status que deve ser usado para contabilizar os PEDIDOS ATRASADOS.</div>
                <div>- Pedidos com esse status e a data de entrega anterior a hoje serão contabilizados como ATRASADOS.</div>
              </template>
            </AppSimpleSelect>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <AppSimpleSelect
              id="waiting_for_withdrawal_id"
              v-model="form.waiting_for_withdrawal_id"
              name="waiting_for_withdrawal_id"
              hint="Selecione o status que deve ser usado para contabilizar os pedidos AGUARDANDO RETIRADA."
              :options="status"
              label-prop="text"
              label-value="id"
              :error="form.errors.get('waiting_for_withdrawal_id')"
            >
              Aguardando retirada
            </AppSimpleSelect>
          </div>
          <div class="col">
            <AppSimpleSelect
              id="delivered_id"
              v-model="form.delivered_id"
              name="delivered_id"
              hint="Selecione um status que indica quando um pedido é considerado ENTREGUE"
              :options="status"
              label-prop="text"
              label-value="id"
              :error="form.errors.get('delivered_id')"
            >
              Indicador de entregue
            </AppSimpleSelect>
          </div>
        </div>
        <div class="mt-3">
          <AppButton
            color="success"
            class="fw-bold px-5"
            :loading="isLoading"
          >
            Salvar
          </AppButton>
        </div>
      </AppForm>
    </template>
  </AppContainer>
</template>
