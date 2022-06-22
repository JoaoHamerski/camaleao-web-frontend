<script>
import { isEmpty, isObject, omit, cloneDeep } from 'lodash-es'
import { formatCurrencyBRL } from '@/utils/formatters'
import { maskCurrencyBRL, maskDate } from '@/utils/masks'
import Form from '@/utils/Form'
import { handleSuccess, handleError } from '@/utils/forms'

import { vias } from '@/graphql/Via.gql'
import { CreateDailyPayment } from '@/graphql/Payment.gql'
import { GetDailyCash, GetDailyCashBalance } from '@/graphql/DailyCash.gql'
import DailyPaymentFormClient from './DailyPaymentFormClient.vue'
import DailyPaymentFormOrder from './DailyPaymentFormOrder.vue'

export default {
  apollo: {
    vias: {
      query: vias
    }
  },
  components: {
    DailyPaymentFormClient,
    DailyPaymentFormOrder
  },
  data () {
    return {
      maskCurrencyBRL: maskCurrencyBRL(),
      maskDate,
      isLoading: false,
      form: new Form({
        client: {
          id: '',
          name: '',
          isNew: false
        },
        order: {
          id: '',
          code: '',
          price: 'R$ ',
          reminder: '',
          isNew: false
        },
        date: '',
        value: 'R$ ',
        via_id: '',
        is_sponsor: false,
        sponsorship_client_id: ''
      })
    }
  },
  computed: {
    hasOrder () {
      return !isEmpty(this.form.order.id) && !this.form.order.isNew
    }
  },
  methods: {
    isEmpty,
    formatCurrencyBRL,
    customLabelVias ({ name }) {
      return name
    },
    onRestValueClick () {
      this.form.value = formatCurrencyBRL(this.form.order.id.total_owing)
    },
    getFormattedData () {
      const data = cloneDeep(this.form.data())

      if (isObject(data.client.id)) {
        data.client.id = data.client.id.id
      }

      if (isObject(data.order.id)) {
        data.order.id = data.order.id.id
      }

      data.client = omit(data.client, 'isNew')
      data.order = omit(data.order, 'isNew')

      return data
    },
    async onSubmit () {
      const input = this.getFormattedData()

      this.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: CreateDailyPayment,
          variables: { input },
          refetchQueries: [GetDailyCash, GetDailyCashBalance]
        })

        this.$helpers.clearCacheFrom([
          { fieldName: 'orders' },
          { fieldName: 'clients' },
          { fieldName: 'dailyCash'}
        ])

        handleSuccess(this, { message: 'Entrada registrada!', resetForm: true })
      } catch (error) {
        handleError(this, error)
      }

      this.isLoading = false
    }
  }
}
</script>

<template>
  <AppForm
    :form="form"
    :on-submit="onSubmit"
  >
    <h6 class="horizontal-line text-center mb-4">
      <span class="fw-bold">PARA</span>
    </h6>
    <DailyPaymentFormClient
      :form="form"
    />

    <DailyPaymentFormOrder
      :form="form"
    />

    <h6 class="horizontal-line text-center mt-5 mb-4">
      <span class="fw-bold">PAGAMENTO</span>
    </h6>

    <div class="row justify-content-between mb-2">
      <div class="col-7">
        <AppInput
          id="value"
          v-model="form.value"
          name="value"
          value="R$ "
          numeric
          :error="form.errors.get('value')"
          :mask="maskCurrencyBRL"
        >
          Valor
          <template
            #append
          >
            <AppButton
              v-if="hasOrder"
              :tooltip="formatCurrencyBRL(form.order.id.total_owing)"
              outlined
              @click.prevent="onRestValueClick"
            >
              Restante
            </AppButton>
          </template>
        </AppInput>
      </div>
      <div class="col-5">
        <AppSimpleSelect
          id="via_id"
          v-model="form.via_id"
          :error="form.errors.get('via_id')"
          name="via_id"
          placeholder="Selecione uma via"
          value-prop="id"
          label-prop="name"
          :options="vias"
        >
          Via
        </AppSimpleSelect>
      </div>
    </div>

    <div>
      <AppInput
        id="date"
        v-model="form.date"
        name="date"
        :error="form.errors.get('date')"
        placeholder="Data do pagamento"
        :mask="maskDate"
        today-button
        type="date"
        numeric
      >
        Data
      </AppInput>
    </div>

    <div>
      <AppCheckbox
        id="is_sponsor"
        v-model="form.is_sponsor"
        name="is_sponsor"
      >
        Patrocínio
      </AppCheckbox>
    </div>

    <div class="row">
      <div class="col">
        <AppButton
          color="success"
          class="fw-bold"
          :loading="isLoading"
          block
          @click.prevent="onSubmit"
        >
          Registrar
        </AppButton>
      </div>

      <div class="col">
        <AppButton
          color="light"
          data-bs-dismiss="modal"
          type="button"
          block
        >
          Cancelar
        </AppButton>
      </div>
    </div>
  </AppForm>
</template>
