<script>
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

import TheStatusCardItem from './TheStatusCardItem.vue'
import ModalStatusEdit from '../partials/ModalStatusEdit.vue'
import ModalStatusDelete from '../partials/ModalStatusDelete.vue'

export default {
  components: {
    TheStatusCardItem,
    ModalStatusEdit,
    ModalStatusDelete
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    status: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      modalEdit: {
        value: false,
        status: null
      },
      modalDelete: {
        value: false,
        status: null
      },
      icons: {
        faCheckCircle
      }
    }
  },
  methods: {
    onStatusDelete(status) {
      this.modalDelete.status = status
      this.modalDelete.value = true
    },
    onStatusEdit(status) {
      this.modalEdit.status = status
      this.modalEdit.value = true
    },
    onStatusEditSuccess () {
      this.modalEdit.value = false
      this.modalEdit.status = null
    },
    onStatusDeleteSuccess () {
      this.modalDelete.value = false
      this.modalDelete.status = null
    }
  }
}
</script>
<template>
  <div>
    <ModalStatusEdit
      v-model="modalEdit.value"
      :status="modalEdit.status"
      @success="onStatusEditSuccess"
    />

    <ModalStatusDelete
      v-model="modalDelete.value"
      :status="modalDelete.status"
      :status-list="status"
      @success="onStatusDeleteSuccess"
    />

    <AppCard
      class="position-relative"
      color="camaleao"
      :has-body-padding="false"
    >
      <template #header>
        <h6 class="mb-0 fw-bold">
          <FontAwesomeIcon
            :icon="icons.faCheckCircle"
            fixed-width
          />
          Gerenciamento de status
        </h6>
      </template>
      <template #body>
        <AppLoading v-show="isLoading" />

        <ul class="list-group list-group-flush">
          <template v-if="status.length">
            <TheStatusCardItem
              v-for="_status in status"
              :key="_status.id"
              :status="_status"
              @edit="onStatusEdit"
              @delete="onStatusDelete"
            />
          </template>
          <div
            v-else
            class="text-center text-secondary py-5"
          >
            Nenhum status registrado
          </div>
        </ul>
      </template>
    </AppCard>
  </div>
</template>
