<script>
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import LoginForm from './LoginForm.vue'

export default {
  metaInfo: {
    title: 'Entre com sua conta'
  },
  components: {
    LoginForm
  },
  data () {
    return {
      faUserCircle
    }
  },
  mounted ()  {
    console.log('OLA')
    console.log(process.env.VUE_APP_API_HTTP)
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

        <LoginForm />
      </template>
    </AppCard>
  </div>
</template>
