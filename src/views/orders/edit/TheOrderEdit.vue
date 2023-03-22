<script>
import { isEmpty } from 'lodash-es'
import { orders } from '@/constants/route-names'
import {
  faBoxOpen,
  faArrowCircleLeft
} from '@fortawesome/free-solid-svg-icons'

import { GetOrder } from '@/graphql/Order.gql'
import orderStatesMixin from '../orderStatesMixin'

import OrderForm from '../form/OrderForm.vue'
import OrderReminder from '../show/partials/OrderReminder.vue'

export default {
  metaInfo () {
    if (isEmpty(this.order)) {
      return {
        title: 'Carregando...'
      }
    }

    if (this.isOrderPreRegistered) {
      return {
        title: 'Concluir registro'
      }
    }

    return {
      title: `${this.order.code} - Editar`
    }
  },
  components: {
    OrderForm,
    OrderReminder
  },
  mixins: [orderStatesMixin],
  apollo: {
    order: {
      query: GetOrder,
      variables () {
        const { clientKey, orderKey } = this.$route.params

        return {
          id: orderKey,
          client_id: clientKey
        }
      }
    }
  },
  data () {
    return {
      orders,
      order: {},
      icons: {
        faBoxOpen,
        faArrowCircleLeft
      }
    }
  },
  computed: {
    showReminder () {
      return this.isOrderPreRegistered && this.order.reminder
    }
  },
  methods: {
    isEmpty,
    onSuccess ({ clientId, orderId }) {
      this.$toast.success('Pedido atualizado!')

      this.$helpers.redirectTo(orders.show, {
        client: clientId,
        order: orderId
      })
    },
    redirectBackToOrder () {
      if (!this.order.client) {
        this.$helpers.redirectTo(
          orders.showPreRegistered,
          { order: this.order }
        )

        return
      }

      this.$helpers.redirectTo(
        orders.show,
        { client: this.order.client, order: this.order }
      )
    }
  }
}
</script>

<template>
  <div class="py-5 col col-sm-10 mx-auto">
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
          v-if="!isEmpty(order)"
          v-bind="{isEdit: true, order, isOrderPreRegistered}"
          @success="onSuccess"
        />
        <div
          v-else
          class="text-center my-5"
        >
          <div
            class="spinner-grow text-primary"
            role="status"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </template>
    </AppCard>
  </div>
</template>
