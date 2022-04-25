<script>
import { GetConfig } from '@/graphql/Config.gql'

import { pick, cloneDeep } from 'lodash-es'
import { faTshirt, faCut, faTruck } from '@fortawesome/free-solid-svg-icons'
import Form from '@/utils/Form'
import { UpdateUpdatableStatusFromWeeklyCalendar } from '@/graphql/WeeklyCalendar.gql'
import { CALENDAR_MAP } from './ModalWeeklyCalendarStatus.vue'

export default {
  apollo: {
    updateStatusMap: {
      query: GetConfig,
      variables: {
        name: 'status',
        key: 'update_status_map',
        encoded: true
      },
      result ({loading, data}) {
        if (!loading) {
          this.populateForm()
        }
      },
      update ({configGet}) {
        if (!configGet) {
          return []
        }

        return JSON.parse(configGet)
      }
    }
  },
  props: {
    statusList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isLoading: false,
      CALENDAR_MAP,
      updateStatusMap: [],
      form: new Form({
        'print_date': {
          status: [],
          update_to: ''
        },
        'seam_date': {
          status: [],
          update_to: ''
        },
        'delivery_date': {
          status: [],
          update_to: ''
        }
      })
    }
  },
  computed: {
    isQueryLoading () {
      return !!this.$apollo.queries.updateStatusMap.loading
    }
  },
  mounted () {
    this.populateForm()
  },
  methods: {
    getIcon(key) {
      if (key === 'print_date') {
        return faTshirt
      }

      if (key === 'seam_date') {
        return faCut
      }

      if(key === 'delivery_date') {
        return faTruck
      }
    },
    populateForm() {
      this.updateStatusMap.forEach(({field, status_is, update_to}) => {
        this.form[field].status = this.statusList.filter(
          ({id}) => status_is.includes(id) || status_is.includes(+id)
        )

        this.form[field].update_to = this.statusList.find(
          ({id}) => update_to === id || update_to === +id
        )
      })
    },
    getFormattedForm() {
      const data = cloneDeep(this.form.data())
      const calendarMap = pick(CALENDAR_MAP, ['print_date', 'seam_date'])

      for (const key in calendarMap) {
        data[key].status = data[key].status.map(({id}) => id)
        data[key].update_to = data[key].update_to.id || ''
      }

      return data
    },
    async onSubmit () {
      const input = this.getFormattedForm()

      this.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: UpdateUpdatableStatusFromWeeklyCalendar,
          variables: { input },
          refetchQueries: ['configGet'],
          awaitRefetchQueries: true
        })

        this.$helpers.clearCacheFrom([
          {fieldName: 'configGet'},
          {fieldName: 'weeklyCalendar'}
        ])

        this.$toast.success('Status atualizados!')
      } catch (error) {
        this.$toast.error('Ops, algo deu errado!')
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
    <AppLoading v-show="isQueryLoading" />
    <div class="mb-3">
      <div class="fw-bold text-subtitle text-primary horizontal-line text-center">
        <span>Status ao concluir</span>
      </div>

      <small class="text-secondary">
        Selecione qual será o próximo status ao concluir um determinado status.
      </small>
    </div>

    <div
      v-for="(calendar, key) in CALENDAR_MAP"
      :key="key"
      class="mb-3"
    >
      <div class="fw-bold text-primary">
        <FontAwesomeIcon
          :icon="getIcon(key)"
          fixed-width
        />
        Calendário de {{ calendar }}
      </div>
      <AppSelect
        :id="key"
        v-model="form[key].status"
        :name="key"
        :options="statusList"
        track-by="id"
        :custom-label="({text}) => text"
        :close-on-select="false"
        multiple
      >
        Quando o status for:
      </AppSelect>
      <AppSelect
        v-model="form[key].update_to"
        :options="statusList"
        track-by="id"
        :custom-label="({text}) => text"
      >
        Ao concluir, atualizar para:
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
