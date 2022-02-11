<script>
import {
  faBoxOpen,
  faArrowCircleLeft
} from '@fortawesome/free-solid-svg-icons'
import { order } from '@/graphql/Orders.gql'

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
  apollo: {
    order: {
      query: order,
      variables () {
        return {
          code: this.orderKey,
          clientId: this.clientKey
        }
      },
      result ({ data }) {
        this.$nextTick(() => {
          this.$refs.orderForm.$emit(
            'order-loaded',
            { order: data.order }
          )
        })
      }
    }
  },
  data () {
    return {
      order: {},
      clothingTypesLoaded: false,
      icons: {
        faBoxOpen,
        faArrowCircleLeft
      }
    }
  },
  computed: {
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
    redirectToOrder (clientKey, orderKey) {
      this.$router.push({
        name: 'orders.show',
        params: {
          clientKey, orderKey
        }
      })
    },
    onSuccess ({ clientId, orderCode }) {
      this.$toast.success('Pedido atualizado!')
      this.redirectToOrder(clientId, orderCode)
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
      @click="redirectToOrder(clientKey, orderKey)"
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
          {{ $helpers.fallback(order.client, 'name') }}
        </h6>
      </template>

      <template #body>
        <OrderForm
          ref="orderForm"
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
