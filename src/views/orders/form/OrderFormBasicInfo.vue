<script>
export default {
  props: {
    form: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <AppContainer>
    <template #title>
      Informações básicas
    </template>
    <template #body>
      <div class="row">
        <div class="col-12 col-sm">
          <AppInput
            id="name"
            v-model="form.name"
            name="name"
            placeholder="Nome que descreva o pedido..."
            label="Nome"
            :error="form.errors.get('name')"
            optional
          />
        </div>
        <div class="col-12 col-sm">
          <AppInput
            id="code"
            v-model="form.code"
            name="code"
            placeholder="Código do pedido..."
            :error="form.errors.get('code')"
            label="Código"
          />
        </div>
      </div>
    </template>
  </AppContainer>
</template>
