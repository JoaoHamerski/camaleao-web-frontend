<script>
import {
  faBoxOpen,
  faArrowCircleLeft
} from '@fortawesome/free-solid-svg-icons'

import { isEmpty } from 'lodash-es'

import OrderForm from '../form/OrderForm'

export default {
  metaInfo () {
    return {
      title: 'Alterar pedido ' + this.order.code
    }
  },
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
      },
      clothingTypesLoaded: false
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
    },
    loaded () {
      return this.clothingTypesLoaded && !isEmpty(this.order)
    }
  },
  methods: {
    isEmpty,
    redirectToOrder (event) {
      this.$router.push({
        name: 'orders.show',
        params: {
          clientKey: this.clientKey,
          orderKey: event.orderKey || this.orderKey
        }
      })
    },
    onSuccess (event) {
      this.$toast.success('Pedido atualizado com sucesso!')
      this.redirectToOrder(event)
    },
    onClothingTypesLoaded () {
      this.clothingTypesLoaded = true
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
          @success="onSuccess"
          @clothing-types-loaded="onClothingTypesLoaded"
        />
        <AppLoading v-if="!loaded" />
      </template>
    </AppCard>
  </div>
</template>
