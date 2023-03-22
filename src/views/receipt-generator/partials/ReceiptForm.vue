<script>
import Form from '@/utils/Form'
import { isEmpty, get, omit, pick } from 'lodash-es'
import { formatDatetime } from '@/utils/formatters'
import { maskCurrencyBRL, maskDate } from '@/utils/masks'
import {
  GetReceiptProductSuggestions,
  GetReceipts,
  CreateReceipt,
  UpdateReceipt
} from '@/graphql/Receipt.gql'
import { GetConfig } from '@/graphql/Config.gql'
import { handleSuccess, handleError } from '@/utils/forms'

export default {
  apollo: {
    receiptProductSuggestions: {
      query: GetReceiptProductSuggestions
    },
    receiptSettings: {
      query: GetConfig,
      variables: {
        name: 'app',
        key: 'receipt_generator_settings',
        encoded: false
      },
      update (data) {
        return JSON.parse(data.configGet)
      }
    }
  },
  props: {
    receipt: {
      type: Object,
      default: () => ({})
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      maskCurrencyBRL: maskCurrencyBRL(),
      receiptProductSuggestions: [],
      maskDate,
      isLoading: false,
      receiptSettings: {},
      form: new Form({
        client: '',
        product: '',
        date: '',
        value: '',
        has_signature: true
      })
    }
  },
  computed: {
    isSuggestionsQueryLoading () {
      return !!this.$apollo.queries.receiptProductSuggestions.loading
    },
    isQueryLoading () {
      return !!this.$apollo.queries.receiptSettings.loading
    },
    isFormEnabled () {
      const requiredKeys = [
        'content',
        'date',
        'header',
        'logo',
        'signature_image',
        'signature_name'
      ]

      return requiredKeys.every(
        key => !isEmpty(get(this.receiptSettings, key))
      )
    }
  },
  mounted () {
    if (this.isEdit) {
      this.populateForm()
    }
  },
  methods: {
    populateForm() {
      const form = pick(this.receipt, Object.keys(this.form.data()));

      Object.assign(
        this.form,
        new Form({
          ...omit(form, ['date', 'value']),
          ...{
            date: formatDatetime(this.receipt.date),
            value: this.$helpers.toBRL(this.receipt.value)
          }
        })
      )
    },
    async onSubmit () {
      const input = this.form.data()

      this.isLoading = true

      if (this.isEdit) {
        await this.update(input)
      } else {
        await this.create(input)
      }

      this.isLoading = false
    },
    async create (input) {
      try {
        await this.$apollo.mutate({
          mutation: CreateReceipt,
          variables: {
            input
          },
          refetchQueries: [GetReceipts],
          awaitRefetchQueries: true
        })

        handleSuccess(this, { message: 'Recibo gerado!' })
      } catch (error) {
        handleError(this, error)
      }
    },
    async update (input) {
      try {
        await this.$apollo.mutate({
          mutation: UpdateReceipt,
          variables: {
            id: this.receipt.id,
            input
          },
          refetchQueries: [GetReceipts],
          awaitRefetchQueries: true
        })

        handleSuccess(this, { message: 'Recibo atualizado!' })
      } catch (error) {
        handleError(this, error)
      }
    }
  }
}
</script>

<template>
  <AppForm
    :form="form"
    :on-submit="onSubmit"
  >
    <AppLoading v-show="isQueryLoading" />

    <AppAlert
      v-if="!isFormEnabled && !isQueryLoading"
      color="danger"
    >
      Algumas configurações estão incompletas, por favor, preencha-as no botão <b>Configurações</b>
    </AppAlert>

    <AppInput
      id="client"
      v-model="form.client"
      name="client"
      placeholder="Digite o nome do cliente..."
      :error="form.errors.get('client')"
    >
      Nome do cliente
    </AppInput>

    <AppInput
      id="product"
      v-model="form.product"
      list="productsList"
      name="product"
      placeholder="Digite o produto..."
      :error="form.errors.get('product')"
      autocomplete="off"
    >
      Produto
      <template
        v-if="isSuggestionsQueryLoading"
        #hint
      >
        <div
          class="spinner-border spinner-border-sm me-1 text-primary"
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
        Carregando lista de sugestões...
      </template>
    </AppInput>

    <datalist id="productsList">
      <option
        v-for="suggestion in receiptProductSuggestions"
        :key="suggestion"
        :value="suggestion"
      />
    </datalist>

    <AppInput
      id="date"
      v-model="form.date"
      :mask="maskDate"
      type="date"
      name="date"
      placeholder="Digite a data do recibo..."
      today-button
      :error="form.errors.get('date')"
    >
      Data
    </AppInput>

    <AppInput
      id="value"
      v-model="form.value"
      name="value"
      :mask="maskCurrencyBRL"
      placeholder="Digite o valor do recibo..."
      :error="form.errors.get('value')"
    >
      Valor
    </AppInput>

    <AppCheckbox
      id="has_signature"
      v-model="form.has_signature"
      name="has_signature"
    >
      Exibir assinatura
    </AppCheckbox>

    <div class="row">
      <div class="col">
        <AppButton
          block
          color="success"
          type="submit"
          btn-class="fw-bold"
          :loading="isLoading"
          :disabled="!isFormEnabled"
        >
          {{ isEdit ? 'Atualizar' : 'Gerar' }}
        </AppButton>
      </div>
      <div class="col">
        <AppButton
          block
          color="light"
          type="button"
          data-bs-dismiss="modal"
          :disabled="isLoading"
        >
          Fechar
        </AppButton>
      </div>
    </div>
  </AppForm>
</template>
