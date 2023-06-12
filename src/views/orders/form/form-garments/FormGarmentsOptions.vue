<script>
import { faPaste, faTrashAlt, faPlus, faSyncAlt, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { form } from '../OrderForm.vue';
import { getUniqueValues } from './FormGarments.vue';
import { camelCase, get, isEmpty } from 'lodash-es';

export default {
  props: {
    index: {
      type: Number,
      required: true
    },
    garmentMatches: {
      type: Array,
      default: () => []
    },
    models: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    form,
    matched: null,
    possibleMatch: null,
    materials: [],
    neckTypes: [],
    sleeveTypes: [],
    icons: {
      faPlus,
      faPaste,
      faTrashAlt,
      faSyncAlt,
      faExclamationCircle
    }
  }),
  computed: {
    isDeleteDisabled () {
      return this.form.garments.length <= 1
    },
    formGarment () {
      return this.form.garments[this.index]
    },
  },
  mounted () {
    this.evaluateOptions()

    this.$nextTick(() => {
      this.evaluateOptions()

      const filledFields = this.getOnlyFilledOptionsKeys()
      if (!filledFields.length) {
        this.materials = []
        this.neckTypes = []
        this.sleeveTypes = []
      }
    })
  },
  methods: {
    get,
    getOnlyFilledOptionsKeys() {
      const keys = [
        'model_id',
        'material_id',
        'neck_type_id',
        'sleeve_type_id'
      ]

      return keys.filter(key => !isEmpty(this.formGarment[key]))
    },
    compareOptions (garmentMatch, keysToCompare) {
      const keys = keysToCompare.map(key => key.replace('_id', ''))

      return keys.every(
        key => this.formGarment[`${key}_id`] === garmentMatch[key].id
      )
    },
    resetFormOptions () {
      this.matched = null

      this.form.set({
        [`garments.${this.index}.material_id`]: '',
        [`garments.${this.index}.neck_type_id`]: '',
        [`garments.${this.index}.sleeve_type_id`]: '',
      })

      this.form.garments[this.index].items.forEach(item => {
        item.size_id = ''
      })
    },
    fillSelectOptions (matches) {
      const fields = ['material', 'neck_type', 'sleeve_type']

      for (const field of fields) {
        const fieldCamelPlural = camelCase(field) + 's'

        this[fieldCamelPlural] = getUniqueValues(matches, field)
      }
    },
    evaluateOptions (field = null) {
      this.$emit('matched', null)
      this.matched = null
      this.possibleMatch = null

      if (field == 'model') {
        this.resetFormOptions()
      }

      const matches = this.garmentMatches.filter(
        garmentMatch => this.compareOptions(
          garmentMatch,
          this.getOnlyFilledOptionsKeys()
        )
      )

      this.fillSelectOptions(matches)

      if (matches.length === 1) {
        this.possibleMatch = matches[0]
      }

      if (this.filledFieldsMatch()) {
        this.onMatchFound()
      }
    },
    onMatchFound () {
      this.matched = this.possibleMatch
      this.$emit('matched', this.matched)
      this.possibleMatch = null
    },
    filledFieldsMatch () {
      if (!this.possibleMatch) {
        return false
      }

      const keys = ['model_id', 'material_id', 'neck_type_id', 'sleeve_type_id']

      const keysToCompare = keys.filter(key => {
        return !isEmpty(this.possibleMatch[key.replace('_id', '')]?.id)
      })

      return this.compareOptions(
        this.possibleMatch,
        keysToCompare
      )
    },
    onFillWithMatchedClick () {
      const matched = this.possibleMatch
      const { model, material, neck_type, sleeve_type } = matched

      this.form.set({
        [`garments.${this.index}.model_id`]: model.id || '',
        [`garments.${this.index}.material_id`]: material.id || '',
        [`garments.${this.index}.neck_type_id`]: neck_type.id || '',
        [`garments.${this.index}.sleeve_type_id`]: sleeve_type.id || '',
      })

      this.evaluateOptions()
    },
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

    <div class="small text-secondary mb-3">
      <FontAwesomeIcon :icon="icons.faExclamationCircle" />
      Ao selecionar uma opção,
      todas opções são atualizadas para refletir as combinações possíveis,
      clique em
      <FontAwesomeIcon
        :icon="icons.faSyncAlt"
        fixed-width
      />
      para reseta-las
    </div>

    <div>
      <span
        class="link-primary clickable fw-bold small"
        @click.prevent="evaluateOptions('model')"
      >
        <FontAwesomeIcon
          :icon="icons.faSyncAlt"
          fixed-width
        />
        Resetar
      </span>
    </div>

    <div
      class="row"
    >
      <div class="col-3">
        <AppSimpleSelect
          :id="`garments.${index}.model_id`"
          v-model="form.garments[index].model_id"
          :name="`garments.${index}.model_id`"
          :options="models"
          label-prop="name"
          placeholder="Selecione um modelo"
          :select-class="['form-select-sm', {'is-valid': matched && formGarment.model_id}]"
          @change="evaluateOptions('model')"
        >
          Modelo
        </AppSimpleSelect>
      </div>
      <div class="col-3">
        <AppSimpleSelect
          :id="`garments.${index}.material_id`"
          v-model="form.garments[index].material_id"
          :disabled="!materials.length"
          :name="`garments.${index}.material_id`"
          :options="materials"
          label-prop="name"
          placeholder="Selecione um material"
          :select-class="['form-select-sm', {'is-valid': matched && formGarment.material_id}]"
          @change="evaluateOptions('material')"
        >
          Material
        </AppSimpleSelect>
      </div>
      <div class="col-3">
        <AppSimpleSelect
          :id="`garments.${index}.neck_type_id`"
          v-model="form.garments[index].neck_type_id"
          :disabled="!neckTypes.length"
          :name="`garments.${index}.neck_type_id`"
          :options="neckTypes"
          label-prop="name"
          placeholder="Selecione um tipo"
          :select-class="['form-select-sm', {'is-valid': matched && formGarment.neck_type_id}]"
          @change="evaluateOptions('neck_type')"
        >
          Tipo de gola
        </AppSimpleSelect>
      </div>
      <div class="col-3">
        <AppSimpleSelect
          :id="`garments.${index}.sleeve_type_id`"
          v-model="form.garments[index].sleeve_type_id"
          :disabled="!sleeveTypes.length"
          :name="`garments.${index}.sleeve_type_id`"
          :options="sleeveTypes"
          label-prop="name"
          placeholder="Selecione um tipo"
          :select-class="['form-select-sm', {'is-valid': matched && formGarment.sleeve_type_id}]"
          @change="evaluateOptions('sleeve_type')"
        >
          Tipo de manga
        </AppSimpleSelect>
      </div>
    </div>
    <div
      v-if="possibleMatch"
      class="col-6"
    >
      <div class="small text-success fw-bold">
        Apenas uma combinação possível (<a
          href="#"
          class="text-decoration-none"
          @click.prevent="onFillWithMatchedClick"
        >preencher</a>):
      </div>
      <table class="table table-sm table-bordered">
        <tbody>
          <tr>
            <td class="fw-bold">
              Modelo
            </td>
            <td>{{ get(possibleMatch, 'model.name', 'N/A') }}</td>
          </tr>
          <tr>
            <td class="fw-bold">
              Material
            </td>
            <td>{{ get(possibleMatch, 'material.name', 'N/A') }}</td>
          </tr>
          <tr>
            <td class="fw-bold">
              Tipo de gola
            </td>
            <td>{{ get(possibleMatch, 'neck_type.name', 'N/A') }}</td>
          </tr>
          <tr>
            <td class="fw-bold">
              Tipo de manga
            </td>
            <td>{{ get(possibleMatch, 'sleeve_type.name', 'N/A') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
