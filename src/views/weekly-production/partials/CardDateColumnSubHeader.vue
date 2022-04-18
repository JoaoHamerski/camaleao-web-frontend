<script>
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'
import roles from '@/constants/roles'
import { GetOrdersWeeklyProductionReport } from '@/graphql/Order.gql'
import { GetStatus } from '@/graphql/Status.gql'

export default {
  apollo: {
    status: {
      query: GetStatus
    }
  },
  props: {
    isCompact: {
      type: Boolean,
      required: true
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
      icons: {
        faFilePdf
      }
    }
  },
  methods: {
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
          query: GetOrdersWeeklyProductionReport,
          variables: {
            input: {
              production_date: date,
              status_id: this.selectedStatus
            }
          },
          fetchPolicy: 'network-only'
        })

        const { data: { ordersWeeklyProductionReport: src} } = data

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
    <div class="d-flex justify-content-between mb-2">
      <div class="d-flex flex-column flex-sm-row mx-auto mx-sm-0 col">
        <div class="col-2">
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
        <div class="col-5">
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
              class="col-5"
              value-prop="id"
              label-prop="text"
              placeholder="Todos"
              :options="status"
            />
          </div>
        </div>
      </div>
      <div
        v-if="!$isMobile"
        class="col-2"
      >
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
