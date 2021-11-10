<script>
import ViewerItemsCard from './ViewerItemsCard'
import ViewerItemsList from './ViewerItemsList'

export default {
  components: {
    ViewerItemsCard,
    ViewerItemsList
  },
  props: {
    listType: {
      type: String,
      default: 'card',
      validator: value => ['card', 'list'].indexOf(value) !== -1
    },
    files: {
      type: Array,
      default: () => ([])
    },
    alt: {
      type: String,
      default: null
    },
    col: {
      type: [String, Number],
      default: '3'
    },
    // In bytes
    maxFileSize: {
      type: Number,
      default: null
    },
    hideDeleteButton: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onDeleteClick (imageKey) {
      this.$emit('delete-file', imageKey)
    },
    isInvalid ({ size }) {
      if (this.maxFileSize === null) {
        return false
      }

      return this.maxFileSize < size
    }
  }
}
</script>

<template>
  <AppViewer>
    <ViewerItemsList
      v-if="listType === 'list'"
      key="itemsList"
      v-bind="{
        files,
        maxFileSize,
        isInvalid,
        hideDeleteButton,
        onDeleteClick
      }"
    >
      <template #file-info="{ file }">
        <slot
          name="file-info"
          :file="file"
        />
      </template>
    </ViewerItemsList>
    <ViewerItemsCard
      v-if="listType === 'card'"
      key="itemsList"
      v-bind="{
        files,
        col,
        maxFileSize,
        isInvalid,
        hideDeleteButton,
        onDeleteClick
      }"
    >
      <template #file-info="{ file }">
        <slot
          name="file-info"
          :file="file"
        />
      </template>
    </ViewerItemsCard>
  </AppViewer>
</template>
