<script>
import { client } from '@/graphql/Clients.gql'

import {
  faBoxOpen,
  faArrowCircleLeft
} from '@fortawesome/free-solid-svg-icons'
import OrderForm from '../form/OrderForm'

export default {
  components: {
    OrderForm
  },
  metaInfo () {
    return {
      title: 'Novo pedido - ' + this.client?.name || ''
    }
  },
  apollo: {
    client: {
      query: client,
      variables () {
        return {
          id: this.$route.params.clientKey
        }
      }
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
  methods: {
    onSuccess ({ clientId, orderCode }) {
      this.$toast.success('Pedido criado!')
      this.redirectToOrder(clientId, orderCode)
    },
    redirectToOrder (clientKey, orderKey) {
      return this.$router.push({
        name: 'orders.show',
        params: {
          clientKey, orderKey
        }
      })
    },
    redirectToClient () {
      return this.$router.push({
        name: 'clients.show',
        params: {
          clientKey: this.$route.params.clientKey
        }
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
        <OrderForm @success="onSuccess" />
      </template>
    </AppCard>
  </div>
</template>
