<script>
import { truncate, isEmpty, omit } from 'lodash-es'
import { maskDate, maskCurrencyBRL } from '@/utils/masks'
import { handleError, handleSuccess } from '@/utils/forms'
import { formatBytes } from '@/utils/formatters'
import fileMixin from '@/mixins/filesMixin'
import pasteFilesMixin from '@/mixins/pasteFilesMixin'
import Form from '@/utils/Form'
import { CreateExpense, UpdateExpense } from '@/graphql/Expense.gql'

import ViewerItemsCardFile from '@/components/AppViewer/ViewerItemsCardFile'

export default {
  components: {
    ViewerItemsCardFile
  },
  mixins: [fileMixin, pasteFilesMixin],
  props: {
    expense: {
      type: Object,
      default: () => ({})
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    expenseTypes: {
      type: Array,
      default: () => ([])
    },
    vias: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      maskDate,
      maskCurrencyBRL,
      isLoading: false,
      form: new Form({
        description: '',
        expense_type_id: '',
        value: 'R$ ',
        expense_via_id: '',
        receipt_path: '',
        date: ''
      })
    }
  },
  watch: {
    'form.receipt_path' () {
      if (this.form.errors.get('receipt_path')) {
        this.form.errors.clear('receipt_path')
      }
    }
  },
  beforeDestroy () {
    this.destroyEventListener()
  },
  mounted () {
    this.attachEventListener()

    if (this.isEdit) {
      this.form = new Form({ ...omit(this.expense, 'id') })
    }
  },
  methods: {
    formatBytes,
    truncate,
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
    onDeleteFile () {
      this.form.receipt_path = ''
    },
    async onSubmit () {
      this.isLoading = true

      if (this.isEdit) {
        await this.update()
      } else {
        await this.create()
      }

      this.isLoading = false
    },
    getFormattedData () {
      const data = this.form.data()

      data.receipt_path = data.receipt_path?.base64 || data.receipt_path

      return data
    },
    async update () {
      const input = this.getFormattedData(this.form.data())

      try {
        await this.$apollo.mutate({
          mutation: UpdateExpense,
          variables: {
            id: this.expense.id,
            input
          }
        })

        this.$helpers.clearCacheFrom({ fieldName: 'cashFlowEntries' })

        handleSuccess(this, { message: 'Despesa atualizada!' })
      } catch (error) {
        console.log({ ...error })
        handleError(this, error)
      }
    },
    async create () {
      const input = this.getFormattedData(this.form.data())

      try {
        await this.$apollo.mutate({
          mutation: CreateExpense,
          variables: { input }
        })

        this.$helpers.clearCacheFrom([
          { fieldName: 'expenses' },
          { fieldName: 'cashFlowEntries' }
        ])

        handleSuccess(this, { message: 'Despesa cadastrada!', resetForm: true })
      } catch (error) {
        handleError(this, error)
      }
    }
  }
}
</script>

<template>
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
      <ViewerItemsCardFile
        :is-invalid="!!form.errors.get('receipt_path')"
        :file="form.receipt_path"
        alt="Comprovante de pagamento"
        show-delete-button
        @delete-file="onDeleteFile"
      />
      <div
        v-if="typeof form.receipt_path === 'object'"
        class="small text-secondary text-center"
      >
        ({{ truncate(form.receipt_path.name, { length: 15 }) }} - <b>{{ formatBytes(form.receipt_path.size) }}</b>)
      </div>
    </div>
    <div
      v-if="form.errors.get('receipt_path')"
      class="small text-danger"
    >
      {{ form.errors.get('receipt_path') }}
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

    <div class="row mt-4">
      <div class="col">
        <AppButton
          color="success"
          btn-class="fw-bold"
          :loading="isLoading"
          block
          @click="onSubmit"
        >
          {{ isEdit ? 'Atualizar' : 'Registrar' }}
        </AppButton>
      </div>
      <div class="col">
        <AppButton
          type="button"
          color="light"
          data-bs-dismiss="modal"
          block
        >
          Fechar
        </AppButton>
      </div>
    </div>
  </AppForm>
</template>
