<script>
import { filledNames } from '../order-garments/OrderGarments.vue'
import { faSpellCheck } from '@fortawesome/free-solid-svg-icons';

export default {
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    icons: {
      faSpellCheck
    }
  }),
  computed: {
    garmentsWithNames () {
      return this.order.garments.filter(garment => garment.individual_names)
    }
  },
  methods: {
    filledNames
  }
}
</script>

<template>
  <AppContainer collapsible>
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faSpellCheck"
        fixed-width
      />
      Nomes nas roupas
    </template>
    <template #body>
      <table class="table table-bordered table-sm">
        <thead>
          <tr class="table-primary">
            <th>Nome</th>
            <th>Tamanho</th>
            <th>Número</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(garment, index) in order.garments">
            <template v-if="garment.individual_names">
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
      </table>
    </template>
  </AppContainer>
</template>
