<script>
import { faPlus, faSync} from '@fortawesome/free-solid-svg-icons'
import { GetStatus } from '@/graphql/Status.gql'

import ModalStatusNew from '../partials/ModalStatusNew.vue'
import ModalStatusAvailable from '../partials/ModalStatusAvailable.vue'
import ModalWeeklyCalendarStatus from '../partials/ModalWeeklyCalendarStatus.vue'

export default {
  components: {
    ModalStatusNew,
    ModalStatusAvailable,
    ModalWeeklyCalendarStatus
  },
  apollo: {
    status: {
      query: GetStatus
    }
  },
  data () {
    return {
      modalNew: false,
      modalAvailableStatus: false,
      modalWeeklyCalendarStatus: false,
      isSyncLoading: false,
      icons: {
        faPlus,
        faSync
      }
    }
  },
  computed: {
    isQueryLoading () {
      return !!this.$apollo.queries.status.loading
    },
    syncMessage () {
      return 'Sincronize o Controle de Pedidos com as alterações feitas nos status'
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
      :status-list="status"
      @success="onAvailableStatusSuccess"
    />

    <ModalWeeklyCalendarStatus
      v-model="modalWeeklyCalendarStatus"
      :status-list="status"
    />

    <AppButton
      :icon="icons.faPlus"
      color="success"
      btn-class="fw-bold"
      :disabled="isQueryLoading"
      @click.prevent="onNewStatusClick"
    >
      Novo status
    </AppButton>

    <div class="mt-2 mt-sm-0">
      <AppButton
        btn-class="fw-bold"
        class="me-2"
        :block="$isMobile"
        :disabled="isQueryLoading"
        @click.prevent="onWeeklyCalendarStatusClick"
      >
        Status do calendário semanal
      </AppButton>

      <AppButton
        class="mt-1 mt-sm-0"
        btn-class="fw-bold"
        :block="$isMobile"
        :disabled="isQueryLoading"
        @click.prevent="onAvailableStatusClick"
      >
        Status disponíveis
      </AppButton>
    </div>
  </div>
</template>
