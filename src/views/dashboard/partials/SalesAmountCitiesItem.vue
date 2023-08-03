<script>
import DashboardItem from './DashboardItem.vue';
import { faCity, faBoxes, faTshirt } from '@fortawesome/free-solid-svg-icons'

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
      faCity,
      faBoxes,
      faTshirt
    }
  }),
  computed: {
    city () {
      return this.item.city
    },
    cityName () {
      if (this.city.state) {
        return `${this.city.name} - ${this.city.state.abbreviation}`
      }

      return this.city.name
    }
  }
}
</script>

<template>
  <DashboardItem>
    <template #label>
      <FontAwesomeIcon
        :icon="icons.faCity"
        fixed-width
        class="text-primary text-subtitle"
      />
      {{ cityName }}
    </template>
    <template #text>
      {{ $helpers.toBRL(item.amount) }}
    </template>
    <template #text-secondary>
      <div class="fw-bold">
        <span>
          <FontAwesomeIcon
            :icon="icons.faBoxes"
            fixed-width
          />
          {{ $helpers.toNumber(item.orders_count) }}
        </span>
        <span class="mx-2">-</span>
        <span>
          <FontAwesomeIcon
            :icon="icons.faTshirt"
            fixed-width
          />
          {{ $helpers.toNumber(item.shirts_count) }}
        </span>
      </div>
    </template>
  </DashboardItem>
</template>
