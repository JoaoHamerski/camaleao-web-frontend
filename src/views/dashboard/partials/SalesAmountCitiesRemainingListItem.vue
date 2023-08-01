<script>
import { faCity, faTshirt, faBoxes } from '@fortawesome/free-solid-svg-icons';

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    icons: {
      faCity,
      faTshirt,
      faBoxes
    }
  }),
  computed: {
    cityName () {
      if (this.item.city.state) {
        return `${this.item.city.name} - ${this.item.city.state.abbreviation}`
      }

      return this.item.city.name
    }
  }
}
</script>

<template>
  <li
    class="list-group-item flex-fill"
  >
    <div class="fw-bold text-secondary small">
      <FontAwesomeIcon
        :icon="icons.faCity"
        fixed-width
      />
      {{ cityName }}
    </div>
    <div class="d-flex justify-content-between fw-bold extra-small">
      <div class="col">
        <span class="text-success">{{ $helpers.toBRL(item.amount) }}</span>
      </div>
      <div class="col text-end">
        <span class="text-secondary">
          <FontAwesomeIcon
            :icon="icons.faBoxes"
            fixed-width
          />
          {{ item.orders_count }}
        </span>
        <span class="mx-1"> - </span>
        <span class="text-secondary">
          <FontAwesomeIcon
            :icon="icons.faTshirt"
            fixed-width
          />
          {{ item.shirts_count }}
        </span>
      </div>
    </div>
  </li>
</template>
