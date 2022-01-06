<script>
import { maskDate, maskCurrencyBRL } from '@/utils/masks'
import Form from '@/utils/Form'

export default {
  data () {
    return {
      value: '',
      maskCurrencyBRL: maskCurrencyBRL(),
      maskDate,
      form: new Form({
        name: ''
      })
    }
  },
  methods: {
    onSubmit () {
      this.form.name = ''
    }
  }
}
</script>

<template>
  <div>
    <h1>Página de testes</h1>

    <AppForm
      :on-submit="onSubmit"
      :form="form"
    >
      <AppInput
        v-model="form.name"
        name="name"
        placeholder="dd/mm/aaaa"
        type="date"
        :mask="maskDate"
      />

      <AppButton @click="onSubmit">
        Clique
      </AppButton>
    </AppForm>
  </div>
</template>
