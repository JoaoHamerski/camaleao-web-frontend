<script>
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import ClothItemBodyItems from './ClothItemModalItems.vue'

export default {
  components: {
    ClothItemBodyItems
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    icons: {
      faPlus,
    },
    newItem: false,
  }),
  methods: {
    onNewItemClick () {
      this.newItem = !this.newItem
    },
    onCancelNewItem () {
      this.newItem = false
    }
  }
}
</script>

<template>
  <div>
    <div class="mb-3">
      <AppButton
        outlined
        color="success"
        btn-class="fw-bold"
        :icon="icons.faPlus"
        @click.prevent="onNewItemClick"
      >
        Novo item
      </AppButton>
    </div>

    <ClothItemBodyItems
      class="my-3"
      :item="item"
      :new-item="newItem"
      @cancel-new-item="onCancelNewItem"
    />

    <div class="text-end">
      <AppButton
        color="light"
        data-bs-dismiss="modal"
      >
        Fechar
      </AppButton>
    </div>
  </div>
</template>
