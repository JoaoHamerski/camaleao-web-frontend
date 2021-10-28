<script>

import ClientCard from '@/views/clients/partials/ClientCard'
import { faArrowAltCircleLeft, faBoxOpen } from '@fortawesome/free-solid-svg-icons'

import OrderHeader from './OrderHeader'
import OrderCardBody from './OrderCardBody'

export default {
  metaInfo () {
    return {
      title: `${this.client?.name || ''} - Pedidos`
    }
  },
  components: {
    ClientCard,
    OrderHeader,
    OrderCardBody
  },
  chimera: {
    _order () {
      return {
        url: `api/clients/${this.clientId}/orders/${this.orderId}`,
        params: {
          payments: true,
          clothing_types: true
        }
      }
    }
  },
  data () {
    return {
      client: null,
      icons: {
        faArrowAltCircleLeft,
        faBoxOpen
      }
    }
  },
  computed: {
    order () {
      return this.$chimera._order?.data?.data
    },
    clientId () {
      return this.$route.params.client
    },
    orderId () {
      return this.$route.params.order
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

      <ClientCard
        :client-id="clientId"
        @client="client = $event"
      />
    </div>

    <div class="col-9">
      <OrderHeader />
      <AppCard color="primary">
        <template #header>
          <h6 class="d-flex fw-bold align-items-center mb-0">
            <FontAwesomeIcon
              :icon="icons.faBoxOpen"
              class="me-1"
            />
            Pedido - {{ $helpers.fallback(order, 'name', '') }}
          </h6>
        </template>

        <template #body>
          <OrderCardBody
            v-if="order"
            :order="order"
          />

          <div
            v-else
            class="py-5"
          >
            <AppLoading />
          </div>
        </template>
      </AppCard>
    </div>
  </div>
</template>
