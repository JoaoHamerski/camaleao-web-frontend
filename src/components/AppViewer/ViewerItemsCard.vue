<script>
import { has } from 'lodash-es'

import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { formatBytes } from '@/utils/formatters'
import viewerMixin from './viewerMixin'
import ViewerFileModal from './ViewerFileModal'
import ViewerItemsCardAttach from './ViewerItemsCardAttach'

export default {
  components: {
    ViewerFileModal,
    ViewerItemsCardAttach
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
      attachToDisplay: '',
      modal: false
    }
  },
  methods: {
    formatBytes,
    getAlt ({ name }) {
      return name || this.alt
    },
    displayAttach (attach) {
      const attachToDisplay = has(attach, 'base64')
        ? attach.base64
        : attach

      this.attachToDisplay = attachToDisplay
      this.modal = true
    },
    onViewerFileModalHidden () {
      this.attachToDisplay = ''
    },
    deleteAttach (attach) {
      const key = has(attach, 'key') ? attach.key : attach

      this.$emit('delete-attach', key)
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
      :src="attachToDisplay"
      @hidden="onViewerFileModalHidden"
    />

    <div
      v-for="attach in attachments"
      :key="getKey(attach)"
      :class="`col-${col} mb-2`"
    >
      <div v-if="attach">
        <ViewerItemsCardAttach
          :show-delete-button="showDeleteButton"
          :attach="attach"
          :is-invalid="isInvalid(attach)"
          :alt="getAlt(attach)"
          clickable
          @display-attach="displayAttach"
          @delete-attach="deleteAttach"
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
