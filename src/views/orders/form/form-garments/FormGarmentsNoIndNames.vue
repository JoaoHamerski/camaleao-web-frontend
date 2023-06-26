<script>
import { faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { maskInteger } from '@/utils/masks'
import { isEmpty } from 'lodash-es';

export default {
  props: {
    garmentIndex: {
      type: Number,
      required: true
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
    maskInteger: maskInteger({
      numeralIntegerScale: 3,
      stripLeadingZeroes: true,
      numeralDecimalScale: 0
    }),
    icons: {
      faTrashAlt,
      faPlus
    }
  }),
  computed: {
    sizes () {
      if (isEmpty(this.match)) {
        return []
      }

      return this.match.sizes
    },
    isDeleteDisabled () {
      return this.form.garments[this.garmentIndex].items.length <= 1
    }
  },
  methods: {
    newItem () {
      this.$emit('new-garment-size', {
        garmentIndex: this.garmentIndex,
        isIndividual: false
      })
    },
    deleteItem (index) {
      if (this.isDeleteDisabled) {
        return
      }

      this.$emit('delete-garment-size', {
        garmentIndex: this.garmentIndex,
        index,
        isIndividual: false
      })
    }
  }
}
</script>

<template>
  <div>
    <div class="row d-none d-md-flex">
      <div class="col-3 small">
        Tamanho
      </div>
      <div class="col-2 small">
        Quantidade
      </div>
    </div>
    <div
      v-for="(_, index) in form.garments[garmentIndex].items"
      :key="index"
      class="row flex-column flex-md-row mb-2"
    >
      <div class="row col gx-4 gx-md-3 col-md-3 mb-1 mb-md-0">
        <span class="small col-4 d-block d-md-none text-nowrap">Tamanho: </span>
        <div class="col">
          <AppSimpleSelect
            :id="`garments.${garmentIndex}.items.${index}.size_id`"
            :value="form.garments[garmentIndex].items[index].size_id"
            :name="`garments.${garmentIndex}.items.${index}.size_id`"
            :options="sizes"
            label-prop="name"
            select-class="form-select-sm"
            placeholder="Selecione um tam."
            remove-default-margin
            :disabled="!sizes.length"
            :error="form.errors.has(`garments.${garmentIndex}.items.${index}.size_id`)"
            @input="form.set({
              [`garments[${garmentIndex}].items[${index}].size_id`]: $event
            })"
          />
        </div>
      </div>

      <div class="row col gx-4 gx-md-3 col-md-2 mb-1 mb-md-0">
        <span class="small col-4 d-block d-md-none text-nowrap">Qtd: </span>
        <div class="col">
          <AppInput
            :id="`garments.${garmentIndex}.items.${index}.quantity`"
            :value="form.garments[garmentIndex].items[index].quantity"
            :name="`garments.${garmentIndex}.items.${index}.quantity`"
            input-class="form-control-sm"
            :default-margin="false"
            :mask="maskInteger"
            :error="form.errors.has(`garments.${garmentIndex}.items.${index}.quantity`)"
            placeholder="Qtd..."
            @input="form.set({
              [`garments[${garmentIndex}].items[${index}].quantity`]: $event
            })"
          />
        </div>
      </div>
      <div class="col col-md-2 mb-3 mb-md-0">
        <AppButton
          :icon="icons.faPlus"
          color="success"
          outlined
          btn-class="btn-sm"
          class="me-2"
          type="button"
          @click.prevent="newItem"
        />
        <AppButton
          :icon="icons.faTrashAlt"
          color="danger"
          outlined
          btn-class="btn-sm"
          :disabled="isDeleteDisabled"
          type="button"
          @click.prevent="deleteItem(index)"
        />
      </div>
    </div>
  </div>
</template>
