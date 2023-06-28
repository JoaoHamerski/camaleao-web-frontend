<script>
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { camelCase, isEmpty, isEqual, map, remove, uniqBy } from 'lodash-es';

import FormGarmentItemMatchesPossible from './FormGarmentItemMatchesPossible.vue';

const getUniqueEntities = (matches, entity) => {
  const entities = matches.map(match => match[entity])
    .filter(entity => entity !== null)

  return uniqBy(entities, 'id')
}

const ENTITIES = [
  'model',
  'material',
  'neck_type',
  'sleeve_type'
]

export default {
  components: {
    FormGarmentItemMatchesPossible
  },
  props: {
    index: {
      type: Number,
      required: true
    },
    form: {
      type: Object,
      required: true
    },
    garmentMatches: {
      type: Array,
      default: () => []
    },
    matched: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    icons: {
      faSyncAlt
    },
    possibleMatch: null,
    models: [],
    materials: [],
    neckTypes: [],
    sleeveTypes: [],
    filteredMatches: [],
  }),
  computed: {
    formGarment () {
      return this.form.garments[this.index]
    }
  },
  beforeMount() {
    this.populateSelectOptions()
  },
  mounted () {
    this.onOptionsChanged()
  },
  methods: {
    populateSelectOptions () {
      for (const entity of ENTITIES) {
        const prop = camelCase(entity) + 's'
        const items = getUniqueEntities(this.garmentMatches, entity)

        this[prop] = items.map(item => ({...item, disabled: false}))
      }
    },
    disableUnmatchedOptions (filteredMatches) {
      for (const entity of ENTITIES) {
        const entityProp = camelCase(entity) + 's'

        if (!this[entityProp] || entityProp === 'models') {
          continue
        }

        const filteredItemsIds = map(getUniqueEntities(filteredMatches, entity), 'id')

        this[entityProp].forEach(item => {
          item.disabled = false

          if (!filteredItemsIds.includes(item.id)) {
            item.disabled = true
          }
        })
      }
    },
    filterGarmentMatches() {
      const { model_id, material_id, neck_type_id, sleeve_type_id } = this.formGarment

      const checkMatchFields = (matchField, formField) => {
        return isEmpty(formField)
           ? true
           : matchField === formField
      }

      const filteredMatches = this.garmentMatches.filter(
        match => checkMatchFields(match.model?.id || '', model_id)
          && checkMatchFields(match.material?.id || '', material_id)
          && checkMatchFields(match.neck_type?.id || '', neck_type_id)
          && checkMatchFields(match.sleeve_type?.id || '', sleeve_type_id)
      )

      this.disableUnmatchedOptions(filteredMatches)

      return filteredMatches
    },
    onModelChange () {
      this.resetFormMatch(false)
    },
    isExactMatch (possibleMatch) {
      if (possibleMatch === null) {
        return false
      }

      return ENTITIES.every(entity => {
        if (isEmpty(this.formGarment[entity + '_id'])) {
          return isEmpty(possibleMatch[entity])
        }

        return this.formGarment[entity + '_id'] === possibleMatch[entity].id
      })
    },
    getPossibleMatch(filtered) {
      if (filtered.length === 1) {
        return filtered[0]
      }

      const isAllSame = filtered.every((match, index) => {
        return filtered[index].model?.id === match.model?.id
          && filtered[index].material?.id === match.material?.id
          && filtered[index].neck_type?.id === match.neck_type?.id
          && filtered[index].sleeve_type?.id === match.sleeve_type?.id
      })

      return isAllSame ? filtered[0] : null
    },
    onOptionsChanged () {
      const filtered = this.filterGarmentMatches()
      this.possibleMatch = null
      this.$emit('matched', null)

      this.possibleMatch = this.getPossibleMatch(filtered)

      if (this.isExactMatch(this.possibleMatch)) {
        this.onExactMatchFound(this.possibleMatch)
      }
    },
    fillWithPossibleMatch () {
      const match = this.possibleMatch

      this.form.set({
        [`garments.${this.index}.model_id`]: match.model?.id || '',
        [`garments.${this.index}.material_id`]: match.material?.id || '',
        [`garments.${this.index}.neck_type_id`]: match.neck_type?.id || '',
        [`garments.${this.index}.sleeve_type_id`]: match.sleeve_type?.id || '',
      })

      this.onOptionsChanged()
    },
    resetFormMatch (removePossibleMatch) {
      this.form.set({
        [`garments.${this.index}.material_id`]: '',
        [`garments.${this.index}.neck_type_id`]: '',
        [`garments.${this.index}.sleeve_type_id`]: '',
      })

      if (removePossibleMatch) {
        this.possibleMatch = null
      }

      this.filterGarmentMatches()
    },
    onExactMatchFound (match) {
      this.$emit('matched', match)
      this.possibleMatch = null
    }
  }
}
</script>

<template>
  <div>
    <span
      class="link-primary clickable fw-bold small"
      @click.prevent="resetFormMatch(true)"
    >
      <FontAwesomeIcon
        :icon="icons.faSyncAlt"
        fixed-width
      /> Resetar
    </span>
    <div
      class="row"
      @change.capture="onOptionsChanged"
    >
      <div class="col">
        <AppSimpleSelect
          :id="`garments.${index}.model_id`"
          :name="`garments.${index}.model_id`"
          :value="form.garments[index].model_id"
          label-prop="name"
          placeholder="Selecione um modelo"
          :options="models"
          :select-class="['form-select-sm', {'is-valid': matched}]"
          @change="onModelChange"
          @input="form.set({
            [`garments.${index}.model_id`]: $event
          })"
        >
          Modelo
        </AppSimpleSelect>
      </div>
      <div class="col">
        <AppSimpleSelect
          :id="`garments.${index}.material_id`"
          :name="`garments.${index}.material_id`"
          :value="form.garments[index].material_id"
          label-prop="name"
          placeholder="Selecione um material"
          :options="materials"
          :select-class="['form-select-sm', {'is-valid': matched}]"
          :disabled="!formGarment.model_id"
          @input="form.set({
            [`garments.${index}.material_id`]: $event
          })"
        >
          Material
        </AppSimpleSelect>
      </div>
      <div class="col">
        <AppSimpleSelect
          :id="`garments.${index}.neck_type_id`"
          :name="`garments.${index}.neck_type_id`"
          :value="form.garments[index].neck_type_id"
          label-prop="name"
          placeholder="Selecione um tipo"
          :options="neckTypes"
          :select-class="['form-select-sm', {'is-valid': matched}]"
          :disabled="!formGarment.model_id"
          @input="form.set({
            [`garments.${index}.neck_type_id`]: $event
          })"
        >
          Tipo de gola
        </AppSimpleSelect>
      </div>
      <div class="col">
        <AppSimpleSelect
          :id="`garments.${index}.sleeve_type_id`"
          :name="`garments.${index}.sleeve_type_id`"
          :value="form.garments[index].sleeve_type_id"
          label-prop="name"
          placeholder="Selecione um tipo"
          :options="sleeveTypes"
          :select-class="['form-select-sm', {'is-valid': matched}]"
          :disabled="!formGarment.model_id"
          @input="form.set({
            [`garments.${index}.sleeve_type_id`]: $event
          })"
        >
          Tipo de manga
        </AppSimpleSelect>
      </div>
    </div>

    <FormGarmentItemMatchesPossible
      v-if="possibleMatch"
      :possible-match="possibleMatch"
      @fill-options="fillWithPossibleMatch"
    />
  </div>
</template>
