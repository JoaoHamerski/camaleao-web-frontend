<script>
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { maskInteger } from '@/utils/masks'

export default {
  props: {
    garmentIndex: {
      type: Number,
      required: true
    },
    form: {
      type: Object,
      required: true
    },
    sizesOptions: {
      type: Array,
      default: () => []
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
    }),
  }),
  computed: {
    isDeletedDisabled () {
      return this.form.garments[this.garmentIndex].items_individual.length <= 1
    }
  },
  methods: {
    onNewGarmentSize () {
      this.$emit('new-garment-size', {
        garmentIndex: this.garmentIndex,
        isIndividual: true,
      })
    },
    onDeleteGarmentSize (index) {
      this.$emit('delete-garment-size', {
        index,
        garmentIndex: this.garmentIndex,
        isIndividual: true,
      })
    }
  }
}
</script>

<template>
  <div>
    <template v-for="(item, index) in form.garments[garmentIndex].items_individual">
      <div
        :key="index"
        class="row mb-2"
      >
        <div class="col-3">
          <AppSimpleSelect
            :id="`garments.${garmentIndex}.items.${index}.size_id`"
            :name="`garments.${garmentIndex}.items.${index}.size_id`"
            :value="form.garments[garmentIndex].items_individual[index].size_id"
            :options="sizesOptions"
            label-prop="name"
            placeholder="Selecione um tam."
            select-class="form-select-sm"
            remove-default-margin
            @input="form.set({
              [`garments.${garmentIndex}.items_individual.${index}.size_id`]: $event
            })"
          />
        </div>

        <div class="col-3">
          <AppInput
            :id="`garments.${garmentIndex}.items.${index}.name`"
            :name="`garments.${garmentIndex}.items.${index}.name`"
            :value="form.garments[garmentIndex].items_individual[index].name"
            input-class="form-control-sm"
            :default-margin="false"
            placeholder="Digite o nome..."
            @input="form.set({
              [`garments.${garmentIndex}.items_individual.${index}.name`]: $event
            })"
          />
        </div>

        <div class="col-2">
          <AppInput
            :id="`garments.${garmentIndex}.items.${index}.number`"
            :name="`garments.${garmentIndex}.items.${index}.number`"
            :value="form.garments[garmentIndex].items_individual[index].number"
            input-class="form-control-sm"
            :default-margin="false"
            placeholder="Número..."
            :mask="maskInteger"
            @input="form.set({
              [`garments.${garmentIndex}.items_individual.${index}.number`]: $event
            })"
          />
        </div>
        <div class="col-3">
          <AppButton
            btn-class="btn-sm"
            :icon="icons.faPlus"
            outlined
            color="success"
            class="me-2"
            @click.prevent="onNewGarmentSize"
          />
          <AppButton
            btn-class="btn-sm"
            :icon="icons.faTrashAlt"
            outlined
            color="danger"
            :disabled="isDeletedDisabled"
            @click.prevent="onDeleteGarmentSize(index)"
          />
        </div>
      </div>
    </template>
  </div>
</template>
