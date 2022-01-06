<script>
import { has } from 'lodash-es'

import { faFileAlt, faTrash, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import { formatBytes } from '@/utils/formatters'
import viewerMixin from './viewerMixin'
import ViewerFileModal from './ViewerFileModal'

export default {
  components: {
    ViewerFileModal
  },
  mixins: [viewerMixin],
  data () {
    return {
      icons: {
        faFileAlt,
        faTrash,
        faFilePdf
      },
      fileToDisplay: '',
      modal: false
    }
  },
  methods: {
    formatBytes,
    getAlt ({ name }) {
      return name || this.alt
    },
    isType (file, type) {
      if (!has(file, 'type')) {
        return this.$helpers.strContainsAny(file, type)
      }

      return this.$helpers.strContainsAny(file.type, type)
    },
    displayFile (file) {
      const fileToDisplay = has(file, 'base64')
        ? file.base64
        : file

      this.fileToDisplay = fileToDisplay
      this.modal = true
    }
  }
}
</script>

<template>
  <AppTransitionGroup
    tag="div"
    class="row gx-2"
    enter="fadeInDown"
    leave="zoomOut"
    speed="even-faster"
  >
    <ViewerFileModal
      key="viewerFileModal"
      v-model="modal"
      :src="fileToDisplay"
    />

    <div
      v-for="attach in attachments"
      :key="getKey(attach)"
      :class="`col-${col} mb-2`"
    >
      <div v-if="attach">
        <div v-if="isType(attach, ['png', 'jpg', 'jpeg'])">
          <div class="text-center">
            <img
              :src="getFile(attach)"
              :alt="getAlt(attach)"
              class="img-fluid img-thumbnail clickable"
              :class="isInvalid(attach) && 'border-danger'"
              style="height: 120px"
            >
          </div>
        </div>
        <div
          v-else
          class="position-relative clickable"
          @click="displayFile(attach)"
        >
          <div
            class="img-thumbnail text-center d-flex flex-column justify-content-center align-items-center"
            style="height: 120px"
          >
            <FontAwesomeIcon
              v-if="isType(attach, 'pdf')"
              class="text-primary"
              :icon="icons.faFilePdf"
              size="3x"
            />
            <FontAwesomeIcon
              v-else
              class="text-primary"
              :icon="icons.faFileAlt"
              size="3x"
            />
            <div class="fw-bold text-primary mt-2">
              ARQUIVO
            </div>
          </div>
        </div>
        <AppButton
          v-if="showDeleteButton"
          block
          outlined
          tooltip="Excluir"
          color="danger"
          btn-class="btn-sm mt-1"
          :icon="icons.faTrash"
          @click.prevent="onDeleteClick(attach)"
        />
        <slot
          name="attach-info"
          :attach="attach"
        />
        <div
          v-if="isInvalid(attach)"
          class="small text-center text-danger fw-bold"
        >
          Este arquivo passou do limite de tamanho ({{ formatBytes(maxFileSize) }}), por favor, escolha outro.
        </div>
      </div>
    </div>
  </AppTransitionGroup>
</template>
