<script>
import {
  faBoxOpen,
  faArrowCircleLeft
} from '@fortawesome/free-solid-svg-icons'
import OrderForm from './OrderForm'

export default {
  components: {
    OrderForm
  },
  metaInfo () {
    return {
      title: 'Novo pedido - ' + this.client?.name || ''
    }
  },
  data () {
    return {
      icons: {
        faBoxOpen,
        faArrowCircleLeft
      }
    }
  },
  chimera: {
    _client () {
      return {
        url: `/api/clients/${this.$route.params.client}`
      }
    }
  },
  computed: {
    client () {
      return this.$chimera._client?.data?.data || {}
    }
  },
  methods: {
    submitted () {
      this.$toast.success('Pedido criado com sucesso!')
      this.redirectToClient()
    },
    redirectToClient () {
      return this.$router.push({
        name: 'clients.show',
        client: this.$route.params.client
      })
    }
  }
}
</script>

<template>
  <div class="mt-5 col-10 mx-auto">
    <AppButton
      class="mb-2"
      outlined
      :icon="icons.faArrowCircleLeft"
      @click="redirectToClient"
    >
      Cliente
    </AppButton>
    <AppCard v-if="client">
      <template #header>
        <h6 class="mb-0 fw-bold">
          <FontAwesomeIcon
            class="me-1"
            :icon="icons.faBoxOpen"
          />
          Novo pedido para {{ client.name }}
        </h6>
      </template>

      <template #body>
        <OrderForm @submitted="submitted" />
      </template>
    </AppCard>
  </div>
</template>
