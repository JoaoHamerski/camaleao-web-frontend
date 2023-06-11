<script>
import { form } from '../OrderForm.vue'
import { getUniqueValues } from './FormClothes.vue';

import FormClothesIndNames from './FormClothesIndNames.vue';
import FormClothesNoIndNames from './FormClothesNoIndNames.vue'
import FormClothesOptions from './FormClothesOptions.vue';

export default {
  components: {
    FormClothesIndNames,
    FormClothesNoIndNames,
    FormClothesOptions
  },
  props: {
    index: {
      type: Number,
      required: true
    },
    cloth: {
      type: Object,
      default: () => ({})
    },
    clothMatches: {
      type: Array,
      default: () => []
    },
    optionsListeners:{
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    form,
    match: null
  }),
  computed: {
    models () {
      return getUniqueValues(this.clothMatches, 'model')
    }
  },
  methods: {
    onMatchFound (match) {
      this.form.clothes[this.index].match = match
      this.match = match
    }
  }
}
</script>

<template>
  <div class="mb-2">
    <FormClothesOptions
      class="mb-2"
      v-bind="{ index, models, clothMatches }"
      v-on="optionsListeners"
      @matched="onMatchFound"
    />

    <template v-if="match">
      <div class="col mb-3">
        <AppCheckboxSwitch
          :id="`clothes.${index}.individual_names`"
          v-model="form.clothes[index].individual_names"
        >
          Nomes individuais
        </AppCheckboxSwitch>
      </div>

      <AppContainer color="secondary">
        <template #title>
          <small>
            Nomes
            {{ cloth.individual_names ? '(individuais)' : '' }}
          </small>
        </template>
        <template #body>
          <FormClothesIndNames
            v-if="cloth.individual_names"
            :cloth-index="index"
            :match="match"
          />
          <FormClothesNoIndNames
            v-else
            :cloth-index="index"
            :match="match"
          />
        </template>
      </AppContainer>
    </template>
  </div>
</template>
