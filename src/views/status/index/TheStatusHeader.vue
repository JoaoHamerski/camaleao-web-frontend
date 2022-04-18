<script>
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import ModalStatusNew from '../partials/ModalStatusNew.vue'
import ModalStatusAvailable from '../partials/ModalStatusAvailable.vue'

export default {
  components: {
    ModalStatusNew,
    ModalStatusAvailable
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
  }
}
</script>

<template>
  <div class="d-flex justify-content-between mb-2">
    <ModalStatusNew
      v-model="modalNew"
      @success="onModalNewSuccess"
    />

    <ModalStatusAvailable
      v-model="modalAvailableStatus"
      :status-list="statusList"
      @success="onAvailableStatusSuccess"
    />

    <AppButton
      :icon="icons.faPlus"
      color="success"
      btn-class="fw-bold"
      @click.prevent="onNewStatusClick"
    >
      Novo status
    </AppButton>
    <AppButton
      btn-class="fw-bold"
      @click.prevent="onAvailableStatusClick"
    >
      Status disponíveis
    </AppButton>
  </div>
</template>
