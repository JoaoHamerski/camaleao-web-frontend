<script>
import { faUsers, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      selectedCities: [],
      icons: {
        faUsers,
        faEdit,
        faTrashAlt
      }
    }
  },
  computed: {
    headers () {
      return [
        { text: '', value: 'checkbox', align: 'center' },
        { text: 'Cidade', value: 'name' },
        { text: 'Estado', value: 'state' },
        { text: 'Ações', value: 'actions', align: 'center' }
      ]
    }
  },
  methods: {
    onCheckboxChange (isSelected, city) {
      this.$emit('checkbox-change', { isSelected, city })
    },
    onActionClicked (city, action) {
      this.$emit('action-clicked', { city, action })
    },
    getStateNameAndAbbr (city) {
      return city.state
        ? `${city.state.name} (${city.state.abbreviation})`
        : 'N/A'
    }
  }
}
</script>
<template>
  <AppTable
    :headers="headers"
    :items="items"
  >
    <template #[`items.checkbox`]="{ item }">
      <div class="d-flex justify-content-center align-items-center">
        <AppCheckbox
          :id="item.id"
          v-model="item.isSelected"
          :default-margin="false"
          lg
          @input="onCheckboxChange($event, item)"
        />
      </div>
    </template>
    <template #[`items.state`]="{ item }">
      {{ getStateNameAndAbbr(item) }}
    </template>
    <template #[`items.actions`]="{ item }">
      <div class="d-flex justify-content-center">
        <AppButton
          :icon="icons.faUsers"
          btn-class="btn-sm px-3"
          tooltip="Ver clientes"
          @click.prevent="onActionClicked(item, 'show')"
        />
        <AppButton
          class="mx-2"
          :icon="icons.faEdit"
          btn-class="btn-sm px-3"
          outlined
          tooltip="Editar"
          @click.prevent="onActionClicked(item, 'edit')"
        />
        <AppButton
          :icon="icons.faTrashAlt"
          btn-class="btn-sm px-3"
          color="danger"
          outlined
          tooltip="Deletar"
          @click.prevent="onActionClicked(item, 'delete')"
        />
      </div>
    </template>
  </AppTable>
</template>
