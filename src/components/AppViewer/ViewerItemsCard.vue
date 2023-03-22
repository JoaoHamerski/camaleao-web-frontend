<script>
import { has } from 'lodash-es'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { formatBytes } from '@/utils/formatters'
import viewerMixin from './viewerMixin'

import ViewerFileModal from './ViewerFileModal.vue'
import ViewerItemsCardFile from './ViewerItemsCardFile.vue'

export default {
  components: {
    ViewerFileModal,
    ViewerItemsCardFile
  },
  mixins: [viewerMixin],
  props: {
    showDeleteButton: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      icons: {
        faTrash
      },
      fileToShow: '',
      modal: false
    }
  },
  methods: {
    formatBytes,
    getAlt ({ name }) {
      return name || this.alt
    },
    showFile ({ file, type }) {
      if (type !== 'file') {
        return
      }

      const fileToShow = has(file, 'base64')
        ? file.base64
        : file

      this.fileToShow = fileToShow
      this.modal = true
    },
    onViewerFileModalHidden () {
      this.fileToShow = ''
    },
    deleteFile (file) {
      const key = has(file, 'key') ? file.key : file

      this.$emit('delete-file', key)
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
      :src="fileToShow"
      modal-dialog-class="modal-fullscreen"
      @hidden="onViewerFileModalHidden"
    />

    <div
      v-for="file in files"
      :key="getKey(file)"
      :class="`col-6 col-sm-${col} mb-2`"
    >
      <div v-if="file">
        <ViewerItemsCardFile
          :show-delete-button="showDeleteButton"
          :file="file"
          :is-invalid="isInvalid(file)"
          :alt="getAlt(file)"
          clickable
          @show-file="showFile"
          @delete-file="deleteFile"
        />

        <slot
          name="file-info"
          :file="file"
        />
        <div
          v-if="isInvalid(file)"
          class="small text-center text-danger fw-bold"
        >
          Este arquivo passou do limite de tamanho ({{ formatBytes(maxFileSize) }}), por favor, escolha outro.
        </div>
      </div>
    </div>
  </AppTransitionGroup>
</template>
