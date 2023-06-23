<script>
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
    },
    order: {
      type: Object,
      default: () => ({})
    },
    form: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    match: null
  }),
  computed: {
    models () {
      return getUniqueValues(this.garmentMatches, 'model')
    }
  },
  methods: {
    onNewGarmentSize (event) {
      this.$emit('new-garment-size', event)
    },
    onDeleteGarmentSize(event) {
      this.$emit('delete-garment-size', event)
    },
    onMatchFound (match) {
      this.match = match
      this.form.set({
        [`garments[${this.index}].match`]: match
      })
    }
  }
}
</script>

<template>
  <div class="mb-2">
    <FormGarmentsOptions
      class="mb-2"
      v-bind="{ index, models, garmentMatches, order, form }"
      v-on="optionsListeners"
      @matched="onMatchFound"
    />

    <template v-if="match">
      <div class="col mb-3">
        <AppCheckboxSwitch
          :id="`garments.${index}.individual_names`"
          :value="form.garments[index].individual_names"
          @input="form.set({
            [`garments[${index}].individual_names`]: $event
          })"
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
            v-bind="{garmentIndex: index, match, form}"
            @new-garment-size="onNewGarmentSize"
            @delete-garment-size="onDeleteGarmentSize"
          />
          <FormGarmentsNoIndNames
            v-else
            v-bind="{garmentIndex: index, match, form}"
            @delete-garment-size="onDeleteGarmentSize"
            @new-garment-size="onNewGarmentSize"
          />
        </template>
      </AppContainer>
    </template>
  </div>
</template>
