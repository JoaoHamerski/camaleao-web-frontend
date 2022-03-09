<script>
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'
import { maskDate } from '@/utils/masks'
import { handleError } from '@/utils/forms'
import Form from '@/utils/Form'
import { expensesReport } from '@/graphql/Expense.gql'

export default {
  data () {
    return {
      isLoading: false,
      icons: {
        faClipboardList
      },
      modal: {
        value: false,
        src: ''
      },
      form: new Form({
        start_date: '',
        final_date: ''
      }),
      hasDateInterval: false,
      maskDate
    }
  },
  methods: {
    async generateReport () {
      const input = this.form.data()

      this.isLoading = true

      try {
        const { data } = await this.$apollo.query({
          query: expensesReport,
          variables: {
            start_date: input.start_date,
            final_date: input.final_date
          },
          fetchPolicy: 'network-only'
        })

        this.$emit('report-generated', data.expensesReport)
      } catch (error) {
        handleError(this, error)
      }

      this.isLoading = false
    }
  }
}
</script>

<template>
  <div>
    <AppCard
      collapsible
      color="success"
    >
      <template #header>
        <h6 class="fw-bold mb-0">
          <FontAwesomeIcon
            :icon="icons.faClipboardList"
            fixed-width
          />
          Relatório
        </h6>
      </template>
      <template #body>
        <AppForm
          :form="form"
          :on-submit="generateReport"
        >
          <div class="row">
            <div class="form-label fw-bold">
              {{ hasDateInterval ? 'Datas' : 'Data' }}
            </div>
            <div class="col">
              <AppInput
                v-model="form.start_date"
                name="start_date"
                placeholder="dd/mm/aaaa"
                type="date"
                :mask="maskDate"
                :error="form.errors.get('start_date')"
              />
            </div>
            <div
              v-if="hasDateInterval"
              class="col"
            >
              <AppInput
                v-model="form.final_date"
                name="final_date"
                placeholder="dd/mm/aaaa"
                type="date"
                :mask="maskDate"
                :error="form.errors.get('final_date')"
              />
            </div>
          </div>

          <AppCheckbox
            id="betweenDates"
            v-model="hasDateInterval"
          >
            Por intervalo de datas
          </AppCheckbox>

          <AppButton
            outlined
            :loading="isLoading"
            @click.prevent="generateReport"
          >
            Gerar relatório
          </AppButton>
        </AppForm>
      </template>
    </AppCard>
  </div>
</template>
