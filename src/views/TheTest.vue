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
      value: false,
      collapsible: true
    }
  }
}
</script>

<template>
  <div class="p-5">
    <AppContainer
      v-model="value"
      :collapsible="collapsible"
      disabled-tooltip="Está desativado"
    >
      <template #title>
        Título do container
      </template>
      <template #body>
        Illum amet laborum, minima dolor tenetur incidunt ea! Debitis dolore corporis repudiandae eveniet velit, ut recusandae, quibusdam assumenda consequuntur doloribus ratione voluptatibus magni aspernatur facere iste aperiam illum reiciendis! Quasi!
      </template>
    </AppContainer>
  </div>
</template>
