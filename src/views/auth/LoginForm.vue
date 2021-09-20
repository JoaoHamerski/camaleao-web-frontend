<script>
import { isEmpty } from 'lodash-es'
import AuthService from '@/services/AuthService'
import Form from '@/utils/Form'

export default {
  data () {
    return {
      form: new Form({
        email: '',
        password: '',
        remember: false
      })
    }
  },
  methods: {
    async onSubmit () {
      this.form.isLoading = true

      try {
        await AuthService.login(this.form)
        const authUser = await this.$store.dispatch('auth/getAuthUser')

        if (authUser) {
          this.$store.dispatch('auth/setGuest', { value: 'isNotGuest' })
          this.$router.push({ name: 'clients.index' })
        }
      } catch (error) {
        if (!isEmpty(error.response.data.errors)) {
          this.form.errors.record(error.response.data.errors)
          this.form.password = ''
        }

        this.form.isLoading = false
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
      v-model="form.email"
      name="email"
      placeholder="Seu email..."
      :error="form.errors.get('email')"
    >
      E-mail
    </AppInput>

    <AppInput
      v-model="form.password"
      name="password"
      placeholder="Sua senha..."
      autocomplete="password"
      type="password"
      :error="form.errors.get('password')"
    >
      Senha
    </AppInput>

    <AppCheckbox
      id="remember"
      v-model="form.remember"
    >
      Lembre-se de mim
    </AppCheckbox>

    <div class="d-grid">
      <AppButton
        :loading="form.isLoading"
        color="primary"
        btn-class="fw-bold"
      >
        ENTRAR
      </AppButton>
    </div>
  </form>
</template>
