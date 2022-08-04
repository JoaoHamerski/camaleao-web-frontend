<script>
import { GetDailyCashReminderDates } from '@/graphql/DailyCashReminder.gql'
import { formatDatetime } from '@/utils/formatters'
import DailyCashRemindersByDate from './DailyCashRemindersByDate.vue'

export default {
  components: {
    DailyCashRemindersByDate
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  apollo: {
    dailyCashReminderDates: {
      query: GetDailyCashReminderDates,
      result ({loading, data: {dailyCashReminderDates}}) {
        if (!loading) {
          const total = dailyCashReminderDates.reduce((total, current) => {
            return total + current.total
          }, 0)

          this.$emit('total-reminders', total)
        }
      }
    }
  },
  data () {
    return {
      formatDatetime,
      dailyCashReminderDates: [],
      selectedDate: ''
    }
  },
  methods: {
    onReminderClick (reminder) {
      this.selectedDate = reminder.date
    },
    onRemindersByDateClose () {
      this.selectedDate = ''
    }
  }
}
</script>
<template>
  <AppModal
    id="dailyCashReminderModal"
    color="warning"
    :value="value"
    modal-dialog-class="modal-lg"
    v-on="$listeners"
  >
    <template #title>
      <span class="text-dark">Agendados</span>
    </template>
    <template #body>
      <AppTransition
        mode="out-in"
        enter="fadeIn"
        speed="fast"
      >
        <template v-if="!selectedDate">
          <div
            v-if="dailyCashReminderDates.length"
            class="list-group"
          >
            <a
              v-for="reminder in dailyCashReminderDates"
              :key="reminder.id"
              class="list-group-item list-group-item-action d-flex justify-content-between link-primary"
              href="#"
              @click.prevent="onReminderClick(reminder)"
            >
              <div class="fw-bold">
                {{ formatDatetime(reminder.date) }}
              </div>
              <span class="badge bg-primary align-self-center py-2">
                {{ reminder.total }}
              </span>
            </a>
          </div>
          <div
            v-else
            class="my-4 text-center text-secondary"
          >
            Nenhum agendamento encontrado
          </div>
        </template>
        <template v-else>
          <DailyCashRemindersByDate
            :date="selectedDate"
            @close="onRemindersByDateClose"
          />
        </template>
      </AppTransition>

      <div class="text-end mt-3">
        <AppButton
          data-bs-dismiss="modal"
          color="light"
        >
          Fechar
        </AppButton>
      </div>
    </template>
  </AppModal>
</template>
