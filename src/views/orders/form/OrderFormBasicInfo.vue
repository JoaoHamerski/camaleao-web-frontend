<script>
import { faFileContract } from '@fortawesome/free-solid-svg-icons'

export default {
  props: {
    form: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    icons: {
      faFileContract
    }
  })
}
</script>

<template>
  <AppContainer>
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faFileContract"
        fixed-width
      />
      Informações básicas
    </template>
    <template #body>
      <div class="row">
        <div class="col-12 col-sm">
          <AppInput
            id="name"
            :value="form.name"
            name="name"
            placeholder="Nome que descreva o pedido..."
            label="Nome"
            :error="form.errors.get('name')"
            optional
            @input="form.set({name: $event})"
          />
        </div>
        <div class="col-12 col-sm">
          <AppInput
            id="code"
            :value="form.code"
            name="code"
            placeholder="Código do pedido..."
            :error="form.errors.get('code')"
            label="Código"
            @input="form.set({code: $event})"
          />
        </div>
      </div>
    </template>
  </AppContainer>
</template>
