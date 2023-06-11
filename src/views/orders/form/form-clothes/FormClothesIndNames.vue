<script>
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { maskInteger } from '@/utils/masks';
import { form, DEFAULT_CLOTH_INDIVIDUAL_ITEM } from '../OrderForm.vue'
import { isEmpty } from 'lodash-es';

export default {
  props: {
    clothIndex: {
      type: Number,
      required: true,
    },
    match: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    form,
    icons: {
      faPlus,
      faTrashAlt
    },
    maskInteger: maskInteger({
      numeralIntegerScale: 3,
      stripLeadingZeroes: false,
      numeralDecimalScale: 0
    })
  }),
  computed: {
    sizes () {
      if (isEmpty(this.match)) {
        return []
      }

      return this.match.sizes
    },
    isDeleteDisabled () {
      return this.form.clothes[this.clothIndex].items_individual.length <= 1
    }
  },
  methods: {
    newIndividualNameItem () {
      this.form.clothes[this.clothIndex].items_individual.push({
        ...DEFAULT_CLOTH_INDIVIDUAL_ITEM
      })
    },
    deleteIndividualNameItem (index) {
      if (this.isDeleteDisabled) {
        return
      }

      this.form.clothes[this.clothIndex].items_individual.splice(index, 1)
    }
  }
}
</script>

<template>
  <div>
    <div class="row">
      <div class="col-4 small">
        Nome
      </div>
      <div class="col-3 small">
        Tamanho
      </div>
      <div class="col-3 small">
        Número
      </div>
    </div>

    <div
      v-for="(_, index) in form.clothes[clothIndex].items_individual"
      :key="index"
      class="row align-items-end mb-2"
    >
      <div class="col-4">
        <AppInput
          :id="`clothes.${index}.name`"
          v-model="form.clothes[clothIndex].items_individual[index].name"
          :name="`clothes.${index}.name`"
          input-class="form-control-sm"
          placeholder="Digite o nome..."
          :default-margin="false"
        />
      </div>

      <div class="col-3">
        <AppSimpleSelect
          :id="`clothes.${index}.size`"
          v-model="form.clothes[clothIndex].items_individual[index].size_id"
          :name="`clothes.${index}.size`"
          :options="sizes"
          label-prop="name"
          select-class="form-select-sm"
          placeholder="Selecione um tam."
          remove-default-margin
          :disabled="!sizes.length"
        />
      </div>

      <div class="col-3 align-self-end">
        <AppInput
          :id="`clothes.${index}.number`"
          v-model="form.clothes[clothIndex].items_individual[index].number"
          :name="`clothes.${index}.number`"
          input-class="form-control-sm"
          :default-margin="false"
          placeholder="Digite o núm..."
          :mask="maskInteger"
        />
      </div>

      <div class="col-2">
        <AppButton
          type="button"
          color="success"
          outlined
          btn-class="btn-sm"
          class="me-2"
          :icon="icons.faPlus"
          @click.prevent="newIndividualNameItem"
        />

        <AppButton
          type="button"
          color="danger"
          outlined
          btn-class="btn-sm"
          :icon="icons.faTrashAlt"
          :disabled="isDeleteDisabled"
          @click.prevent="deleteIndividualNameItem(index)"
        />
      </div>
    </div>
  </div>
</template>
