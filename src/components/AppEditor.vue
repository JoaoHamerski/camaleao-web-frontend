<script lang="jsx">
import { VueEditor } from 'vue2-editor/dist/vue2-editor.core.js'

const DEFAULT_TOOLBAR_OPTIONS = [
  ['bold', 'italic', 'underline', 'strike'],
  [{ 'header': [1, 2, 3, 4, 5, 6]}],
  [{ color: []}],
  ['clean']
]

export default {
  components: {
    VueEditor
  },
  props: {
    value: {
      type: String,
      required: true
    },
    error: {
      type: [String, Boolean],
      default: ''
    },
    toolbar: {
      type: Array,
      default: () => DEFAULT_TOOLBAR_OPTIONS
    }
  },
  methods: {
    onInput (event) {
      this.$emit('input', event)
    }
  }
}
</script>

<template>
  <div>
    <VueEditor
      v-bind="$attrs"
      :class="error && 'is-invalid'"
      :value="value"
      :editor-toolbar="toolbar"
      v-on="$listeners"
      @input="onInput"
    />
    <div
      v-if="error"
      class="small text-danger"
    >
      {{ error }}
    </div>
  </div>
</template>

<style lang="scss">
@import "vue2-editor/dist/vue2-editor.css";
@import 'quill/dist/quill.core.css';
@import 'quill/dist/quill.snow.css';

::v-deep {
  &.quillWrapper.is-invalid {
    .ql-toolbar {
      border-color: var(--bs-red);
    }
    .ql-container {
      border-color: var(--bs-red);
    }
  }
}
</style>
