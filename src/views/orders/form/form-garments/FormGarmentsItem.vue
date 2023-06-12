<script>
import { form } from '../OrderForm.vue'
import { getUniqueValues } from './FormGarments.vue';

import FormGarmentsIndNames from './FormGarmentsIndNames.vue';
import FormGarmentsNoIndNames from './FormGarmentsNoIndNames.vue'
import FormGarmentsOptions from './FormGarmentsOptions.vue';

export default {
  components: {
    FormGarmentsIndNames,
    FormGarmentsNoIndNames,
    FormGarmentsOptions
  },
  props: {
    index: {
      type: Number,
      required: true
    },
    garment: {
      type: Object,
      default: () => ({})
    },
    garmentMatches: {
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
      return getUniqueValues(this.garmentMatches, 'model')
    }
  },
  methods: {
    onMatchFound (match) {
      this.form.garments[this.index].match = match
      this.match = match
    }
  }
}
</script>

<template>
  <div class="mb-2">
    <FormGarmentsOptions
      class="mb-2"
      v-bind="{ index, models, garmentMatches }"
      v-on="optionsListeners"
      @matched="onMatchFound"
    />

    <template v-if="match">
      <div class="col mb-3">
        <AppCheckboxSwitch
          :id="`garments.${index}.individual_names`"
          v-model="form.garments[index].individual_names"
        >
          Nomes individuais
        </AppCheckboxSwitch>
      </div>

      <AppContainer color="secondary">
        <template #title>
          <small>
            Nomes
            {{ garment.individual_names ? '(individuais)' : '' }}
          </small>
        </template>
        <template #body>
          <FormGarmentsIndNames
            v-if="garment.individual_names"
            :garment-index="index"
            :match="match"
          />
          <FormGarmentsNoIndNames
            v-else
            :garment-index="index"
            :match="match"
          />
        </template>
      </AppContainer>
    </template>
  </div>
</template>
