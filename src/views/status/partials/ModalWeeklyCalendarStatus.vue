<script>
import { GetConfig } from '@/graphql/Config.gql'

export const CALENDAR_MAP = {
  print_date: 'Estampa',
  seam_date: 'Costura',
  delivery_date: 'Entrega'
}

const FORMS_OPTIONS = {
  CONCLUDE: 'conclude',
  ON_UPDATE: 'on_update'
}

import StatusCalendarConcludeForm from './StatusCalendarConcludeForm.vue'
import StatusCalendarUpdateForm from './StatusCalendarUpdateForm.vue'

export default {
  components: {
    StatusCalendarConcludeForm,
    StatusCalendarUpdateForm
  },
  apollo: {
    concludeStatusMap: {
      query: GetConfig,
      variables: {
        name: 'status',
        key: 'conclude_status_map',
        encoded: true
      },
      update ({configGet}) {
        if (!configGet) {
          return []
        }

        return JSON.parse(configGet)
      }
    },
    updateStatusMap: {
      query: GetConfig,
      variables: {
        name: 'status',
        key: 'update_status_map',
        encoded: true
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
    value: {
      type: Boolean,
      default: false
    },
    statusList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      FORMS_OPTIONS,
      loaded: false,
      option: FORMS_OPTIONS.CONCLUDE,
      concludeStatusMap: [],
      updateStatusMap: []
    }
  },
  computed: {
    isLoading () {
      return !!this.$apollo.queries.concludeStatusMap.loading
        || !!this.$apollo.queries.updateStatusMap.loading
    }
  },
  methods: {
    onOptionChange (option) {
      this.option = option
    }
  }
}
</script>
<template>
  <AppModal
    id="modalWeeklyCalendarStatus"
    :value="value"
    modal-body-class="position-relative"
    centered
    v-on="$listeners"
  >
    <template #title>
      Gerenciamento status do calendário semanal
    </template>

    <template #body>
      <div class="mb-4">
        <nav>
          <ul class="nav nav-pills nav-justified">
            <li class="nav-item">
              <button
                :class="option === FORMS_OPTIONS.CONCLUDE && 'active fw-bold'"
                class="nav-link"
                role="tab"
                :aria-selected="option === FORMS_OPTIONS.CONCLUDE"
                @click.prevent="onOptionChange(FORMS_OPTIONS.CONCLUDE)"
              >
                Status concluídos
              </button>
            </li>
            <li class="nav-item">
              <button
                :class="option === FORMS_OPTIONS.ON_UPDATE && 'active fw-bold'"
                class="nav-link"
                role="tab"
                :aria-selected="option === FORMS_OPTIONS.ON_UPDATE"
                @click.prevent="onOptionChange(FORMS_OPTIONS.ON_UPDATE)"
              >
                Status ao concluir
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div
        v-show="isLoading"
        class="py-5 my-5"
      >
        <AppLoading />
      </div>

      <template v-if="!isLoading">
        <AppTransition
          mode="out-in"
          enter="fadeIn"
          speed="faster"
        >
          <StatusCalendarConcludeForm
            v-if="option === FORMS_OPTIONS.CONCLUDE"
            :status-list="statusList"
            :conclude-status-map="concludeStatusMap"
          />
          <StatusCalendarUpdateForm
            v-else
            :status-list="statusList"
            :update-status-map="updateStatusMap"
          />
        </AppTransition>
      </template>
    </template>
  </AppModal>
</template>
