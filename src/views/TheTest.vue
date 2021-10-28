<script>
import { maskValueBRL } from '@/utils/masks'

export default {
  data () {
    return {
      value: '',
      maskValueBRL: maskValueBRL()
    }
  }
}
</script>

<template>
  <div>
    <h1>Página de testes</h1>

    <AppInput
      v-model="value"
      :mask="maskValueBRL"
      name="algo"
    />
    {{ value }}
  </div>
</template>
