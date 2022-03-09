<script>
import ViewerFileModal from '@/components/AppViewer/ViewerFileModal'

export default {
  components: {
    ViewerFileModal
  },
  props: {
    title: {
      type: String,
      default: ''
    },
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
      <template v-if="title !== ''">
        {{ title }}
      </template>
      <template v-else>
        <slot name="title" />
      </template>
    </template>
  </ViewerFileModal>
</template>
