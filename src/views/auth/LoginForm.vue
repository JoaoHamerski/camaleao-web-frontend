<script>
import AuthService from '@/services/AuthService'
// import { getError } from '@/utils/helpers'
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
      await AuthService.login(this.form)
      const authUser = await this.$store.dispatch('auth/getAuthUser')

      if (authUser) {
        this.$store.dispatch('auth/setGuest', { value: 'isNotGuest' })
        this.$router.push({ name: 'clients.index' })
      }
    }
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <AppInput
      id="email"
      v-model="form.email"
      placeholder="Seu email..."
    >
      E-mail
    </AppInput>

    <AppInput
      id="password"
      v-model="form.password"
      placeholder="Sua senha..."
      type="password"
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
      <AppBtn
        color="primary"
        btn-class="fw-bold"
      >
        ENTRAR
      </AppBtn>
    </div>
  </form>
</template>
