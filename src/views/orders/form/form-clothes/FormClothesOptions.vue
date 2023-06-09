<script>
import { faPaste, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { form } from '../OrderForm.vue';
import { find } from 'lodash-es';

import { getUniqueValues } from './FormClothes.vue';

export default {
  props: {
    index: {
      type: Number,
      required: true
    },
    clothMatches: {
      type: Array,
      default: () => []
    },
    models: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    form,
    materials: [],
    neckTypes: [],
    sleeveTypes: [],
    icons: {
      faPlus,
      faPaste,
      faTrashAlt
    }
  }),
  computed: {
    isDeleteDisabled () {
      return this.form.clothes.length <= 1
    },
    formCloth () {
      return this.form.clothes[this.index]
    }
  },
  methods: {
    evaluateOptions (field) {
      const matches = this.clothMatches.filter(item => {
        return +this.formCloth[field + '_id'] === +item[field].id
      })

      // Atualizar cada item filtrando
      // cada opção que foi selecionada

      this.materials = getUniqueValues(matches, 'material')
    },
    onNewClick () {
      this.$emit('new', this.index)
    },
    onDuplicateClick () {
      this.$emit('duplicate', this.index)
    },
    onDeleteClick () {
      this.$emit('delete', this.index)
    }
  }
}
</script>

<template>
  <div>
    <div class="small mb-2">
      <a
        href=""
        class="text-decoration-none"
        @click.prevent="onNewClick"
      >
        <FontAwesomeIcon :icon="icons.faPlus" />
        Novo
      </a>

      <a
        href=""
        class="text-decoration-none mx-3"
        @click.prevent="onDuplicateClick"
      >
        <FontAwesomeIcon :icon="icons.faPaste" />
        Duplicar
      </a>

      <a
        v-if="!isDeleteDisabled"
        href=""
        class="text-decoration-none"
        @click.prevent="onDeleteClick"
      >
        <FontAwesomeIcon :icon="icons.faTrashAlt" />
        Deletar
      </a>
    </div>
    <div
      class="row"
    >
      <div class="col-3">
        <AppSimpleSelect
          :id="`clothes.${index}.model_id`"
          v-model="form.clothes[index].model_id"
          :options="models"
          label-prop="name"
          :name="`clothes.${index}.model_id`"
          select-class="form-select-sm"
          placeholder="Selecione um modelo"
          @input="evaluateOptions('model')"
        >
          Modelo
        </AppSimpleSelect>
      </div>
      <div class="col-3">
        <AppSimpleSelect
          :id="`clothes.${index}.material_id`"
          v-model="form.clothes[index].material_id"
          select-class="form-select-sm"
          :name="`clothes.${index}.material_id`"
          label-prop="name"
          placeholder="Selecione um material"
          :disabled="!materials.length"
          :options="materials"
        >
          Material
        </AppSimpleSelect>
      </div>
      <div class="col-3">
        <AppSimpleSelect
          :id="`clothes.${index}.neck_type_id`"
          v-model="form.clothes[index].neck_type_id"
          select-class="form-select-sm"
          :name="`clothes.${index}.neck_type_id`"
          label-prop="name"
          placeholder="Selecione um tipo"
          disabled
        >
          Tipo de gola
        </AppSimpleSelect>
      </div>
      <div class="col-3">
        <AppSimpleSelect
          :id="`clothes.${index}.sleeve_type_id`"
          v-model="form.clothes[index].sleeve_type_id"
          select-class="form-select-sm"
          :name="`clothes.${index}.sleeve_type_id`"
          label-prop="name"
          placeholder="Selecione um tipo"
          disabled
        >
          Tipo de manga
        </AppSimpleSelect>
      </div>
    </div>

    <AppCheckboxSwitch
      :id="`clothes.${index}.individual_names`"
      v-model="form.clothes[index].individual_names"
    >
      Nomes individuais
    </AppCheckboxSwitch>
  </div>
</template>
