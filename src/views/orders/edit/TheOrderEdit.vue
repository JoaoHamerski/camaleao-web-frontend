<script>
import { isEmpty } from 'lodash-es'
import {
  faBoxOpen,
  faArrowCircleLeft
} from '@fortawesome/free-solid-svg-icons'
import { order } from '@/graphql/Order.gql'
import orderStatesMixin from '../orderStatesMixin'

import OrderForm from '../form/OrderForm'
import OrderReminder from '../show/partials/OrderReminder'

export default {
  metaInfo () {
    return {
      title: this.title
    }
  },
  components: {
    OrderForm,
    OrderReminder
  },
  mixins: [orderStatesMixin],
  apollo: {
    order: {
      query: order,
      variables () {
        return {
          id: this.orderKey,
          client_id: this.clientKey
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
    title () {
      if (this.isOrderPreRegistered) {
        return 'Concluir pedido'
      }

      return this.order.code
    },
    clientKey () {
      return this.$route.params.clientKey
    },
    orderKey () {
      return this.$route.params.orderKey
    },
    loaded () {
      return this.clothingTypesLoaded && !isEmpty(this.order)
    },
    showReminder () {
      return this.isOrderPreRegistered && this.order.reminder
    }
  },
  methods: {
    isEmpty,
    onSuccess ({ clientId, orderId }) {
      this.$toast.success('Pedido atualizado!')
      this.redirectToOrder(clientId, orderId)
    },
    onClothingTypesLoaded () {
      this.clothingTypesLoaded = true
    },
    redirectBackToOrder () {
      if (!this.order.client) {
        this.redirectTo('orders.show.pre-registered', { order: this.order })
        return
      }

      this.redirectTo('orders.show', { client: this.order.client, order: this.order })
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
      @click="redirectBackToOrder"
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
          <template v-if="isOrderPreRegistered">
            Concluir registro {{ order.code ? `- ${order.code}` : '' }}
          </template>
          <template v-else>
            Alterar pedido -
            {{ $helpers.fallback(order, 'name', '[SEM NOME]') }}
            DE
            {{ $helpers.fallback(order.client, 'name') }}
          </template>
        </h6>
      </template>

      <template #body>
        <OrderReminder v-if="showReminder">
          {{ order.reminder }}
        </OrderReminder>

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
