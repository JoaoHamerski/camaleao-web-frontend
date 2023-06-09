<script>
import { form } from './ClothMatchForm.vue'

import { GetModels } from '@/graphql/Model.gql'
import { GetMaterials } from '@/graphql/Material.gql'
import { GetNeckTypes } from '@/graphql/NeckType.gql'
import { GetSleeveTypes } from '@/graphql/SleeveType.gql'


export default {
  apollo: {
    models: { query: GetModels },
    materials: { query: GetMaterials },
    neckTypes: { query: GetNeckTypes },
    sleeveTypes: { query: GetSleeveTypes }
  },
  data: () => ({
    form,
    models: [],
    materials: [],
    neckTypes: [],
    sleeveTypes: [],
  }),
  computed: {
    isQueriesLoading () {
      return this.$apollo.loading
    }
  }
}
</script>

<template>
  <div class="row position-relative">
    <AppLoading v-if="isQueriesLoading" />

    <div class="col">
      <AppSimpleSelect
        id="model_id"
        v-model="form.model_id"
        name="model_id"
        :options="models"
        label-prop="name"
        :error="form.errors.get('model_id')"
      >
        Modelo
      </AppSimpleSelect>
    </div>
    <div class="col">
      <AppSimpleSelect
        id="material_id"
        v-model="form.material_id"
        name="material_id"
        optional
        :options="materials"
        label-prop="name"
        :error="form.errors.get('material_id')"
      >
        Material
      </AppSimpleSelect>
    </div>
    <div class="col">
      <AppSimpleSelect
        id="neck_type_id"
        v-model="form.neck_type_id"
        name="neck_type_id"
        optional
        :options="neckTypes"
        label-prop="name"
        :error="form.errors.get('neck_type_id')"
      >
        Tipo de gola
      </AppSimpleSelect>
    </div>
    <div class="col">
      <AppSimpleSelect
        id="sleeve_type_id"
        v-model="form.sleeve_type_id"
        name="sleeve_type_id"
        optional
        :options="sleeveTypes"
        label-prop="name"
        :error="form.errors.get('sleeve_type_id')"
      >
        Tipo de manga
      </AppSimpleSelect>
    </div>
  </div>
</template>
