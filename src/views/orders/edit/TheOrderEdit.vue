<script>
import {
  faBoxOpen,
  faArrowCircleLeft
} from '@fortawesome/free-solid-svg-icons'

import OrderForm from '../create/OrderForm'

export default {
  components: {
    OrderForm
  },
  chimera: {
    _client () {
      return {
        url: `/api/clients/${this.$route.params.clientKey}`
      }
    },
    _order () {
      return {
        url: `api/clients/${this.clientKey}/orders/${this.orderKey}`,
        params: {
          payments: true,
          clothing_types: true
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
  computed: {
    client () {
      return this.$chimera._client?.data?.data || {}
    },
    order () {
      return this.$chimera._order?.data?.data || {}
    },
    clientKey () {
      return this.$route.params.clientKey
    },
    orderKey () {
      return this.$route.params.orderKey
    }
  },
  methods: {
    redirectToOrder () {
      this.$router.push({
        name: 'orders.show',
        params: {
          clientKey: this.clientKey,
          orderKey: this.orderKey
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
      @click="redirectToOrder"
    >
      Pedido
    </AppButton>
    <AppCard color="primary">
      <template #header>
        <h6 class="d-flex fw-bold align-items-center mb-0">
          <FontAwesomeIcon
            :icon="icons.faBoxOpen"
            class="me-1"
          />
          Alterar pedido -
          {{ $helpers.fallback(order, 'name', '[SEM NOME]') }}
          DE
          {{ client.name }}
        </h6>
      </template>

      <template #body>
        <OrderForm
          :is-edit="true"
          :order="order"
        />
      </template>
    </AppCard>
  </div>
</template>
