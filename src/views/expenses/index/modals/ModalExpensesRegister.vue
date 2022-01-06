<script>
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { maskDate, maskCurrencyBRL } from '@/utils/masks'
import { isEmpty } from 'lodash-es'
import fileMixin from '@/mixins/filesMixin'
import Form from '@/utils/Form'

export default {
  mixins: [fileMixin],
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
        receipt_path: '',
        date: ''
      }),
      maskDate,
      maskCurrencyBRL
    }
  },
  methods: {
    async onReceiptUploaded (fileList) {
      const files = await this.getBase64Files(fileList)
      const validFiles = this.getOnlyValidFiles(files, ['pdf', 'image'])

      if (!isEmpty(validFiles)) {
        this.form.receipt_path = validFiles[0]
      }
    },
    onDeleteAttach () {
      this.form.receipt_path = ''
    },
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
    data-bs-keyboard="false"
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

        <AppInputFile
          id="receipt_path"
          accept="image/*,application/pdf"
          centered
          @input="onReceiptUploaded"
        >
          Comprovante
        </AppInputFile>

        <AppViewerItems
          show-delete-button
          col="5"
          :attachments="[form.receipt_path]"
          @delete-attach="onDeleteAttach"
        />

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
