<script>
import { isEmpty } from 'lodash-es'
import { TYPES_MAP } from './garment-items-type'

import GarmentItemModalBody from './GarmentItemModalBody.vue'

export default {
  components: {
    GarmentItemModalBody
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
    id="garmentItemModal"
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
      <GarmentItemModalBody
        v-if="!isEmpty(item)"
        :item="item"
      />
    </template>
  </AppModal>
</template>
