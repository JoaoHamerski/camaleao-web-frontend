<script>
import { isEmpty } from 'lodash-es'
import { TYPES_MAP } from './cloth-items-type'

import ClothItemModalBody from './ClothItemModalBody.vue'

export default {
  components: {
    ClothItemModalBody
  },
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  computed: {
    item () {
      if (!this.type) {
        return {}
      }

      return TYPES_MAP[this.type]
    }
  },
  methods: {
    isEmpty
  }
}
</script>

<template>
  <AppModal
    id="clothItemModal"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template
      v-if="item.name"
      #title
    >
      {{ item.name }}
    </template>

    <template #body>
      <ClothItemModalBody
        v-if="!isEmpty(item)"
        :item="item"
      />
    </template>
  </AppModal>
</template>
