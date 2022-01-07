<script>
import { truncate, isEmpty } from 'lodash-es'
import { formatBytes } from '@/utils/formatters'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { maskDate, maskCurrencyBRL } from '@/utils/masks'
import fileMixin from '@/mixins/filesMixin'
import pasteFilesMixin from '@/mixins/pasteFilesMixin'
import { handleError } from '@/utils/forms'
import Form from '@/utils/Form'

import ViewerItemsCardAttach from '@/components/AppViewer/ViewerItemsCardAttach'

export default {
  components: {
    ViewerItemsCardAttach
  },
  mixins: [fileMixin, pasteFilesMixin],
  chimera: {
    _newExpense () {
      return {
        method: 'POST',
        url: 'api/expenses',
        on: {
          success ({ data }) {
            console.log(data)
          },
          error ({ error }) {
            handleError(this, error)
          }
        }
      }
    },
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
      isLoading: false,
      maskDate,
      maskCurrencyBRL
    }
  },
  methods: {
    truncate,
    formatBytes,
    attachEventListener () {
      document.addEventListener('paste', this.onPasteEvent)
    },
    destroyEventListener () {
      document.removeEventListener('paste', this.onPasteEvent)
    },
    afterPaste (files) {
      const validFiles = this.getOnlyValidFiles(files, ['pdf', 'image'])
      this.form.receipt_path = validFiles[0]
    },
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
    async onSubmit () {
      const data = this.form.data()

      data.receipt_path = data.receipt_path.base64

      this.isLoading = true

      try {
        await this.$chimera._newExpense.fetch(true, {
          params: { ...data }
        })
      } catch (error) {}

      this.isLoading = false
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
    @show="attachEventListener"
    @hide="destroyEventListener"
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
          :error="form.errors.get('description')"
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
          :error="form.errors.get('expense_type_id')"
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
              :error="form.errors.get('value')"
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
              :error="form.errors.get('expense_via_id')"
            >
              Via
            </AppSimpleSelect>
          </div>
        </div>

        <AppInputFile
          id="receipt_path"
          accept="image/*,application/pdf"
          centered
          optional
          @input="onReceiptUploaded"
        >
          Comprovante
        </AppInputFile>

        <div
          v-if="form.receipt_path"
          class="col-5"
        >
          <ViewerItemsCardAttach
            :attach="form.receipt_path"
            alt="Comprovante de pagamento"
            show-delete-button
            @delete-attach="onDeleteAttach"
          />
          <div class="small text-secondary text-center">
            ({{ truncate(form.receipt_path.name, { length: 15 }) }} - <b>{{ formatBytes(form.receipt_path.size) }}</b>)
          </div>
        </div>

        <AppInput
          id="date"
          v-model="form.date"
          name="date"
          type="date"
          :mask="maskDate"
          placeholder="dd/mm/aaaa"
          :error="form.errors.get('date')"
        >
          Data
        </AppInput>

        <div class="d-flex justify-content-between mt-4">
          <AppButton
            color="success"
            btn-class="fw-bold"
            :loading="isLoading"
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
