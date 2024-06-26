<script>
// Utils
import { truncate, isEmpty, omit } from 'lodash-es'
import { maskDate, maskCurrencyBRL } from '@/utils/masks'
import { handleError, handleSuccess } from '@/utils/forms'
import { formatBytes, formatDatetime, formatCurrencyBRL } from '@/utils/formatters'
import fileMixin from '@/mixins/filesMixin'
import pasteFilesMixin from '@/mixins/pasteFilesMixin'
import Form from '@/utils/Form'

// Graphql
import {
  GetExpenses,
  CreateExpense,
  UpdateExpense,
  GetProductTypeExpensesByMonth,
  GetEmployeeExpensesByMonth
} from '@/graphql/Expense.gql'
import { GetExpenseTypes } from '@/graphql/ExpenseType.gql'
import { GetDailyCash, GetDailyCashBalance } from '@/graphql/DailyCash.gql'
import { GetVias } from '@/graphql/Via.gql'
import { GetProductTypes } from '@/graphql/ProductType.gql'
import { GetConfig } from '@/graphql/Config.gql'
import { GetUsers } from '@/graphql/User.gql'

// Components
import ViewerItemsCardFile from '@/components/AppViewer/ViewerItemsCardFile.vue'
import SelectEntriesFind from '@/views/resources/SelectEntriesFind.vue'

const NUMBER_OF_QUERIES = 6

export default {
  components: {
    ViewerItemsCardFile,
    SelectEntriesFind
  },
  mixins: [fileMixin, pasteFilesMixin],
  apollo: {
    vias: {
      query: GetVias,
      result () {
        this.loadingQueries--
      }
    },
    expenseTypes: {
      query: GetExpenseTypes,
      result () {
        this.loadingQueries--
      }
    },
    productTypes: {
      query: GetProductTypes,
      result () {
        this.loadingQueries--
      }
    },
    users: {
      query: GetUsers,
      result () {
        this.loadingQueries--
      }
    },
    productTypeExpense: {
      query: GetConfig,
      variables: {
        name: 'app',
        key: 'product_types_expense',
        encoded: false
      },
      update ({configGet}) {
        return configGet
      },
      result () {
        this.loadingQueries--
      }
    },
    employeeExpense: {
      query: GetConfig,
      variables: {
        name: 'app',
        key: 'employee_expense',
        encoded: false
      },
      update({configGet}) {
        return configGet
      },
      result () {
        this.loadingQueries--
      }
    }
  },
  props: {
    hideBankEntries: {
      type: Boolean,
      default: false
    },
    expense: {
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
      maskDate,
      maskCurrencyBRL,
      isLoading: false,
      vias: [],
      productTypeExpense: null,
      employeeExpense: null,
      expenseTypes: [],
      productTypes: [],
      users: [],
      loadingQueries: NUMBER_OF_QUERIES,
      bank_entry: '',
      form: new Form({
        description: '',
        value: 'R$ ',
        date: '',
        bank_uid: '',
        receipt_path: '',
        expense_type_id: '',
        product_type_id: '',
        employee_id: '',
        expense_via_id: '',
        filename_entry_from: '',
      })
    }
  },
  computed: {
    isFromBankEntry () {
      return !isEmpty(this.form.bank_uid)
        || !isEmpty(this.expense.bank_uid)
        || !isEmpty(this.bank_entry)
    },
    isQueryLoading () {
      return this.loadingQueries > 0
    },
    expenseSelected () {
      return this.expenseTypes.find((type) => type.id === this.form.expense_type_id)
    }
  },
  watch: {
    loadingQueries: {
      immediate: true,
      handler () {
        if (!this.isQueryLoading && (this.isEdit || !isEmpty(this.expense))) {
          this.populateForm()
        }
      }
    },
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
  },
  methods: {
    formatBytes,
    truncate,
    populateForm () {
      this.form = new Form({
        ...this.form.data(),
        ...omit(this.expense, ['id', 'value', 'date']),
        ...{
          date: formatDatetime(this.expense.date),
          value: formatCurrencyBRL(this.expense.value),
        },
      })
    },
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
      const input = this.getFormattedForm(this.form.data())

      this.isLoading = true

      if (this.isEdit) {
        await this.update(input)
      } else {
        await this.create(input)
      }

      this.isLoading = false
    },
    getFormattedForm () {
      const data = this.form.data()

      data.receipt_path = data.receipt_path?.base64 || data.receipt_path

      return data
    },
    async update (input) {
      try {
        await this.$apollo.mutate({
          mutation: UpdateExpense,
          variables: {
            id: this.expense.id,
            input
          },
          refetchQueries: [
            GetDailyCash,
            GetProductTypeExpensesByMonth,
            GetEmployeeExpensesByMonth
          ],
          awaitRefetchQueries: true
        })

        this.$helpers.clearCacheFrom({ fieldName: 'cashFlowEntries' })

        handleSuccess(this, { message: 'Despesa atualizada!' })
      } catch (error) {
        handleError(this, error)
      }
    },
    async create (input) {
      try {
        await this.$apollo.mutate({
          mutation: CreateExpense,
          variables: { input },
          refetchQueries: [
            GetExpenses,
            GetDailyCash,
            GetDailyCashBalance,
            GetProductTypeExpensesByMonth,
            GetEmployeeExpensesByMonth
          ],
          awaitRefetchQueries: true
        })

        this.$helpers.clearCacheFrom([
          { fieldName: 'expenses' },
          { fieldName: 'cashFlowEntries' },
          { fieldName: 'dailyCash'}
        ])

        handleSuccess(this, { message: 'Despesa cadastrada!', resetForm: true })
      } catch (error) {
        handleError(this, error)
      }
    },
    onSelectEntry (entry) {
      this.form.set({
        bank_uid: entry.bank_uid,
        value: formatCurrencyBRL(Math.abs(entry.value)),
        date: entry.date,
        description: entry.description,
      })
    }
  }
}
</script>

<template>
  <AppForm
    :on-submit="onSubmit"
    :form="form"
  >
    <AppLoading v-show="isQueryLoading" />

    <AppAlert
      v-if="form.errors.get('bank_uid')"
      color="warning"
      small
    >
      {{ form.errors.get('bank_uid') }}
    </AppAlert>

    <SelectEntriesFind
      v-if="!hideBankEntries"
      v-model="bank_entry"
      is-expense
      @select="onSelectEntry"
    />

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

    <AppSimpleSelect
      v-show="employeeExpense === form.expense_type_id"
      id="employee_id"
      v-model="form.employee_id"
      :options="users"
      name="employee_id"
      label-prop="name"
      placeholder="Selecione um funcionário"
      :error="form.errors.get('employee_id')"
    >
      Funcionário
      <template
        v-if="expenseSelected"
        #hint
      >
        O campo produto é obrigatório quando a despesa é <b>{{ expenseSelected.name }}</b>
      </template>
    </AppSimpleSelect>

    <AppSimpleSelect
      v-show="productTypeExpense === form.expense_type_id"
      id="product_type_id"
      v-model="form.product_type_id"
      name="product_type_id"
      :options="productTypes"
      label-prop="name"
      placeholder="Selecione um produto"
      :error="form.errors.get('product_type_id')"
    >
      Produto
      <template
        v-if="expenseSelected"
        #hint
      >
        O campo produto é obrigatório quando a despesa é <b>{{ expenseSelected.name }}</b>
      </template>
    </AppSimpleSelect>

    <div class="row">
      <div class="col-12 col-sm">
        <AppInput
          id="value"
          v-model="form.value"
          name="value"
          :mask="maskCurrencyBRL()"
          :error="form.errors.get('value')"
          numeric
          :disabled="isFromBankEntry"
        >
          Valor
        </AppInput>
      </div>
      <div class="col-12 col-sm">
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
      :default-margin="false"
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
      numeric
      :mask="maskDate"
      placeholder="dd/mm/aaaa"
      :error="form.errors.get('date')"
      today-button
      :disabled="isFromBankEntry"
    >
      Data
    </AppInput>

    <slot
      v-if="$scopedSlots.footer"
      name="footer"
      :form="form"
      :get-formatted-form="getFormattedForm"
    />
    <div
      v-else
      class="row mt-4"
    >
      <div class="col">
        <AppButton
          color="success"
          btn-class="fw-bold"
          :loading="isLoading"
          block
          @click.prevent="onSubmit"
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
