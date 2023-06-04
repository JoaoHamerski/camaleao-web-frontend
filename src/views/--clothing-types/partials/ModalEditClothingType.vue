<script>
import ClothingTypeForm from './ClothingTypeForm.vue'

export default {
  components: {
    ClothingTypeForm
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    clothingType: {
      type: Object,
      default: null
    }
  },
  methods: {
    onSuccess () {
      this.$emit('success')
    }
  }
}
</script>

<template>
  <AppModal
    id="modalEditClothingType"
    :value="value"
    color="success"
    centered
    v-on="$listeners"
  >
    <template #title>
      Editar tipo de roupa
    </template>
    <template #body>
      <ClothingTypeForm
        v-if="value"
        :is-edit="true"
        :clothing-type="clothingType"
        @success="onSuccess"
      />
    </template>
  </AppModal>
</template>
