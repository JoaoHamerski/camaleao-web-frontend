<script>
import { maskCurrencyBRL } from '@/utils/masks'

export default {
  data () {
    return {
      value: '',
      maskCurrencyBRL: maskCurrencyBRL()
    }
  }
}
</script>

<template>
  <div>
    <h1>Página de testes</h1>

    <AppInput
      v-model="value"
      :mask="maskCurrencyBRL"
      name="algo"
    />
    {{ value }}
  </div>
</template>
