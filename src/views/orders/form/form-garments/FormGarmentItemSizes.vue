<script>
import SizesIndividualName from './SizesIndividualName.vue';
import SizesNoIndividualName from './SizesNoIndividualName.vue'
export default {
  components: {
    SizesIndividualName,
    SizesNoIndividualName
  },
  props: {
    match: {
      type: Object,
      required: true
    },
    garmentIndex: {
      type: Number,
      required: true
    },
    form: {
      type: Object,
      required: true
    }
  },
  computed: {
    formGarment () {
      return this.form.garments[this.garmentIndex]
    },
    hasIndividualNames () {
      return this.form.garments[this.garmentIndex].individual_names
    },
    sizesOptions () {
      return this.match.sizes
    }
  },
  methods: {
    onNewGarmentSize (event) {
      this.$emit('new-garment-size', event)
    },
    onDeleteGarmentSize (event) {
      this.$emit('delete-garment-size', event)
    },
    onIndividualNamesChange (event) {
      this.form.errors.clear('*')
      this.form.set({
        [`garments.${this.garmentIndex}.individual_names`]: event
      })
    }
  }
}
</script>

<template>
  <div>
    <div class="mb-3">
      <AppCheckboxSwitch
        :id="`garments.${garmentIndex}.inidividual_names`"
        :value="form.garments[garmentIndex].individual_names"
        @input="onIndividualNamesChange"
      >
        Nomes individuais
      </AppCheckboxSwitch>
    </div>
    <AppContainer color="secondary">
      <template #title>
        <small>
          Tamanhos
          {{ hasIndividualNames ? '(nomes individuais)' : '' }}
        </small>
      </template>
      <template #body>
        <SizesIndividualName
          v-if="formGarment.individual_names"
          v-bind="{ garmentIndex, form, sizesOptions }"
          @new-garment-size="onNewGarmentSize"
          @delete-garment-size="onDeleteGarmentSize"
        />
        <SizesNoIndividualName
          v-else
          v-bind="{ garmentIndex, form, sizesOptions }"
          @new-garment-size="onNewGarmentSize"
          @delete-garment-size="onDeleteGarmentSize"
        />
      </template>
    </AppContainer>
  </div>
</template>
