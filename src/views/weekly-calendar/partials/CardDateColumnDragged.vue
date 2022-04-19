<script>
import { DRAG_STATES } from './CardDateColumn.vue'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

export default {
  data () {
    return {
      DRAG_STATES,
      icons: {
        faUpload
      }
    }
  },
  methods: {
    onDragStateChanged(state) {
      this.$emit('drag-state-changed', state)
    },
    onFileDrop (event) {
      this.$emit('file-drop', event)
    }
  }
}
</script>
<template>
  <div
    class="card-body position-relative"
    @dragover.prevent.stop="onDragStateChanged(DRAG_STATES.DRAG_ENTER)"
    @dragleave.prevent.stop="onDragStateChanged(DRAG_STATES.DRAG_LEAVE)"
    @drop.prevent.stop="onFileDrop"
  >
    <div class="pointer-events-none text-center text-success">
      <div class="my-5 py-5">
        <FontAwesomeIcon
          :icon="icons.faUpload"
          size="2x"
        />
        <div class="mt-2 fw-bold">
          SOLTE AQUI
        </div>
      </div>
    </div>
  </div>
</template>
