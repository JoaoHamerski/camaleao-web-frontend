<script>
import { get } from 'lodash-es'
import orderCardItems from './orderCardItems'
import OrderCardItem from './OrderCardItem.vue'

export default {
  components: {
    OrderCardItem
  },
  props: {
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
    get
  }
}
</script>

<template>
  <ul class="list-group list-group-flush">
    <template v-for="item in orderCardItems">
      <OrderCardItem
        v-show="!item.hideOnShrink || isExpanded"
        :key="item.title"
        :order="order"
        :item="item"
        :is-expanded="isExpanded"
      />
    </template>
  </ul>
</template>
