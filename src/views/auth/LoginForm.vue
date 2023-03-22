<script>
import Form from '@/utils/Form'
import { handleError } from '@/utils/forms'

export default {
  data () {
    return {
      isLoading: false,
      form: new Form({
        email: '',
        password: ''
      })
    }
  },
  methods: {
    async onSubmit () {
      this.isLoading = true

      const credentials = this.form.data()

      try {
        await this.$store.dispatch('auth/login', {
          credentials
        })
      } catch (error) {
        console.log(error)
        handleError(this, error)
        this.isLoading = false
      }
    }
  }
}
</script>

<template>
  <form
    @submit.prevent="onSubmit"
    @keypress.enter.capture.prevent="onSubmit"
    @focus.capture="form.errors.clear($event.target.name)"
  >
    <AppInput
      id="email"
      v-model="form.email"
      name="email"
      placeholder="Seu email..."
      :error="form.errors.get('email')"
    >
      E-mail
    </AppInput>

    <AppInput
      id="password"
      v-model="form.password"
      name="password"
      placeholder="Sua senha..."
      autocomplete="password"
      type="password"
      :error="form.errors.get('password')"
    >
      Senha
    </AppInput>

    <div class="d-grid pt-3">
      <AppButton
        :loading="isLoading"
        color="primary"
        btn-class="fw-bold"
      >
        ENTRAR
      </AppButton>
    </div>
  </form>
</template>
