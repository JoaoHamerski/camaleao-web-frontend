<script>
import InputFileButton from './InputFileButton'
import InputFileDragLabel from './InputFileDragLabel'

const DRAG_STATES = {
  DRAG_LEAVE: 0,
  DRAG_ENTER: 1
}

const preventDefault = e => { e.preventDefault() }

export default {
  components: {
    InputFileButton,
    InputFileDragLabel
  },
  props: {
    optional: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      required: true
    },
    centered: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: null
    },
    error: {
      type: [String, Boolean],
      default: false
    },
    defaultMargin: {
      type: Boolean,
      default: true
    },
    draggable: {
      type: Boolean,
      default: true
    },
    disableInputArea: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      value: '',
      DRAG_STATES,
      dragState: DRAG_STATES.DRAG_LEAVE
    }
  },
  computed: {
    hasLabel () {
      return this.$slots.default || this.label
    }
  },
  mounted () {
    const preventEvents = ['dragover', 'drop']

    if (this.draggable) {
      for (const event of preventEvents) {
        window.addEventListener(event, preventDefault, false)
      }
    }
  },
  methods: {
    onFileDrop (event) {
      this.$emit('input', event.dataTransfer.files)
      this.dragState = DRAG_STATES.DRAG_LEAVE
    },
    onInputChange (event) {
      this.value = null
      this.$emit('input', event.target.files)
    }
  }
}
</script>

<template>
  <div :class="defaultMargin && 'mb-3'">
    <label
      v-if="hasLabel"
      :for="id"
      class="form-label"
    >
      <span class="fw-bold">
        <slot v-if="$slots.default" />
        <template v-else>
          {{ label }}
        </template>
      </span>
      <span
        v-if="optional"
        class="small text-secondary"
      >(opcional)</span>
    </label>

    <div
      :class="!disableInputArea && 'file-input-area'"
      @drop.stop.prevent="onFileDrop"
    >
      <InputFileButton
        v-if="dragState === DRAG_STATES.DRAG_LEAVE"
        key="inputFileButton"
        v-bind="{id, centered, error}"
        @dragenter.prevent.stop="dragState = DRAG_STATES.DRAG_ENTER"
      />
      <InputFileDragLabel
        v-else-if="dragState === DRAG_STATES.DRAG_ENTER"
        key="inputFileDragLabel"
        @dragleave.prevent.stop="dragState = DRAG_STATES.DRAG_LEAVE"
      />
    </div>

    <div
      v-if="error"
      class="small text-danger"
    >
      {{ error }}
    </div>

    <input
      :id="id"
      ref="input"
      :value="value"
      class="d-none"
      type="file"
      :multiple="multiple"
      :accept="accept"
      @change="onInputChange"
    >
  </div>
</template>

<style scoped>
.file-input-area {
  min-height: 100px;
}
</style>
