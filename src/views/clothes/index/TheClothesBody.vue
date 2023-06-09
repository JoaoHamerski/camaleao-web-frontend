<script>
import { get } from 'lodash-es';
import { GetClothMatches } from '@/graphql/ClothMatch.gql'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export default {
  apollo: {
    clothMatches: {
      query: GetClothMatches
    }
  },
  data: () => ({
    clothMatches: [],
    icons: {
      faEdit,
      faTrashAlt
    }
  }),
  computed: {
    isClothMatchesLoading () {
      return !!this.$apollo.queries.clothMatches.loading
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
    get
  }
}
</script>


<template>
  <div class="position-relative">
    <div
      v-if="isClothMatchesLoading"
      class="py-4"
    >
      <AppLoading />
    </div>

    <AppTable
      :headers="headers"
      :items="clothMatches"
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
            :key="size.id"
            class="list-group-item"
          >
            <b>{{ size.name }}</b>: <b>{{ $helpers.toBRL(size.pivot.value, false, true) }}</b>
          </div>
        </div>
      </template>
      <template #[`items.options`]>
        <div class="text-end">
          <AppButton
            class="me-2"
            :icon="icons.faEdit"
            btn-class="btn-sm"
            outlined
          />
          <AppButton
            :icon="icons.faTrashAlt"
            btn-class="btn-sm"
            outlined
            color="danger"
          />
        </div>
      </template>
    </AppTable>
  </div>
</template>
