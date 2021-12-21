<script>
import { has } from 'lodash-es'

import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { formatBytes } from '@/utils/formatters'
import viewerMixin from './viewerMixin'

export default {
  mixins: [viewerMixin],
  data () {
    return {
      icons: {
        faTrash
      }
    }
  },
  methods: {
    formatBytes,
    hasName (file) {
      return has(file, 'name')
    }
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
        v-for="(attach, index) in attachments"
        :key="getKey(attach)"
        class="list-group-item"
      >
        <div class="d-flex justify-content-between">
          <div class="text-subtitle text-primary">
            <span v-if="hasName(attach)">{{ attach.name }}</span>
            <span v-else>Anexo {{ index + 1 }}</span>
          </div>
          <div>
            <FontAwesomeIcon
              :icon="icons.faTrash"
              class="link-danger clickable"
              @click="onDeleteClick(attach)"
            />
          </div>
        </div>
        <div>
          <slot
            name="attach-info"
            :attach="attach"
          />
        </div>
      </li>
    </AppTransitionGroup>
  </ul>
</template>
