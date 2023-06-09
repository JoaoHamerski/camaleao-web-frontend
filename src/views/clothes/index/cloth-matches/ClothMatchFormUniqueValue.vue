<script>
import { form } from './ClothMatchForm.vue'

export default {
  data: () => ({
    form
  })
}
</script>

<template>
  <div>
    <AppInput
      id="unique_value"
      v-model="form.unique_value"
      name="unique_value"
      hint="Cada unidade terá este valor, independente da quantidade por pedido."
      :error="form.errors.get('unique_value')"
    >
      Valor da unidade
    </AppInput>
  </div>
</template>
