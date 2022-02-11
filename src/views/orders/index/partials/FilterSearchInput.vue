<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    onSearchClick () {
      this.$emit('search')
    },
    onClearSearchClick () {
      this.$emit('clear-search')
    }
  }
}
</script>

<template>
  <div class="col-6">
    <AppInput
      id="code"
      :value="value"
      name="code"
      placeholder="Por código..."
      :default-margin="false"
      @input="$emit('input', $event)"
    >
      <template #append>
        <AppButton
          outlined
          @click="onSearchClick"
        >
          Buscar
        </AppButton>
      </template>
    </AppInput>
    <a
      v-if="value !== ''"
      class="text-decoration-none small"
      href="#"
      @click.prevent="onClearSearchClick"
    >Limpar busca</a>
  </div>
</template>
