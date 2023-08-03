<script>
import { faTshirt } from '@fortawesome/free-solid-svg-icons'

import DashboardItem from './DashboardItem.vue';

export default {
  components: {
    DashboardItem
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    icons: {
      faTshirt
    }
  }),
  computed: {
    model () {
      return this.item.model
    }
  }
}
</script>

<template>
  <DashboardItem>
    <template #label>
      <FontAwesomeIcon
        :icon="icons.faTshirt"
        fixed-width
        class="text-primary"
      />
      {{ model.name }}
    </template>

    <template #text>
      {{ $helpers.toBRL(item.amount) }}
    </template>

    <template #text-secondary>
      <div>
        <span>
          <FontAwesomeIcon
            :icon="icons.faTshirt"
            fixed-width
          /> {{ $helpers.toNumber(item.shirts_count) }}
        </span>
        <span class="mx-2">|</span>
        <span>{{ $helpers.toNumber(item.sales_percentage) }}% das vendas</span>
      </div>
    </template>
  </DashboardItem>
</template>
