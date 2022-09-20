<script>
import { faArrowCircleDown, faTimes } from '@fortawesome/free-solid-svg-icons'
import { formatBytes } from '@/utils/formatters'

export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    fileList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      icons: {
        faArrowCircleDown,
        faTimes
      }
    }
  },
  methods: {
    formatBytes,
    onFileClick (file) {
      this.$emit('file-load', file)
    },
    removeFile(file, index) {
      this.$emit('file-remove', {file, index})
    }
  }
}
</script>

<template>
  <div>
    <ul class="list-group">
      <button
        v-for="(file, index) in fileList"
        :key="`${index}${file.name}`"
        class="list-group-item list-group-item-action d-flex justify-content-between p-0 small"
        :class="isLoading && 'disabled'"
        @click.prevent="onFileClick(file)"
      >
        <div class="d-flex align-items-center p-2 h-100 w-100">
          <span
            class="fw-bold"
            :class="{
              'text-primary': !isLoading,
              'text-secondary': isLoading
            }"
          >
            <FontAwesomeIcon
              :icon="icons.faArrowCircleDown"
            />
            {{ file.name }}
          </span>
          <span class="text-secondary ms-1">
            ({{ formatBytes(file.size) }})
          </span>
        </div>
        <AppButton
          btn-class="rounded-0 rounded-end"
          outlined
          :icon="icons.faTimes"
          color="danger"
          @click.stop.prevent="removeFile(file, index)"
        />
      </button>
    </ul>
    <div class="small text-secondary">
      Clique em um arquivo para carregar as entradas
    </div>
  </div>
</template>
