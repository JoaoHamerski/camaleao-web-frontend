<script>
import DashboardItem from './DashboardItem.vue';
import { faTshirt, faBoxes } from '@fortawesome/free-solid-svg-icons';

export default {
  components: {
    DashboardItem
  },
  props: {
    label: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    icons: {
      faTshirt,
      faBoxes
    }
  }),
  computed: {
    hasPreRegisteredData () {
      return this.data.amount_pre_registered > 0 || this.data.orders_count_pre_registered > 0
    }
  }
}
</script>

<template>
  <DashboardItem>
    <template #label>
      {{ label }}
    </template>

    <template #text>
      <h5 class="fw-bold text-success">
        {{ $helpers.toBRL(data.amount) }}
      </h5>
    </template>

    <template #text-secondary>
      <div
        v-show="hasPreRegisteredData"
        class="text-warning mb-1"
      >
        <span>Pré-reg.: {{ $helpers.toBRL(data.amount_pre_registered) }}</span>
        <span class="mx-2">|</span>
        <span>
          <FontAwesomeIcon
            :icon="icons.faBoxes"
            fixed-width
          />
          {{ $helpers.toNumber(data.orders_count_pre_registered) }}
        </span>
      </div>

      <div>
        <span>
          <FontAwesomeIcon
            :icon="icons.faTshirt"
            fixed-width
          />
          {{ $helpers.toNumber(data.shirts_count) }}
        </span>

        <span class="mx-2">|</span>

        <span>
          <FontAwesomeIcon
            :icon="icons.faBoxes"
            fixed-width
          />
          {{ $helpers.toNumber(data.orders_count) }}
        </span>
      </div>
    </template>
  </DashboardItem>
</template>
