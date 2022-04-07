<script>
import { isBoolean } from 'lodash-es'

import Multiselect from 'vue-multiselect'
import { TippyComponent } from 'vue-tippy'
import('@/sass/_multiselect.scss')

export default {
  components: {
    Multiselect,
    Tippy: TippyComponent
  },
  props: {
    value: undefined,
    defaultMargin: {
      type: Boolean,
      default: true
    },
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
    tooltip: {
      type: [Boolean, String],
      default: ''
    },
    optional: {
      type: Boolean,
      default: false
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
    },
    hasNoOptionsSlot () {
      return !!this.$slots.noOptions
    },
    hasNoResultSlot () {
      return !!this.$slots.noResult
    }
  },
  methods: {
    isBoolean
  }
}
</script>

<template>
  <div :class="{'mb-3': defaultMargin}">
    <label
      v-if="$slots.default"
      class="form-label"
      :for="name"
    >
      <span class="fw-bold"><slot /></span>
      <span
        v-if="optional"
        class="small text-secondary"
      >(opcional)</span>
    </label>

    <Tippy
      v-if="tooltip"
      :to="`tippy__${name}`"
    >
      {{ tooltip }}
    </Tippy>
    <span
      class="d-block"
      :name="`tippy__${name}`"
    >
      <Multiselect
        :id="name"
        :name="name"
        :value="value"
        :custom-label="customLabel"
        :placeholder="placeholder"
        :class="hasError && 'is-invalid'"
        select-label="Selecionar"
        selected-label="Selecionado"
        deselect-label="Remover"
        autocomplete="off"
        v-bind="$attrs"
        v-on="$listeners"
      >
        <template #noOptions>
          <template v-if="!hasNoOptionsSlot">
            A lista está vazia
          </template>
          <template v-else>
            <slot name="noOptions" />
          </template>
        </template>
        <template #noResult>
          <template v-if="!hasNoResultSlot">
            Nenhum resultado encontrado.
          </template>
          <template v-else>
            <slot name="noResult" />
          </template>
        </template>
      </Multiselect>
    </span>
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
