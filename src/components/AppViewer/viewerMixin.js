import { has } from 'lodash-es'

export default {
  props: {
    attachments: {
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
    showDeleteButton: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getFile (file) {
      if (has(file, 'base64')) {
        return file.base64
      }

      return file
    },
    getKey (file) {
      if (has(file, 'key')) {
        return file.key
      }

      return file
    },
    onDeleteClick (attach) {
      const key = has(attach, 'key') ? attach.key : attach

      this.$emit('delete-attach', key)
    },
    isInvalid ({ size }) {
      if (this.maxFileSize === null) {
        return false
      }

      return this.maxFileSize < size
    }
  }
}
