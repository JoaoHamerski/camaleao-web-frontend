<script>
import ClientCard from '@/views/clients/partials/ClientCard'
import { faArrowAltCircleLeft, faBoxOpen } from '@fortawesome/free-solid-svg-icons'

export default {
  components: {
    ClientCard
  },
  data () {
    return {
      icons: {
        faArrowAltCircleLeft,
        faBoxOpen
      }
    }
  },
  computed: {
    clientId () {
      return this.$route.params.client
    }
  }
}
</script>

<template>
  <div class="row mt-5 mx-auto">
    <div class="col-3">
      <AppButton
        class="mb-1"
        outlined
        @click="$router.push({name: 'clients.show', params: { client: clientId }})"
      >
        <FontAwesomeIcon :icon="icons.faArrowAltCircleLeft" />
        Cliente
      </AppButton>
      <ClientCard :client-id="clientId" />
    </div>

    <div class="col-9">
      <div class="mb-1">
        <AppButton>Alguns botão aqui</AppButton>
      </div>
      <AppCard color="primary">
        <template #header>
          <h6 class="d-flex fw-bold align-items-center mb-0">
            <FontAwesomeIcon
              :icon="icons.faBoxOpen"
              class="me-1"
            />
            Pedido -
          </h6>
        </template>

        <template #body>
          <!--  -->
        </template>
      </AppCard>
    </div>
  </div>
</template>
