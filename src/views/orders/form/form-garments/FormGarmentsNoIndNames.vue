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
      stripLeadingZeroes: false,
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
        garmentIndex: this.garmentIndex
      })
    },
    deleteItem (index) {
      if (this.isDeleteDisabled) {
        return
      }

      this.$emit('delete-garment-size', {
        garmentIndex: this.garmentIndex,
        index
      })
    }
  }
}
</script>

<template>
  <div>
    <div class="row">
      <div class="col-3 small">
        Tamanho
      </div>
      <div class="col-2 small">
        Quantidade
      </div>
      <div class="col-3 small">
        Total do item
      </div>
    </div>
    <div
      v-for="(_, index) in form.garments[garmentIndex].items"
      :key="index"
      class="row mb-2"
    >
      <div class="col-3">
        <AppSimpleSelect
          :id="`garments.${index}.size`"
          :value="form.garments[garmentIndex].items[index].size_id"
          :name="`garments.${index}.size`"
          :options="sizes"
          label-prop="name"
          select-class="form-select-sm"
          placeholder="Selecione um tam."
          remove-default-margin
          :disabled="!sizes.length"
          @input="form.set({
            [`garments[${garmentIndex}].items[${index}].size_id`]: $event
          })"
        />
      </div>

      <div class="col-2">
        <AppInput
          :id="`garments.${index}.quantity`"
          :value="form.garments[garmentIndex].items[index].quantity"
          :name="`garments.${index}.quantity`"
          input-class="form-control-sm"
          :default-margin="false"
          :mask="maskInteger"
          @input="form.set({
            [`garments[${garmentIndex}].items[${index}].quantity`]: $event
          })"
        />
      </div>
      <div class="col-2">
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
