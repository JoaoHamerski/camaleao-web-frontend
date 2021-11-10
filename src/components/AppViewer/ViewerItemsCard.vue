<script>
import { faFileAlt, faTrash, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import { formatBytes } from '@/utils/formatters'

export default {
  props: {
    files: {
      type: Array,
      default: () => ([])
    },
    isInvalid: {
      type: Function,
      default: () => {}
    },
    hideDeleteButton: {
      type: Boolean,
      default: false
    },
    onDeleteClick: {
      type: Function,
      default: () => {}
    },
    maxFileSize: {
      type: Number,
      default: null
    },
    col: {
      type: [Number, String],
      default: 3
    }
  },
  data () {
    return {
      icons: {
        faFileAlt,
        faTrash,
        faFilePdf
      }
    }
  },
  methods: {
    formatBytes,
    getAlt ({ name }) {
      return name || this.alt
    },
    isType (file, type) {
      return this.$helpers.strContainsAny(file.type, type)
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
    <div
      v-for="file in files"
      :key="file.key"
      :class="`col-${col} mb-2`"
    >
      <div v-if="isType(file, 'image')">
        <div class="text-center">
          <img
            :src="file.base64"
            :alt="getAlt(file)"
            class="img-fluid img-thumbnail clickable"
            :class="isInvalid(file) && 'border-danger'"
            style="height: 120px"
          >
        </div>
      </div>
      <div v-else>
        <div
          class="img-thumbnail text-center d-flex flex-column justify-content-center align-items-center"
          style="height: 120px"
        >
          <FontAwesomeIcon
            v-if="isType(file, 'pdf')"
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
        v-if="!hideDeleteButton"
        block
        outlined
        tooltip="Excluir"
        color="danger"
        btn-class="btn-sm mt-1"
        :icon="icons.faTrash"
        @click.prevent="onDeleteClick(file.key)"
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
  </AppTransitionGroup>
</template>
