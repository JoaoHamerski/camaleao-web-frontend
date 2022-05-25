<script>
import { faWrench } from '@fortawesome/free-solid-svg-icons'
import { marked } from 'marked'
import { formatDatetime } from '@/utils/formatters'
import { GetUpdateReports, UpdateReportReadByUser } from '@/graphql/UpdateReport.gql'

marked.setOptions({
  breaks: true
})

export default {
  props: {
    authUser: {
      type: Object,
      required: true
    }
  },
  apollo: {
    updateReports: {
      query: GetUpdateReports,
      result ({loading, data}) {
        if (!loading) {
          if (this.shouldDisplayModal(data.updateReports.data)) {
            this.value = true
          }
        }
      }
    }
  },
  data () {
    return {
      value: false,
      marked,
      updateReports: {
        data: [],
        paginator: {}
      },
      icons: {
        faWrench
      }
    }
  },
  methods: {
    formatDatetime,
    shouldDisplayModal (reports) {
      if (!reports.length) {
        return false
      }

      const lastReport = reports[0]
      const viewByUsers = lastReport.read_by_user_ids

      if (viewByUsers === null) {
        return true
      }

      return !viewByUsers.includes(+this.authUser.id)
    },
    onDismissModal () {
      this.$apollo.mutate({
        mutation: UpdateReportReadByUser
      })
    },
    onDismissModalClick () {
      this.value = false
      this.onDismissModal()
    }
  }
}
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <AppModal
    id="updateReportModal"
    v-model="value"
    @hide="onDismissModal"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faWrench"
        fixed-width
      />
      Atualizações do sistema
    </template>

    <template #body>
      <div
        v-for="report in updateReports.data"
        :key="report.id"
      >
        <div class="fw-bold text-subtitle">
          {{ formatDatetime(report.created_at, 'dd/MM') }}
        </div>
        <span v-html="marked.parse(report.description)" />
      </div>

      <div>
        <AppButton
          color="success"
          btn-class="fw-bold"
          block
          @click.prevent="onDismissModalClick"
        >
          Entendido!
        </AppButton>
      </div>
    </template>
  </AppModal>
</template>
