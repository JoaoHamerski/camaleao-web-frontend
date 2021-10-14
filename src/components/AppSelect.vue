<script>
import { isBoolean } from 'lodash-es'

import Multiselect from 'vue-multiselect'

export default {
  components: {
    Multiselect
  },
  props: {
    value: undefined,
    name: {
      type: String,
      default: null
    },
    error: {
      type: [Boolean, String],
      default: false
    },
    customLabel: {
      type: Function,
      default: item => item
    },
    placeholder: {
      type: String,
      default: 'Selecione uma opção'
    },
    optional: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => []
    },
    hint: {
      type: String,
      default: null
    }
  },
  computed: {
    hasError () {
      return !!this.error
    },
    hasHint () {
      return !!(this.hint || this.$slots.hint)
    }
  },
  methods: {
    isBoolean
  }
}
</script>

<template>
  <div class="mb-3">
    <label
      class="form-label"
      :for="name"
    >
      <span class="fw-bold"><slot /></span>
      <span
        v-if="optional"
        class="small text-secondary"
      >(opcional)</span>
    </label>

    <Multiselect
      :id="name"
      :value="value"
      :custom-label="customLabel"
      :placeholder="placeholder"
      :options="options"
      :class="hasError && 'is-invalid'"
      select-label="Selecionar"
      selected-label="Selecionado"
      deselect-label="Remover"
      v-on="$listeners"
    >
      <template #noOptions>
        Lista está vazia.
      </template>

      <template #noResult>
        Nenhum resultado encontrado.
      </template>
    </Multiselect>
    <div
      v-if="hasError && !isBoolean(error)"
      class="small text-danger mb-n1"
    >
      {{ error }}
    </div>

    <small
      v-if="hasHint"
      class="form-text"
    >
      <slot
        v-if="$slots.hint"
        name="hint"
      />
      <span v-else> {{ hint }}</span>
    </small>
  </div>
</template>
