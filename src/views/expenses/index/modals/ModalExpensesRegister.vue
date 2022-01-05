<script>
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { maskDate, maskCurrencyBRL } from '@/utils/masks'
import Form from '@/utils/Form'

export default {
  chimera: {
    _vias () {
      return {
        method: 'GET',
        url: 'api/vias',
        on: {
          success ({ data }) {
            this.vias = data.data
          }
        }
      }
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    expenseTypes: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      vias: [],
      icons: {
        faPlus
      },
      form: new Form({
        description: '',
        expense_type_id: '',
        value: 'R$ ',
        expense_via_id: '',
        recepit_path: '',
        date: ''
      }),
      maskDate,
      maskCurrencyBRL
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
    id="expensesRegisterModal"
    :value="value"
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faPlus"
        fixed-width
      />
      Nova despesa
    </template>

    <template #body>
      <AppForm
        :on-submit="onSubmit"
        :form="form"
      >
        <AppInput
          id="description"
          v-model="form.description"
          name="description"
          placeholder="Descrição da despesa..."
        >
          Descrição
        </AppInput>

        <AppSimpleSelect
          id="expense_type_id"
          v-model="form.expense_type_id"
          name="expense_type_id"
          :options="expenseTypes"
          label-prop="name"
          placeholder="Selecione um tipo"
        >
          Tipo de despesa
        </AppSimpleSelect>

        <div class="row">
          <div class="col">
            <AppInput
              id="value"
              v-model="form.value"
              name="value"
              :mask="maskCurrencyBRL()"
            >
              Valor
            </AppInput>
          </div>
          <div class="col">
            <AppSimpleSelect
              id="expense_via_id"
              v-model="form.expense_via_id"
              name="expense_via_id"
              :options="vias"
              label-prop="name"
            >
              Via
            </AppSimpleSelect>
          </div>
        </div>

        <AppInput
          v-model="form.receipt_path"
          name="receipt_path"
        >
          Comprovante
        </AppInput>
        <AppInput
          id="date"
          v-model="form.date"
          name="date"
          :mask="maskDate"
          placeholder="dd/mm/aaaa"
        >
          Data
        </AppInput>

        <div class="d-flex justify-content-between mt-4">
          <AppButton
            color="success"
            btn-class="fw-bold"
          >
            Registrar
          </AppButton>
          <AppButton
            color="light"
            data-bs-dismiss="modal"
          >
            Fechar
          </AppButton>
        </div>
      </AppForm>
    </template>
  </AppModal>
</template>
