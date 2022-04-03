<script>
/**
 * @file
 *
 * Arquivo para teste de componentes.
 * Acessado em /testes
 */
export default {
  methods: {
    click () {
      this.$toast.success('ola mundo', {
        timeout: 1000000
      })
    }
  }
}
</script>

<template>
  <div class="p-5">
    <AppButton @click="click">
      Click me
    </AppButton>
  </div>
</template>
