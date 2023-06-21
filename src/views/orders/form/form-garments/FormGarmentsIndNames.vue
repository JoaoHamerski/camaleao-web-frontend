<script>
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { maskInteger } from '@/utils/masks';
import { DEFAULT_GARMENT_INDIVIDUAL_ITEM } from '../OrderForm.vue'
import { isEmpty } from 'lodash-es';

export default {
  props: {
    garmentIndex: {
      type: Number,
      required: true,
    },
    match: {
      type: Object,
      default: () => ({})
    },
    form: {
      type: Object,
      required: true
    }
  },
  data: () => ({
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
      return this.form.garments[this.garmentIndex].items_individual.length <= 1
    }
  },
  methods: {
    newItem () {
      this.$emit('new-garment-size', {
        garmentIndex: this.garmentIndex,
        isIndividual: true
      })
    },
    deleteItem (index) {
      if (this.isDeleteDisabled) {
        return
      }

      this.$emit('delete-garment-size', {
        garmentIndex: this.garmentIndex,
        index,
        isIndividual: true
      })
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
      <div class="col-2 small">
        Tamanho
      </div>
      <div class="col-2 small">
        Número
      </div>
    </div>

    <div
      v-for="(_, index) in form.garments[garmentIndex].items_individual"
      :key="index"
      class="row align-items-end mb-2"
    >
      <div class="col-4">
        <AppInput
          :id="`garments.${index}.name`"
          :value="form.garments[garmentIndex].items_individual[index].name"
          :name="`garments.${index}.name`"
          input-class="form-control-sm"
          placeholder="Digite o nome..."
          :default-margin="false"
          @input="form.set({
            [`garments[${garmentIndex}].items_individual[${index}].name`]: $event
          })"
        />
      </div>

      <div class="col-2">
        <AppSimpleSelect
          :id="`garments.${index}.size`"
          :value="form.garments[garmentIndex].items_individual[index].size_id"
          :name="`garments.${index}.size`"
          :options="sizes"
          label-prop="name"
          select-class="form-select-sm"
          placeholder="Selecione um tam."
          remove-default-margin
          :disabled="!sizes.length"
          @input="form.set({
            [`garments[${garmentIndex}].items_individual[${index}].size_id`]: $event
          })"
        />
      </div>

      <div class="col-2 align-self-end">
        <AppInput
          :id="`garments.${index}.number`"
          :value="form.garments[garmentIndex].items_individual[index].number"
          :name="`garments.${index}.number`"
          input-class="form-control-sm"
          :default-margin="false"
          placeholder="Digite o núm..."
          :mask="maskInteger"
          @input="form.set({
            [`garments[${garmentIndex}].items_individual[${index}].number`]: $event
          })"
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
          @click.prevent="newItem"
        />

        <AppButton
          type="button"
          color="danger"
          outlined
          btn-class="btn-sm"
          :icon="icons.faTrashAlt"
          :disabled="isDeleteDisabled"
          @click.prevent="deleteItem(index)"
        />
      </div>
    </div>
  </div>
</template>
