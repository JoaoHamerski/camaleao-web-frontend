<script>
import { faPaste, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { form } from '../OrderForm.vue';

export default {
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    form,
    icons: {
      faPlus,
      faPaste,
      faTrashAlt
    }
  }),
  computed: {
    isDeleteDisabled () {
      return this.form.clothes.length <= 1
    }
  },
  methods: {
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
    <div class="row">
      <div class="col-3">
        <AppSimpleSelect
          :id="`clothes.${index}.model_id`"
          :name="`clothes.${index}.model_id`"
          select-class="form-select-sm"
          placeholder="Selecione um modelo"
        >
          Modelo
        </AppSimpleSelect>
      </div>
      <div class="col-3">
        <AppSimpleSelect
          :id="`clothes.${index}.material_id`"
          :name="`clothes.${index}.material_id`"
          select-class="form-select-sm"
          placeholder="Selecione um material"
        >
          Material
        </AppSimpleSelect>
      </div>
      <div class="col-3">
        <AppSimpleSelect
          :id="`clothes.${index}.neck_type_id`"
          :name="`clothes.${index}.neck_type_id`"
          select-class="form-select-sm"
          placeholder="Selecione um tipo"
        >
          Tipo de gola
        </AppSimpleSelect>
      </div>
      <div class="col-3">
        <AppSimpleSelect
          :id="`clothes.${index}.sleeve_type_id`"
          :name="`clothes.${index}.sleeve_type_id`"
          select-class="form-select-sm"
          placeholder="Selecione um tipo"
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
