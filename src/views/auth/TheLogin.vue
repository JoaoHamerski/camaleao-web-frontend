<script>
import { faUserCircle, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
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
      icons: {
        faUserCircle,
        faSignInAlt
      }
    }
  }
}
</script>

<template>
  <div
    :class="{
      'd-flex justify-content-center align-items-center w-100': !$isMobile,
      'mx-auto py-5': $isMobile
    }"
    class="h-100 col col-11 col-sm-8 col-md-6 col-lg-3"
  >
    <AppCard id="cardLogin">
      <template #header>
        <h6 class="fw-bold text-white mb-0">
          <FontAwesomeIcon
            :icon="icons.faSignInAlt"
            fixed-width
          />
          Entre com sua conta
        </h6>
      </template>

      <template #body>
        <div class="text-center">
          <FontAwesomeIcon
            :icon="icons.faUserCircle"
            size="5x"
            class="text-dark my-2"
          />
        </div>

        <LoginForm />
      </template>
    </AppCard>
  </div>
</template>
