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
  <div>
    <h5 class="text-secondary fw-bold">
      Informações básica
    </h5>
    <div class="row">
      <div class="col">
        <AppInput
          id="name"
          v-model="form.name"
          name="name"
          placeholder="Nome que descreva o pedido..."
          label="Nome"
          optional
        />
      </div>
      <div class="col">
        <AppInput
          id="code"
          v-model="form.code"
          name="code"
          placeholder="Código do pedido..."
          label="Código"
        />
      </div>
    </div>
  </div>
</template>
