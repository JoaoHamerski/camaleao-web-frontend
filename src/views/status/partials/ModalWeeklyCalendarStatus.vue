<script>
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

      <AppTransition
        v-if="value"
        mode="out-in"
        enter="fadeIn"
        speed="faster"
      >
        <StatusCalendarConcludeForm
          v-if="option === FORMS_OPTIONS.CONCLUDE"
          :status-list="statusList"
        />
        <StatusCalendarUpdateForm
          v-else
          :status-list="statusList"
        />
      </AppTransition>
    </template>
  </AppModal>
</template>
