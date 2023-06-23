<script>
import { filledNames } from '../order-garments/OrderGarments.vue'
import { isEmpty } from 'lodash-es'

export default {
  props: {
    garments: {
      type: Array,
      required: true
    },
  },
  methods: {
    filledNames,
    isEmpty
  }
}
</script>

<template>
  <tbody>
    <template v-for="(garment, index) in garments">
      <template v-if="!isEmpty(garment.individual_names)">
        <tr
          :key="`garment__${garment.id}`"
          class="table-secondary"
        >
          <td
            colspan="3"
            class="fw-bold text-center small"
          >
            <span class="me-1 text-primary">[{{ index + 1 }}] </span>
            {{ filledNames(garment).join(' - ') }}
          </td>
        </tr>
        <tr
          v-for="(garmentName) in garment.individual_names"
          :key="`garmentName__${garment.id}__${garmentName.id}`"
        >
          <td>{{ garmentName.name || 'N/A' }}</td>
          <td>{{ garmentName.size || 'N/A' }}</td>
          <td>{{ garmentName.number || 'N/A' }}</td>
        </tr>
      </template>
    </template>
  </tbody>
</template>
