import { has } from 'lodash-es'

export default {
  props: {
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
    }
  },
  methods: {
    getKey (file) {
      if (has(file, 'key')) {
        return file.key
      }

      return file
    },
    isInvalid ({ size }) {
      if (this.maxFileSize === null) {
        return false
      }

      return size > this.maxFileSize
    }
  }
}
