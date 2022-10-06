<script>
/**
 * @file
 *
 * Arquivo para teste de componentes.
 * Acessado em /testes
 */

export default {
  data () {
    return {
      text: '<h1>Algo a mais</h1>'
    }
  },
  mounted () {
    this.$store.commit('SET_BOOTED', true)
  }
}
</script>

<template>
  <div class="p-3">
    <AppEditor
      v-model="text"
      error="Algo está errado"
    />
  </div>
</template>
