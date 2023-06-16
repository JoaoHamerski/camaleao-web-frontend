<script>
import { get } from 'lodash-es';
import { GetGarmentMatches } from '@/graphql/GarmentMatch.gql'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export default {
  apollo: {
    garmentMatches: {
      query: GetGarmentMatches,
      fetchPolicy: 'no-cache'
    }
  },
  data: () => ({
    garmentMatches: [],
    icons: {
      faEdit,
      faTrashAlt
    }
  }),
  computed: {
    isGarmentMatchesLoading () {
      return !!this.$apollo.queries.garmentMatches.loading
    },
    headers () {
      return [
        { text: 'Opções', value: 'matches' },
        { text: 'Valores de peças', value: 'values' },
        { text: 'Tamanhos disponíveis', value: 'sizes' },
        { text: '', value: 'options', align: 'right'}
      ]
    }
  },
  methods: {
    get,
    onEditClick (item) {
      this.$emit('edit', item)
    },
    onDeleteClick(item) {
      this.$emit('delete', item)
    }
  }
}
</script>


<template>
  <div class="position-relative">
    <div
      v-if="isGarmentMatchesLoading"
      class="py-4"
    >
      <AppLoading />
    </div>

    <AppTable
      :headers="headers"
      :items="garmentMatches"
    >
      <template #[`items.matches`]="{ item }">
        <ul class="list-group small">
          <li class="list-group-item">
            <b>Modelo</b>: {{ get(item, 'model.name', 'N/A') }}
          </li>
          <li class="list-group-item">
            <b>Material</b>: {{ get(item, 'material.name', 'N/A') }}
          </li>
          <li class="list-group-item">
            <b>Tipo de gola</b>: {{ get(item, 'neck_type.name', 'N/A') }}
          </li>
          <li class="list-group-item">
            <b>Tipo de manga</b>: {{ get(item, 'sleeve_type.name', 'N/A') }}
          </li>
        </ul>
      </template>
      <template #[`items.values`]="{ item }">
        <div class="list-group small">
          <div
            v-if="item.unique_value"
            class="list-group-item"
          >
            <b>Valor único: </b> {{ $helpers.toBRL(item.unique_value) }}
          </div>
          <div v-else>
            <div
              v-for="value in item.values"
              :key="value.id"
              class="list-group-item"
            >
              <template v-if="value.end">
                <b>{{ value.start }}</b> ~ <b>{{ value.end }}</b> = <b>{{ $helpers.toBRL(value.value) }}</b>
              </template>
              <template v-else>
                > <b>{{ value.start }}</b> = <b>{{ $helpers.toBRL(value.value) }}</b>
              </template>
            </div>
          </div>
        </div>
      </template>
      <template #[`items.sizes`]="{ item }">
        <div class="list-group small">
          <div
            v-for="size in item.sizes"
            :key="size.pivot.id"
            class="list-group-item"
          >
            <b>{{ size.name }}</b>: <b>{{ $helpers.toBRL(size.pivot.value, false, true) }}</b>
          </div>
        </div>
      </template>
      <template #[`items.options`]="{ item }">
        <div class="text-end">
          <AppButton
            class="me-2"
            :icon="icons.faEdit"
            btn-class="btn-sm"
            outlined
            @click.prevent="onEditClick(item)"
          />
          <AppButton
            :icon="icons.faTrashAlt"
            btn-class="btn-sm"
            outlined
            color="danger"
            @click.prevent="onDeleteClick(item)"
          />
        </div>
      </template>
    </AppTable>
  </div>
</template>
