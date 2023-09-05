<script>
import { faTshirt } from '@fortawesome/free-solid-svg-icons';
import DashboardItem from './DashboardItem.vue';

export default {
  components: {
    DashboardItem
  },
  props: {
    color: {
      type: String,
      default: 'success'
    },
    item: {
      type: Object,
      required: true
    },
  },
  data: () => ({
    icons: {
      faTshirt
    }
  })
}
</script>

<template>
  <DashboardItem>
    <template #label>
      <slot name="label" />
    </template>
    <template #text>
      <h1
        class="fw-bold mb-0"
        :class="`text-${color}`"
      >
        {{ $helpers.toNumber(item.orders_count) }}
      </h1>
    </template>
    <template #text-subtitle>
      <span class="fw-bold small text-secondary ms-1">
        <FontAwesomeIcon :icon="icons.faTshirt" />
        {{ $helpers.toNumber(item.shirts_count) }}
      </span>
    </template>
    <template #text-secondary>
      <div class="mb-2 mt-2">
        <span class="fa-fw fw-bold">RECEITA: </span>
        <span>{{ $helpers.toBRL(item.receipt) }}</span>
      </div>

      <slot name="append" />
    </template>
  </DashboardItem>
</template>
