<script>
import { form } from './GarmentMatchForm.vue'

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
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    match: {
      type: Object,
      default: () => ({})
    }
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
    },
    hasMatchUniqueError () {
      return this.form?.errors?.errors?.model_id?.[0] === 'unique'
    },
    getModelError () {
      if (this.form?.errors?.errors?.model_id?.[0] === 'unique') {
        return false
      }

      return form.errors.get('model_id')
    }
  },
  watch: {
    async isQueriesLoading (value) {
      if (!value && this.isEdit) {
        await this.$nextTick()
        this.populateForm()
      }
    }
  },
  mounted() {
    if (this.isEdit && !this.isQueriesLoading) {
      this.populateForm()
    }
  },
  methods: {
    populateForm () {
      const { model, material, neck_type, sleeve_type } = this.match

      form.model_id = model?.id || ''
      form.material_id = material?.id || ''
      form.neck_type_id = neck_type?.id || ''
      form.sleeve_type_id = sleeve_type?.id || ''
    }
  }
}
</script>

<template>
  <div>
    <div class="row position-relative">
      <AppLoading v-if="isQueriesLoading" />
      <div class="col">
        <AppSimpleSelect
          id="model_id"
          v-model="form.model_id"
          name="model_id"
          :options="models"
          label-prop="name"
          :error="getModelError"
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
    <div
      v-if="hasMatchUniqueError"
      class="alert alert-danger alert-dismissible small"
    >
      Esta combinação já está sendo utilizada, por favor, escolha outra ou edite a combinação existente.
      <button
        class="btn-close"
        data-bs-dismiss="alert"
      />
    </div>
  </div>
</template>
