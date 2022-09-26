<script>
import { isEmpty, isObject, omit, cloneDeep } from 'lodash-es'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { vias } from '@/graphql/Via.gql'
import { CreateDailyPayment } from '@/graphql/Payment.gql'
import { GetDailyCash, GetDailyCashBalance } from '@/graphql/DailyCash.gql'

import { formatCurrencyBRL, formatDatetime } from '@/utils/formatters'
import { maskCurrencyBRL, maskDate } from '@/utils/masks'
import Form from '@/utils/Form'
import { handleSuccess, handleError } from '@/utils/forms'

import DailyPaymentFormClient from './DailyPaymentFormClient.vue'
import DailyPaymentFormOrder from './DailyPaymentFormOrder.vue'
import SelectClientsFind from '@/views/resources/SelectClientsFind.vue'

const NUMBER_OF_QUERIES = 1

export default {
  apollo: {
    vias: {
      query: vias,
      result () {
        this.loadingQueries--
      }
    }
  },
  components: {
    DailyPaymentFormClient,
    DailyPaymentFormOrder,
    SelectClientsFind
  },
  props: {
    payment: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      maskDate,
      maskCurrencyBRL: maskCurrencyBRL(),
      isLoading: false,
      loadingQueries: NUMBER_OF_QUERIES,
      vias: [],
      icons: {
        faExclamationCircle
      },
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
        bank_uid: '',
        note: '',
        via_id: '',
        is_sponsor: false,
        sponsorship_client_id: '',
        filename_entry_from: ''
      })
    }
  },
  computed: {
    isQueriesLoading () {
      return this.loadingQueries > 0
    },
    isFromBankEntry () {
      return !isEmpty(this.payment.bank_uid)
        || !isEmpty(this.form.bank_uid)
    },
    hasOrder () {
      return !isEmpty(this.form.order.id) && !this.form.order.isNew
    }
  },
  watch: {
    loadingQueries (value) {
      if (!value && (this.isEdit || !isEmpty(this.payment))) {
        this.$nextTick(() => {
          this.populateForm()
        })
      }
    }
  },
  methods: {
    isEmpty,
    formatCurrencyBRL,
    populateForm () {
      this.form = new Form({
        ...this.form.data(),
        ...omit(this.payment, ['id', 'value', 'date']),
        ...{
          date: formatDatetime(this.payment.date),
          value: formatCurrencyBRL(this.payment.value),
        },
      })
    },
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
      data.sponsorship_client_id = data.sponsorship_client_id?.id || ''

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
    <AppLoading v-show="isQueriesLoading" />
    <AppContainer class="mb-3">
      <template #title>
        CLIENTE & PEDIDO
      </template>
      <template #body>
        <DailyPaymentFormClient
          :form="form"
        />

        <DailyPaymentFormOrder
          :form="form"
        />
      </template>
    </AppContainer>

    <AppContainer class="mb-3">
      <template #title>
        PAGAMENTO
      </template>

      <template #body>
        <AppAlert
          v-if="form.errors.get('bank_uid')"
          color="danger"
          small
          @dismiss="form.errors.clear('bank_uid')"
        >
          {{ form.errors.get('bank_uid') }}
        </AppAlert>

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
              :disabled="isFromBankEntry"
            >
              Valor
              <template
                #append
              >
                <AppButton
                  v-if="hasOrder"
                  :tooltip="formatCurrencyBRL(form.order.id.total_owing)"
                  outlined
                  :disabled="isFromBankEntry"
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
          <AppCheckbox
            id="is_sponsor"
            v-model="form.is_sponsor"
            name="is_sponsor"
          >
            Patrocínio
            <FontAwesomeIcon
              v-tippy
              :icon="icons.faExclamationCircle"
              class="text-primary"
              fixed-width
              content="Caso o pagamento seja efetuado por outro cliente que não é dono do pedido"
            />
          </AppCheckbox>
        </div>

        <div v-show="form.is_sponsor">
          <SelectClientsFind
            id="sponsorship_client_id"
            v-model="form.sponsorship_client_id"
            :error="form.errors.get('sponsorship_client_id')"
          />
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
            :disabled-message="form.is_sponsor ? 'Não é necessário informar a data em patrocínios' : false"
            :disabled="isFromBankEntry"
          >
            Data
          </AppInput>

          <AppInput
            id="note"
            v-model="form.note"
            name="note"
            :error="form.errors.get('note')"
            optional
          >
            Nota
          </AppInput>
        </div>
      </template>
    </AppContainer>


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
