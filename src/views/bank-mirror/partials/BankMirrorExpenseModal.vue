<script>
import { handleError } from '@/utils/forms'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { TieBankMirrorExpense } from '@/graphql/Entry.gql'
import ExpensesForm from '@/views/expenses/index/ExpensesForm.vue'

export default {
  components: {
    ExpensesForm
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    expense: {
      type: Object,
      required: true,
    }
  },
  data () {
    return {
      isLoading: false,
      icons: {
        faLink
      }
    }
  },
  methods: {
    async onSubmit (form, getFormattedForm) {
      const input = getFormattedForm(form)

      this.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: TieBankMirrorExpense,
          variables: { input }
        })

        this.$helpers.clearCacheFrom([
          {fieldName: 'expenses'},
          {fieldName: 'cashFlowEntries'},
        ])

        this.$toast.success('Vinculado com sucesso!')
        this.$emit('success')
      } catch (error) {
        handleError(this.$refs.expensesForm, error)
      }

      this.isLoading = false
    }
  }
}
</script>

<template>
  <AppModal
    id="bankMirrorExpenseModal"
    :value="value"
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faLink"
        fixed-width
      />
      Vincular despesa
    </template>

    <template #body>
      <ExpensesForm
        v-if="value"
        ref="expensesForm"
        :expense="expense"
        hide-bank-entries
      >
        <template #footer="{ form, getFormattedForm}">
          <div class="row">
            <div class="col">
              <AppButton
                color="success"
                block
                btn-class="fw-bold"
                :loading="isLoading"
                :icon="icons.faLink"
                @click.prevent="onSubmit(form, getFormattedForm)"
              >
                Vincular
              </AppButton>
            </div>
            <div class="col">
              <AppButton
                block
                data-bs-dismiss="modal"
                color="light"
                :disabled="isLoading"
              >
                Cancelar
              </AppButton>
            </div>
          </div>
        </template>
      </ExpensesForm>
    </template>
  </AppModal>
</template>
