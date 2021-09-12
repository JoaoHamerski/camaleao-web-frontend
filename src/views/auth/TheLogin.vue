<script>
// import AuthService from '@/services/AuthService'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000'

export default {
  data () {
    return {
      faUserCircle,
      form: {
        email: '',
        password: '',
        remember: false
      }
    }
  },
  methods: {
    onSubmit () {
      axios.get('/sanctum/csrf-cookie')
        .then(response => {
          console.log(response)
        })
    }
  }
}
</script>

<template>
  <div class="col col-sm-8 col-md-6 col-lg-4 mx-auto mt-5">
    <AppCard id="cardLogin">
      <template #header>
        <h6 class="font-weight-bold text-white mb-0">
          Entre com sua conta
        </h6>
      </template>

      <template #body>
        <div class="text-center">
          <FontAwesomeIcon
            :icon="faUserCircle"
            size="5x"
            class="text-dark my-2"
          />
        </div>

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
    </AppCard>
  </div>
</template>
