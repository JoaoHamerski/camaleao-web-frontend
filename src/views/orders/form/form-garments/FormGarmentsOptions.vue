<script>
import { faPaste, faTrashAlt, faPlus, faSyncAlt, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
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
  watch: {
    formGarment: {
      handler (form) {
        this.form.errors.clear(`garments.${this.index}.match_id`)
        this.form.set({
          [`garments.${this.index}.match_id`]: form?.match?.id || ''
        })
      },
      deep: true
    }
  },
  async mounted () {
    this.evaluateOptions()
    await this.$nextTick()
    this.evaluateOptions()

    if (!isEmpty(this.order)) {
      this.populateForm()
    }

    const filledFields = await this.getOnlyFilledOptionsKeys()

    if (!filledFields.length) {
      this.materials = []
      this.neckTypes = []
      this.sleeveTypes = []
    }

    if (!isEmpty(this.order)) {
      this.onMatchFound()
    }
  },
  methods: {
    get,
    getPopulatedItems (garment) {
      if (garment.individual_names) {
        return garment.individual_names.map(item => ({
          name: item.name,
          number: item.number,
          size_id: item.size_id
        }))
      }

      return garment.sizes.map(size => ({
          size_id: size.id,
          quantity: `${size.pivot.quantity}`
      }))
    },
    populateForm() {
      const garmentForm = this.form.garments[this.index]
      const garment = this.order.garments[this.index]

      if (!garment) {
        return
      }

      const match = garment.match
      const items = this.getPopulatedItems(garment)
      const itemsPropName = garment.individual_names
        ? 'items_individual' : 'items'

      Object.assign(garmentForm, {
        match_id: match?.id || '',
        individual_names: !!garment.individual_names,
        model_id: match?.model?.id || '',
        material_id: match?.material?.id || '',
        neck_type_id: match?.neck_type?.id || '',
        sleeve_type_id: match?.sleeve_type?.id || '',
        [itemsPropName]: items
      })
    },
    async getOnlyFilledOptionsKeys() {
      const keys = [
        'model_id',
        'material_id',
        'neck_type_id',
        'sleeve_type_id'
      ]
      await this.$nextTick()

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
        [`garments.${this.index}.match_id`]: '',
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
        const values = getUniqueValues(matches, field)

        this[fieldCamelPlural] = values
      }
    },
    async evaluateOptions (field = null) {
      this.$emit('matched', null)
      this.matched = null
      this.possibleMatch = null

      if (field == 'model') {
        this.resetFormOptions()
      }

      const filledOptionsKey = await this.getOnlyFilledOptionsKeys()

      const matches = this.garmentMatches.filter(
        garmentMatch => this.compareOptions(garmentMatch, filledOptionsKey)
      )

      await this.$nextTick()

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

      if (this.possibleMatch === null) {
        return
      }

      this.$emit('matched', this.matched)
      this.possibleMatch = null
      this.$nextTick(() => {
        this.$forceUpdate()
      })
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
      const { id, model, material, neck_type, sleeve_type } = matched

      this.form.set({
        [`garments.${this.index}.id`]: id || '',
        [`garments.${this.index}.model_id`]: model?.id || '',
        [`garments.${this.index}.material_id`]: material?.id || '',
        [`garments.${this.index}.neck_type_id`]: neck_type?.id || '',
        [`garments.${this.index}.sleeve_type_id`]: sleeve_type?.id || '',
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
    },
    onOptionChange () {

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
      class="row flex-column flex-md-row"
      @change.capture="onOptionChange"
    >
      <div class="col col-md-3">
        <AppSimpleSelect
          :id="`garments.${index}.model_id`"
          :value="form.garments[index].model_id"
          :name="`garments.${index}.model_id`"
          :options="models"
          label-prop="name"
          placeholder="Selecione um modelo"
          :select-class="['form-select-sm', {'is-valid': matched && formGarment.model_id}]"
          :error="form.errors.get(`garments.${index}.match_id`)"
          @input="form.set({
            [`garments[${index}].model_id`]: $event
          })"
          @change="evaluateOptions('model')"
        >
          Modelo
        </AppSimpleSelect>
      </div>
      <div class="col col-md-3">
        <AppSimpleSelect
          :id="`garments.${index}.material_id`"
          :value="form.garments[index].material_id"
          :disabled="!materials.length"
          :name="`garments.${index}.material_id`"
          :options="materials"
          label-prop="name"
          placeholder="Selecione um material"
          :select-class="['form-select-sm', {'is-valid': matched && formGarment.material_id}]"
          @input="form.set({
            [`garments[${index}].material_id`]: $event
          })"
          @change="evaluateOptions('material')"
        >
          Material
        </AppSimpleSelect>
      </div>
      <div class="col col-md-3">
        <AppSimpleSelect
          :id="`garments.${index}.neck_type_id`"
          :value="form.garments[index].neck_type_id"
          :disabled="!neckTypes.length"
          :name="`garments.${index}.neck_type_id`"
          :options="neckTypes"
          label-prop="name"
          placeholder="Selecione um tipo"
          :select-class="['form-select-sm', {'is-valid': matched && formGarment.neck_type_id}]"
          @input="form.set({
            [`garments[${index}].neck_type_id`]: $event
          })"
          @change="evaluateOptions('neck_type')"
        >
          <span class="text-nowrap">
            Tipo de gola
          </span>
        </AppSimpleSelect>
      </div>
      <div class="col col-md-3">
        <AppSimpleSelect
          :id="`garments.${index}.sleeve_type_id`"
          :value="form.garments[index].sleeve_type_id"
          :disabled="!sleeveTypes.length"
          :name="`garments.${index}.sleeve_type_id`"
          :options="sleeveTypes"
          label-prop="name"
          placeholder="Selecione um tipo"
          :select-class="['form-select-sm', {'is-valid': matched && formGarment.sleeve_type_id}]"
          @input="form.set({
            [`garments[${index}].sleeve_type_id`]: $event
          })"
          @change="evaluateOptions('sleeve_type')"
        >
          <div class="text-nowrap">
            Tipo de manga
          </div>
        </AppSimpleSelect>
      </div>
    </div>
    <div
      v-if="possibleMatch"
      class="col col-md-6"
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
