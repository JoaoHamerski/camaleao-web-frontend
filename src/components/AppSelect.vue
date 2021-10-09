<script>
import Multiselect from 'vue-multiselect'

export default {
  components: {
    Multiselect
  },
  props: {
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
    }
  }
}
</script>

<template>
  <div>
    <label
      class="form-label"
    >
      <span class="fw-bold"><slot /></span>
      <span
        v-if="optional"
        class="small text-secondary"
      >(opcional)</span>
    </label>

    <Multiselect
      :placeholder="placeholder"
      :options="options"
      v-on="$listeners"
    >
      <template #noOptions>
        Lista está vazia.
      </template>

      <template #noResult>
        Nenhum resultado encontrado.
      </template>
    </Multiselect>
  </div>
</template>
