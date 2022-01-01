<script>
import { isEmpty } from 'lodash-es'
import { formatCurrencyBRL } from '@/utils/formatters'
import { maskCurrencyBRL } from '@/utils/masks'
import Form from '@/utils/Form'
import { handleError } from '@/utils/forms.js'

import DailyPaymentFormClient from './DailyPaymentFormClient'
import DailyPaymentFormOrder from './DailyPaymentFormOrder'

export default {
  chimera: {
    _vias () {
      return {
        method: 'GET',
        url: 'api/vias'
      }
    },
    _newDailyCashPayment () {
      return {
        method: 'POST',
        url: 'api/daily-cash/create',
        auto: false,
        on: {
          success () {
            this.$emit('success')
            this.$toast.success('Registro feito com sucesso!')
            this.form.reset()
          },
          error ({ error }) {
            handleError(this, error)
          }
        }
      }
    }
  },
  components: {
    DailyPaymentFormClient,
    DailyPaymentFormOrder
  },
  data () {
    return {
      maskCurrencyBRL: maskCurrencyBRL(),
      isLoading: false,
      form: new Form({
        isNewClient: false,
        isNewOrder: false,
        client: '',
        order: '',
        value: '',
        via_id: '',
        price: '',
        reminder: ''
      })
    }
  },
  computed: {
    hasOrder () {
      return !isEmpty(this.form.order) && !this.form.isNewOrder
    },
    apiUrl () {
      return this.$store.getters.apiURL
    },
    vias () {
      return this.$chimera._vias?.data?.data || []
    }
  },
  methods: {
    isEmpty,
    formatCurrencyBRL,
    customLabelVias ({ name }) {
      return name
    },
    onRestValueClick () {
      this.form.value = formatCurrencyBRL(this.form.order.total_owing)
    },
    async onSubmit () {
      this.isLoading = true

      try {
        await this.$chimera._newDailyCashPayment.fetch(true, {
          params: { ...this.form }
        })
      } catch (error) {}

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
          :error="form.errors.get('value')"
          :mask="maskCurrencyBRL"
        >
          Valor
          <template
            #append
          >
            <AppButton
              v-if="hasOrder"
              :tooltip="formatCurrencyBRL(form.order.total_owing)"
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

    <div class="d-flex justify-content-between">
      <AppButton
        color="success"
        class="fw-bold"
        :loading="isLoading"
        @click.prevent="onSubmit"
      >
        Registrar
      </AppButton>

      <AppButton
        color="light"
        data-bs-dismiss="modal"
        type="button"
      >
        Cancelar
      </AppButton>
    </div>
  </AppForm>
</template>
