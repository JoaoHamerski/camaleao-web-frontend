<script>
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'
import roles from '@/constants/roles'
import { GetOrdersWeeklyCalendarReport } from '@/graphql/Order.gql'
import { GetStatus } from '@/graphql/Status.gql'
import { ReorderWeeklyCalendar } from '@/graphql/WeeklyCalendar.gql'

export default {
  apollo: {
    status: {
      query: GetStatus
    }
  },
  props: {
    field: {
      type: String,
      required: true
    },
    isCompact: {
      type: Boolean,
      default: false
    },
    isOrderable: {
      type: Boolean,
      default: false
    },
    date: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      status: [],
      selectedStatus: '',
      roles,
      isReportLoading: false,
      isLoading: false,
      icons: {
        faFilePdf
      }
    }
  },
  methods: {
    onCancelReorderClick () {
      this.onOrderableModeChange(false)
      this.$emit('orderable-mode-canceled')
    },
    async onSaveReorderClick () {
      const input = this.date.orders.map(({id}, index) => ({id, order: index}))

      this.isLoading = true

      await this.$apollo.mutate({
        mutation: ReorderWeeklyCalendar,
        variables: { input }
      })

      this.isLoading = false

      this.onCancelReorderClick()
    },
    onOrderableModeChange (value) {
      this.$emit('orderable-mode-changed', value)
    },
    onCompactModeChange (value) {
      this.$emit('compact-mode-changed', value)
    },
    onImageInput(event) {
      this.$emit('input-image', event)
    },
    async onWeeklyProductionReportClick () {
      const date = this.date.date

      this.isReportLoading = true

      try {
        const data = await this.$apollo.query({
          query: GetOrdersWeeklyCalendarReport,
          variables: {
            input: {
              field: this.field,
              date: date,
              status_id: this.selectedStatus
            }
          },
          fetchPolicy: 'network-only'
        })

        const { data: { ordersWeeklyCalendarReport: src} } = data

        this.$helpers.openInNewTab(src)
      } catch (error) {
        this.$toast.error('Ops! Algo deu errado, tente novamente!')
      }

      this.isReportLoading = false
    }
  }
}
</script>

<template>
  <div>
    <div class="d-flex flex-column flex-sm-row mb-2">
      <div class="d-flex flex-column flex-sm-row col">
        <div class="col text-center text-sm-start col-sm-3">
          <AppInputFile
            v-if="$helpers.canView(
              roles.GERENCIA,
              roles.ATENDIMENTO,
              roles.DESIGN
            )"
            id="orderImage"
            :default-margin="false"
            :disable-input-area="true"
            accept="image/*"
            class="mb-2 mb-sm-0"
            @input="onImageInput"
          />
        </div>
        <div class="col col-sm-6">
          <div class="app-input-group">
            <AppButton
              v-if="$helpers.canView(
                roles.GERENCIA,
                roles.ATENDIMENTO,
                roles.DESIGN,
                roles.COSTURA,
                roles.ESTAMPA
              )"
              class="ms-0 ms-sm-2"
              :icon="icons.faFilePdf"
              btn-class="fw-bold"
              :loading="isReportLoading"
              @click.prevent="onWeeklyProductionReportClick"
            >
              Gerar relatório
            </AppButton>
            <AppSimpleSelect
              id="status"
              v-model="selectedStatus"
              remove-default-margin
              name="status"
              class="col flex-grow-1"
              value-prop="id"
              label-prop="text"
              placeholder="Todos"
              :options="status"
            />
          </div>
        </div>
      </div>
      <div class="d-flex flex-column-reverse flex-sm-row">
        <div
          v-if="isOrderable"
          class="me-2"
        >
          <AppButton
            color="success"
            class="me-2"
            btn-class="btn-sm"
            outlined
            :loading="isLoading"
            @click.prevent="onSaveReorderClick"
          >
            Salvar
          </AppButton>
          <AppButton
            color="secondary"
            btn-class="btn-sm"
            outlined
            :disabled="isLoading"
            @click.prevent="onCancelReorderClick"
          >
            Cancelar
          </AppButton>
        </div>
        <div
          v-if="$helpers.canView(roles.GERENCIA) && field === 'PRINT_DATE'"
          class="mt-2 mt-sm-0"
        >
          <AppCheckboxSwitch
            id="orderable_mode"
            :value="isOrderable"
            class="me-2"
            @input="onOrderableModeChange"
          >
            Reordenar
          </AppCheckboxSwitch>
        </div>
      </div>
      <div v-if="!$isMobile">
        <AppCheckboxSwitch
          id="compact_mode"
          :value="isCompact"
          @input="onCompactModeChange"
        >
          Modo compacto
        </AppCheckboxSwitch>
      </div>
    </div>
  </div>
</template>
