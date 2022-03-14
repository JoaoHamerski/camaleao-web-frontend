<script>
import { get } from 'lodash-es'
import { clients } from '@/constants/route-names'

export default {
  props: {
    items: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    headers () {
      return [
        { text: 'Nome', value: 'name' },
        { text: 'Telefone', value: 'phone', format: 'phone' },
        { text: 'Cidade', value: 'city.name' }
      ]
    }
  },
  methods: {
    get,
    tableRowRoute (item) {
      return {
        name: clients.show,
        params: this.$helpers.getRouteParams({ client: item })
      }
    }
  }
}
</script>

<template>
  <AppTable
    :headers="headers"
    :items="items"
    :route="tableRowRoute"
  >
    <template #[`items.city.name`]="{ item }">
      {{ get(item, 'city.name', 'N/A') }}

      <template v-if="item.city">
        - {{ get(item, 'city.state.abbreviation', 'N/A') }}
      </template>
    </template>
  </AppTable>
</template>
