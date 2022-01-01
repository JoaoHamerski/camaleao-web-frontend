<script>
import ViewerFileModal from '@/components/AppViewer/ViewerFileModal'

export default {
  components: {
    ViewerFileModal
  },
  props: {
    id: {
      type: String,
      required: true
    },
    value: {
      type: Boolean,
      default: false
    },
    src: {
      type: String,
      default: ''
    }
  }
}
</script>

<template>
  <ViewerFileModal
    :id="id"
    :value="value"
    :src="src"
    modal-dialog-class="modal-fullscreen"
    v-on="$listeners"
  >
    <template #title>
      <slot name="title" />
    </template>
  </ViewerFileModal>
</template>
