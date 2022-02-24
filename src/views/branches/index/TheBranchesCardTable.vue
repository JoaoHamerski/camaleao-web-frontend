<script>
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      icons: {
        faEdit,
        faTrashAlt
      }
    }
  },
  computed: {
    headers () {
      return [
        { text: 'Filial', value: 'city' },
        { text: 'Transportadora', value: 'shipping_company' },
        { text: 'Cidades', value: 'cities' },
        { text: 'Ações', value: 'actions', align: 'center' }
      ]
    }
  },
  methods: {
    onActionClick (item, action) {
      this.$emit('action', { item, action })
    },
    getCityName (city) {
      if (city.state) {
        return `${city.name} - ${city.state.abbreviation}`
      }

      return city.name
    }
  }
}
</script>

<template>
  <AppTable
    :row-class="() => 'align-middle'"
    :items="items"
    :headers="headers"
  >
    <template #[`items.city`]="{ item }">
      {{ getCityName(item.city) }}
    </template>

    <template #[`items.shipping_company`]="{ item }">
      <template v-if="item.shipping_company">
        {{ item.shipping_company.name }}
      </template>
      <template v-else>
        <div class="text-danger fw-bold">
          [DELETADA]
        </div>
      </template>
    </template>

    <template #[`items.cities`]="{ item }">
      <ul
        v-if="item.cities.length"
        class="list-group list-group-sm"
      >
        <li
          v-for="city in item.cities"
          :key="city.id"
          class="list-group-item"
        >
          {{ getCityName(city) }}
        </li>
      </ul>
      <div
        v-else
        class="text-center text-secondary"
      >
        N/A
      </div>
    </template>

    <template #[`items.actions`]="{ item }">
      <div class="mb-1">
        <AppButton
          v-tippy
          btn-class="btn-sm"
          :icon="icons.faEdit"
          outlined
          content="Editar"
          @click.prevent="onActionClick(item, 'edit')"
        />
      </div>
      <div>
        <AppButton
          v-tippy
          btn-class="btn-sm"
          :icon="icons.faTrashAlt"
          outlined
          color="danger"
          content="Deletar"
          @click.prevent="onActionClick(item, 'delete')"
        />
      </div>
    </template>
  </AppTable>
</template>
