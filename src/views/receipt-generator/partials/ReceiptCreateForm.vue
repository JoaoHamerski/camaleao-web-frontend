<script>
import Form from '@/utils/Form'
import { isEmpty, get } from 'lodash-es'
import { maskCurrencyBRL, maskDate } from '@/utils/masks'
import { GetReceiptProductSuggestions, GetReceipts, CreateReceipt } from '@/graphql/Receipt.gql'
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
      fetchPolicy: 'network-only',
      update (data) {
        return JSON.parse(data.configGet)
      }
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
  methods: {
    async onSubmit () {
      const input = this.form.data()

      this.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: CreateReceipt,
          variables: {
            input
          },
          refetchQueries: [GetReceipts],
          awaitRefetchQueries: true
        })

        handleSuccess(this, {message: 'Recibo gerado!'})
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
      type="lists"
      name="product"
      placeholder="Digite o produto..."
      :error="form.errors.get('product')"
    >
      Produto
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
          Gerar
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
