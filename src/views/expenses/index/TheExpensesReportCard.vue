<script>
import Form from '@/utils/Form'
import { handleError } from '@/utils/forms'
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'
import { maskDate } from '@/utils/masks'
import ViewerFileModal from '@/components/AppViewer/ViewerFileModal'

const EXPENSES_REPORT_PATH_URL = '/api/expenses/report'

export default {
  chimera: {
    _validateReport () {
      return {
        method: 'POST',
        url: 'api/expenses/report-validate',
        on: {
          error ({ error }) {
            handleError(this, error)
          }
        }
      }
    }
  },
  components: {
    ViewerFileModal
  },
  data () {
    return {
      icons: {
        faClipboardList
      },
      modal: {
        value: false,
        src: ''
      },
      form: new Form({
        start_date: '',
        end_date: ''
      }),
      hasDateInterval: false,
      maskDate
    }
  },
  computed: {
    apiUrl () {
      return this.$store.getters.apiURL
    }
  },
  methods: {
    generateUrl (data) {
      const url = new URL(this.apiUrl + EXPENSES_REPORT_PATH_URL)
      url.search = new URLSearchParams(data)

      return url.toString()
    },
    async generateReportModal () {
      const data = this.form.data()

      if (!this.hasDateInterval) {
        data.end_date = ''
      }

      try {
        this.form.errors.clear('*')

        await this.$chimera._validateReport.fetch(true, {
          params: data
        })

        this.modal.src = this.generateUrl(data)
        this.modal.value = true
      } catch (error) {}
    },
    onModalHidden () {
      this.modal.src = ''
    }
  }
}
</script>

<template>
  <div>
    <ViewerFileModal
      v-model="modal.value"
      :src="modal.src"
      @hidden="onModalHidden"
    />

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
          :on-submit="generateReportModal"
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
                v-model="form.end_date"
                name="end_date"
                placeholder="dd/mm/aaaa"
                type="date"
                :mask="maskDate"
                :error="form.errors.get('end_date')"
              />
            </div>
          </div>
        </AppForm>
        <AppCheckbox
          id="betweenDates"
          v-model="hasDateInterval"
        >
          Por intervalo de datas
        </AppCheckbox>
        <AppButton
          outlined
          @click="generateReportModal"
        >
          Gerar relatório
        </AppButton>
      </template>
    </AppCard>
  </div>
</template>
