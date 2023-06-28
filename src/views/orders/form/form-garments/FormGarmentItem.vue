<script>
import { DEFAULT_GARMENT_ITEM, DEFAULT_GARMENT_INDIVIDUAL_ITEM } from '../OrderForm.vue'

import FormGarmentItemOptions from './FormGarmentItemOptions.vue'
import FormGarmentItemTip from './FormGarmentItemTip.vue'
import FormGarmentItemMatches from './FormGarmentItemMatches.vue';
import FormGarmentItemSizes from './FormGarmentItemSizes.vue';

export default {
  components: {
    FormGarmentItemOptions,
    FormGarmentItemTip,
    FormGarmentItemMatches,
    FormGarmentItemSizes
  },
  props: {
    garment: {
      type: Object,
      required: true
    },
    garmentMatches: {
      type: Array,
      default: () => []
    },
    index: {
      type: Number,
      required: true
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
    matched () {
      return this.match !== null
    },
    isDeleteGarmentDisabled () {
      return this.form.garments.length <= 1
    }
  },
  methods: {
    onNewGarment () {
      this.$emit('new-garment')
    },
    onDuplicateGarment (event) {
      this.$emit('duplicate-garment', event)
    },
    onDeleteGarment (event) {
      this.$emit('delete-garment', event)
    },
    onNewGarmentSize (event) {
      this.$emit('new-garment-size', event)
    },
    onDeleteGarmentSize (event) {
      this.$emit('delete-garment-size', event)
    },
    onMatchFound (match) {
      this.match = match
      this.form.set({
        [`garments.${this.index}.match`]: match ? match : null,
        [`garments.${this.index}.match_id`]: match ? match.id : '',
        [`garments.${this.index}.items`]: [{...DEFAULT_GARMENT_ITEM}],
        [`garments.${this.index}.items_individual`]: [{...DEFAULT_GARMENT_INDIVIDUAL_ITEM}]
      })
    }
  }
}
</script>

<template>
  <div>
    <FormGarmentItemOptions
      v-bind="{ garment, isDeleteGarmentDisabled }"
      class="mb-2"
      @new-garment="onNewGarment"
      @duplicate-garment="onDuplicateGarment"
      @delete-garment="onDeleteGarment"
    />

    <FormGarmentItemTip class="mb-3" />

    <FormGarmentItemMatches
      v-bind="{ index, form, garmentMatches, matched }"
      @matched="onMatchFound"
    />

    <FormGarmentItemSizes
      v-if="matched"
      v-bind="{ match, garmentIndex: index, form }"
      @new-garment-size="onNewGarmentSize"
      @delete-garment-size="onDeleteGarmentSize"
    />
  </div>
</template>
