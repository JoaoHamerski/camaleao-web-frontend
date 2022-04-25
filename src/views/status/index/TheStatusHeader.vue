<script>
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import ModalStatusNew from '../partials/ModalStatusNew.vue'
import ModalStatusAvailable from '../partials/ModalStatusAvailable.vue'
import ModalWeeklyCalendarStatus from '../partials/ModalWeeklyCalendarStatus.vue'

export default {
  components: {
    ModalStatusNew,
    ModalStatusAvailable,
    ModalWeeklyCalendarStatus
  },
  props: {
    statusList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      modalNew: false,
      modalAvailableStatus: false,
      modalWeeklyCalendarStatus: false,
      icons: {
        faPlus
      }
    }
  },
  methods: {
    onNewStatusClick () {
      this.modalNew = true
    },
    onModalNewSuccess () {
      this.modalNew = false
    },
    onAvailableStatusClick () {
      this.modalAvailableStatus = true
    },
    onAvailableStatusSuccess () {
      this.modalAvailableStatus = false
    },
    onWeeklyCalendarStatusClick () {
      this.modalWeeklyCalendarStatus = true
    }
  }
}
</script>

<template>
  <div class="d-flex flex-column flex-sm-row justify-content-between mb-2">
    <ModalStatusNew
      v-model="modalNew"
      @success="onModalNewSuccess"
    />

    <ModalStatusAvailable
      v-model="modalAvailableStatus"
      :status-list="statusList"
      @success="onAvailableStatusSuccess"
    />

    <ModalWeeklyCalendarStatus
      v-model="modalWeeklyCalendarStatus"
      :status-list="statusList"
    />

    <AppButton
      :icon="icons.faPlus"
      color="success"
      btn-class="fw-bold"
      @click.prevent="onNewStatusClick"
    >
      Novo status
    </AppButton>

    <div class="mt-2 mt-sm-0">
      <AppButton
        btn-class="fw-bold"
        class="me-2"
        :block="$isMobile"
        @click.prevent="onWeeklyCalendarStatusClick"
      >
        Status do calendário semanal
      </AppButton>

      <AppButton
        class="mt-1 mt-sm-0"
        btn-class="fw-bold"
        :block="$isMobile"
        @click.prevent="onAvailableStatusClick"
      >
        Status disponíveis
      </AppButton>
    </div>
  </div>
</template>
