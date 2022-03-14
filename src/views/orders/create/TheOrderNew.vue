<script>
import {
  faBoxOpen,
  faArrowCircleLeft
} from '@fortawesome/free-solid-svg-icons'
import { orders, clients } from '@/constants/route-names'
import { client } from '@/graphql/Client.gql'

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
      client: {},
      clients,
      icons: {
        faBoxOpen,
        faArrowCircleLeft
      }
    }
  },
  methods: {
    onSuccess ({ clientId, orderId }) {
      this.$toast.success('Pedido criado!')
      this.$helpers.redirectTo(orders.show, {
        client: clientId,
        order: orderId
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
      @click="$helpers.redirectTo(clients.show, {client})"
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
