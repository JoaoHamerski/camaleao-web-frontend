<script>
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { formatBytes } from '@/utils/formatters'

export default {
  props: {
    files: {
      type: Array,
      default: () => ([])
    },
    isInvalid: {
      type: Function,
      default: () => {}
    },
    hideDeleteButton: {
      type: Boolean,
      default: false
    },
    onDeleteClick: {
      type: Function,
      default: () => {}
    },
    maxFileSize: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      icons: {
        faTrash
      }
    }
  },
  methods: {
    formatBytes
  }
}
</script>
<template>
  <ul class="list-group">
    <AppTransitionGroup
      tag="div"
      class="row gx-2"
      enter="fadeInDown"
      leave="fadeOutRight"
      speed="even-faster"
    >
      <li
        v-for="file in files"
        :key="file.key"
        class="list-group-item"
      >
        <div class="d-flex justify-content-between">
          <div class="text-subtitle text-primary">
            {{ file.name }}
          </div>
          <div>
            <FontAwesomeIcon
              :icon="icons.faTrash"
              class="link-danger clickable"
              @click="onDeleteClick(file.key)"
            />
          </div>
        </div>
        <div>
          <slot
            name="file-info"
            :file="file"
          />
        </div>
      </li>
    </AppTransitionGroup>
  </ul>
</template>
