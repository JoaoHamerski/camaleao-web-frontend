<script>
import { get } from 'lodash-es'
import orderCardItems from './orderCardItems'
import OrderCardItem from './OrderCardItem.vue'

export default {
  components: {
    OrderCardItem
  },
  props: {
    loadingButton: {
      type: Boolean,
      default: false
    },
    order: {
      type: Object,
      default: null
    },
    isExpanded: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      orderCardItems
    }
  },
  methods: {
    get,
    onBtnStatusClicked() {
      this.$emit('conclude-status')
    }
  }
}
</script>

<template>
  <ul class="list-group list-group-flush">
    <template v-for="item in orderCardItems">
      <OrderCardItem
        :key="item.title"
        :class="[!item.hideOnShrink || isExpanded ? 'd-block' : 'd-none']"
        :order="order"
        :item="item"
        :is-expanded="isExpanded"
        :loading-button="loadingButton"
        @btn-status-clicked="onBtnStatusClicked"
      />
    </template>
  </ul>
</template>
