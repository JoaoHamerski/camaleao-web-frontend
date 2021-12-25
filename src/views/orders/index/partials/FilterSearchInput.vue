<script>
export default {
  data () {
    return {
      code: ''
    }
  },
  methods: {
    onSearchClick () {
      this.$emit('code', this.code)
    },
    onClearSearchClick () {
      this.code = ''
      this.$emit('code', '')
    }
  }
}
</script>

<template>
  <div class="col-6">
    <AppInput
      id="code"
      v-model="code"
      name="code"
      placeholder="Por código..."
      :default-margin="false"
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
      v-if="code !== ''"
      class="text-decoration-none small"
      href="#"
      @click.prevent="onClearSearchClick"
    >Limpar busca</a>
  </div>
</template>
