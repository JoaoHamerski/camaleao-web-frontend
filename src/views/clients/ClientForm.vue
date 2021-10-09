<script>
import Form from '@/utils/Form'
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
  data () {
    return {
      form: new Form({
        name: '',
        phone: '',
        city: '',
        branch: '',
        shipping_company: ''
      })
    }
  }
}
</script>

<template>
  <form>
    <AppInput
      id="name"
      v-model="form.name"
      name="name"
      optional
      placeholder="Digite o nome..."
    >
      Nome
    </AppInput>

    <AppInput
      id="phone"
      v-model="form.phone"
      name="phone"
      placeholder="Digite o telefone..."
    >
      Telefone
    </AppInput>

    <AppSelect>
      Cidade
    </AppSelect>
  </form>
</template>
