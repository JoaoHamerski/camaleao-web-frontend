<script>
import { faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { form, DEFAULT_CLOTH_ITEM } from '../OrderForm.vue'
import { maskInteger } from '@/utils/masks'

export default {
  props: {
    clothIndex: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    form,
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
    isDeleteDisabled () {
      return this.form.clothes[this.clothIndex].items.length <= 1
    }
  },
  methods: {
    newItem () {
      this.form.clothes[this.clothIndex].items.push({...DEFAULT_CLOTH_ITEM})
    },
    deleteItem (index) {
      if (this.isDeleteDisabled) {
        return
      }

      this.form.clothes[this.clothIndex].items.splice(index, 1)
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
      <div class="col-3 small">
        Quantidade
      </div>
    </div>
    <div
      v-for="(_, index) in form.clothes[clothIndex].items"
      :key="index"
      class="row mb-2"
    >
      <div class="col-3">
        <AppSimpleSelect
          :id="`clothes.${index}.size`"
          v-model="form.clothes[clothIndex].items[index].size"
          :name="`clothes.${index}.size`"
          select-class="form-select-sm"
          placeholder="Selecione um tam."
          remove-default-margin
        />
      </div>

      <div class="col-3">
        <AppInput
          :id="`clothes.${index}.quantity`"
          v-model="form.clothes[clothIndex].items[index].quantity"
          :name="`clothes.${index}.quantity`"
          input-class="form-control-sm"
          :default-margin="false"
          :mask="maskInteger"
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
