<script>
import {
  faPlus,
  faSyncAlt
} from '@fortawesome/free-solid-svg-icons'
import { isEmpty } from 'lodash-es'

import PendenciesModal from '../partials/daily-cash-pendencies/PendenciesModal.vue'
import DailyCashReminderModal from '../partials/daily-cash-reminder/DailyCashReminderModal.vue'

export default {
  components: {
    PendenciesModal,
    DailyCashReminderModal
  },
  props: {
    pendencies: {
      type: Array,
      default: () => ([])
    },
    activeDate: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      pendenciesModal: false,
      remindersModal: false,
      totalReminders: 0,
      icons: {
        faPlus,
        faSyncAlt
      }
    }
  },
  computed: {
    totalPendencies () {
      if (isEmpty(this.pendencies)) {
        return 0
      }

      return this.pendencies.reduce((total, current) => {
        return total + current.total
      }, 0)
    }
  },
  methods: {
    onPendenciesClick () {
      this.pendenciesModal = true
    },
    onRemindersClick () {
      this.remindersModal = true
    },
    onLoadPendenciesFromDate (date) {
      this.pendenciesModal = false
      this.$emit('load-pendencies-from-date', date)
    },
    onResetPaymentsClick () {
      this.$emit('reset-payments')
    }
  }
}
</script>

<template>
  <div>
    <PendenciesModal
      v-model="pendenciesModal"
      :pendencies="pendencies"
      :active-date="activeDate"
      @load-pendencies-from-date="onLoadPendenciesFromDate"
    />

    <DailyCashReminderModal
      v-model="remindersModal"
      @total-reminders="totalReminders = $event"
    />

    <div class="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center">
      <div class="mb-2 mb-sm-0">
        <AppButton
          class="fw-bold mb-2 mb-sm-0 "
          :block="$isMobile"
          color="success"
          btn-class="btn-lg"
          :icon="icons.faPlus"
          @click="$emit('on-new-entry-click')"
        >
          Entrada
        </AppButton>
        <AppButton
          class="fw-bold mb-2 mb-sm-0 mx-0 mx-sm-2"
          :block="$isMobile"
          color="danger"
          btn-class="btn-lg"
          :icon="icons.faPlus"
          @click="$emit('on-new-expense-click')"
        >
          Saída
        </AppButton>
        <AppButton
          btn-class="fw-bold btn-lg"
          :icon="icons.faPlus "
          :block="$isMobile"
          @click="$emit('on-reminder-click')"
        >
          Agendar
        </AppButton>
      </div>
      <div class="d-flex flex-sm-row flex-column">
        <AppButton
          color="warning"
          class="flex-grow-1 fw-bold me-0 me-sm-1 mb-1 mb-sm-0"
          @click="onRemindersClick"
        >
          Agendados
          <span class="badge rounded-pill bg-light text-dark">{{ totalReminders }}</span>
        </AppButton>
        <AppButton
          color="warning"
          class="flex-grow-1 fw-bold mb-1 mb-sm-0"
          @click="onPendenciesClick"
        >
          Pendências <span class="badge rounded-pill bg-light text-dark">{{ totalPendencies }}</span>
        </AppButton>
        <AppButton
          :icon="icons.faSyncAlt"
          outlined
          class="ms-sm-1"
          @click="onResetPaymentsClick"
        />
      </div>
    </div>
  </div>
</template>
