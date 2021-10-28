<script>
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { maskCurrencyBRL, maskDate } from '@/utils/masks'
import Form from '@/utils/Form'

export default {
  data () {
    return {
      maskCurrencyBRL: maskCurrencyBRL(),
      maskDate,
      icons: {
        faDollarSign
      },
      form: new Form({
        value: '',
        date: ''
      })
    }
  },
  methods: {
    onSubmit () {
      //
    }
  }
}
</script>

<template>
  <AppModal
    id="newPaymentModal"
    color="success"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faDollarSign"
        class="me-2"
      />Novo pagamento
    </template>

    <template #body>
      <AppForm
        :on-submit="onSubmit"
        :form="form"
      >
        <AppInput
          v-model="form.value"
          name="value"
          :mask="maskCurrencyBRL"
        >
          Valor
        </AppInput>

        <AppInput
          v-model="form.date"
          placeholder="dd/mm/aaaa"
          name="date"
          :mask="maskDate"
        >
          Data de pagamento

          <template #append>
            <AppButton outlined>
              Hoje
            </AppButton>
          </template>
        </AppInput>

        <AppSimpleSelect name="via_id">
          Via
        </AppSimpleSelect>

        <AppInput
          name="note"
          placeholder="Anotação extra do pagamento..."
        >
          Observação
        </AppInput>

        <div class="d-flex justify-content-between mt-4">
          <AppButton
            type="submit"
            color="success"
            class="fw-bold"
          >
            REGISTRAR
          </AppButton>

          <AppButton
            color="light"
            data-bs-dismiss="modal"
          >
            Cancelar
          </AppButton>
        </div>
      </AppForm>
    </template>
  </AppModal>
</template>
