<script>
import { has } from 'lodash-es'
import { faFileAlt, faFilePdf, faTrash } from '@fortawesome/free-solid-svg-icons'
import VueLoadImage from 'vue-load-image'

export default {
  components: {
    VueLoadImage
  },
  props: {
    file: {
      type: [Object, String],
      required: true
    },
    isInvalid: {
      type: Boolean,
      default: false
    },
    alt: {
      type: String,
      default: ''
    },
    clickable: {
      type: Boolean,
      default: false
    },
    showDeleteButton: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      icons: {
        faFileAlt,
        faFilePdf,
        faTrash
      }
    }
  },
  computed: {
    src () {
      if (has(this.file, 'base64')) {
        return this.file.base64
      }

      return this.file
    }
  },
  methods: {
    isType (file, type) {
      if (!has(file, 'type')) {
        return this.$helpers.strContainsAny(file, type)
      }

      return this.$helpers.strContainsAny(file.type, type)
    },
    onFileClick (type) {
      this.$emit('show-file', { file: this.file, type })
    },
    onDeleteClick () {
      this.$emit('delete-file', this.file)
    }
  }
}
</script>

<template>
  <div>
    <div
      v-if="isType(file, ['image', 'jpg', 'jpeg', 'png'])"
      @click="onFileClick('image')"
    >
      <VueLoadImage>
        <img
          slot="image"
          :src="src"
          :alt="alt"
          class="img-fluid img-thumbnail"
          :class="{'border-danger': isInvalid, 'clickable': clickable}"
          style="height: 120px"
        >
        <div
          slot="preloader"
          class="position-relative py-5 img-thumbnail"
        >
          <AppLoading />
        </div>
      </VueLoadImage>
    </div>
    <div
      v-else
      class="position-relative"
      :class="clickable && 'clickable'"
      @click="onFileClick('file')"
    >
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
      v-if="showDeleteButton"
      block
      outlined
      tooltip="Excluir"
      color="danger"
      btn-class="btn-sm mt-1"
      :icon="icons.faTrash"
      @click.prevent="onDeleteClick"
    />
  </div>
</template>
