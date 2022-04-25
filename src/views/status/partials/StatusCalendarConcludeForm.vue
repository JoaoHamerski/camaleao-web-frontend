<script>
import Form from '@/utils/Form'
import { GetConfig } from '@/graphql/Config.gql'
import { UpdateConcludeStatusFromWeeklyCalendar } from '@/graphql/WeeklyCalendar.gql'
import { handleSuccess } from '@/utils/forms'

import { CALENDAR_MAP } from './ModalWeeklyCalendarStatus.vue'

export default {
  props: {
    statusList: {
      type: Array,
      required: true
    },
    concludeStatusMap: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      CALENDAR_MAP,
      isLoading: false,
      form: new Form({
        'print_date': [],
        'seam_date': [],
        'delivery_date': []
      }),
    }
  },
  mounted () {
    this.populateForm()
  },
  methods: {
    populateForm () {
      this.concludeStatusMap.forEach(({field, status}) => {
        const statusConcludedFromField = this.statusList.filter(
          ({id}) => status.includes(id) || status.includes(+id)
        )

        this.form[field] = statusConcludedFromField
      })
    },
    getFormattedForm () {
      const data = this.form.data()

      for (const key in CALENDAR_MAP) {
        data[key] = data[key].map(({id}) => id)
      }

      return data
    },
    async onSubmit () {
      const input = this.getFormattedForm()

      this.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: UpdateConcludeStatusFromWeeklyCalendar,
          variables: { input },
          refetchQueries: [GetConfig],
          awaitRefetchQueries: true
        })

        handleSuccess(this, { message: 'Status alterados!' })

        this.$helpers.clearCacheFrom([
          {fieldName: 'weeklyCalendar'}
        ])
      } catch (error) {
        this.$toast.error('Ops! Algo deu errado!')
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
    <div class="mb-3">
      <div class="fw-bold text-subtitle text-primary horizontal-line text-center">
        <span>Status concluídos</span>
      </div>
      <small class="text-secondary">
        Selecione quais status devem aparecer em <strong>cinza</strong> como <strong>concluídos</strong> no calendário mensal
      </small>
    </div>

    <div
      v-for="(calendar, key) in CALENDAR_MAP"
      :key="key"
    >
      <AppSelect
        :id="key"
        v-model="form[key]"
        :name="key"
        :options="statusList"
        :custom-label="({text}) => text"
        track-by="id"
        :close-on-select="false"
        multiple
      >
        Calendário de {{ calendar }}
      </AppSelect>
    </div>

    <div class="row mt-4">
      <div class="col">
        <AppButton
          color="success"
          btn-class="fw-bold"
          block
          :loading="isLoading"
        >
          Concluir
        </AppButton>
      </div>
      <div class="col">
        <AppButton
          type="button"
          color="light"
          block
          data-bs-dismiss="modal"
          :disabled="isLoading"
        >
          Fechar
        </AppButton>
      </div>
    </div>
  </AppForm>
</template>
