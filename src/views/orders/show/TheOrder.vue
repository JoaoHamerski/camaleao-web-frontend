<script>
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { order } from '@/graphql/Order.gql'
import { redirectToClient, redirectToClients } from '@/utils/redirects'
import orderStatesMixin from '../orderStatesMixin'

import ClientCard from '@/views/clients/partials/ClientCard'
import TheOrderHeader from './TheOrderHeader'
import TheOrderCardBody from './TheOrderCardBody'
import TheOrderCardHeader from './TheOrderCardHeader'
import TheOrderCardPlaceholder from './TheOrderCardPlaceholder'
import ModalOrderPayment from '../partials/ModalOrderPayment'
import ModalOrderStatus from '../partials/ModalOrderStatus'
import ModalOrderDelete from '../partials/ModalOrderDelete'

export const orderQueryVariables = (context) => {
  if (context.clientKey === undefined) {
    return {
      id: context.orderKey
    }
  }

  return {
    id: context.orderKey,
    client_id: context.clientKey
  }
}

export default {
  metaInfo () {
    return {
      title: `${this.order?.client?.name || 'PRE-REGISTRO'} - Pedidos`
    }
  },
  components: {
    ClientCard,
    TheOrderHeader,
    TheOrderCardBody,
    TheOrderCardHeader,
    TheOrderCardPlaceholder,
    ModalOrderPayment,
    ModalOrderStatus,
    ModalOrderDelete
  },
  mixins: [orderStatesMixin],
  apollo: {
    order: {
      query: order,
      variables () {
        return orderQueryVariables(this)
      }
    }
  },
  data () {
    return {
      order: {},
      modalOrderPayment: {
        payment: null,
        value: false,
        isEdit: false
      },
      modalOrderStatus: {
        value: false
      },
      modalOrderDelete: {
        value: false
      },
      icons: {
        faArrowAltCircleLeft
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
    isLoading () {
      return !!this.$apollo.queries.order.loading
    },
    cardColor () {
      if (this.order.states.includes('CLOSED')) {
        return 'secondary'
      }

      if (this.order.states.includes('PRE-REGISTERED')) {
        return 'warning'
      }

      return 'primary'
    }
  },
  methods: {
    redirectToClient,
    openModal (modal) {
      this[modal].value = true
    },
    closeModal (modal) {
      this[modal].value = false
    },
    openModalOrderPayment ({ payment, isEdit }) {
      this.modalOrderPayment.isEdit = isEdit
      this.modalOrderPayment.payment = payment || null
      this.modalOrderPayment.value = true
    },
    onPaymentCreated () {
      this.closeModal('modalOrderPayment')
    },
    onStatusUpdated () {
      this.closeModal('modalOrderStatus')
    },
    onOrderDeleted () {
      this.closeModal('modalOrderDelete')

      this.$nextTick(() => {
        if (!this.order.client) {
          redirectToClients()
          return
        }

        redirectToClient(this.order.client)
      })
    },
    onOpenModalRequest ({ modal, payload }) {
      if (modal === 'payment') {
        this.openModalOrderPayment(payload)
      }

      if (modal === 'delete-order') {
        this.openModal('modalOrderDelete')
      }

      if (modal === 'change-status') {
        this.openModal('modalOrderStatus')
      }
    }
  }
}
</script>

<template>
  <div
    class="row mt-5 mx-auto"
  >
    <div class="col-3">
      <AppButton
        class="mb-1"
        outlined
        :disabled-message="!order.client && 'O pedido não possui cliente'"
        @click="redirectToClient(order.client)"
      >
        <FontAwesomeIcon :icon="icons.faArrowAltCircleLeft" />
        Cliente
      </AppButton>

      <ClientCard
        :is-loading="isLoading"
        :client="order.client"
      />
    </div>

    <div class="col-9">
      <ModalOrderPayment
        v-if="!isLoading"
        v-model="modalOrderPayment.value"
        v-bind="{...modalOrderPayment, order}"
        @success="onPaymentCreated"
      />

      <ModalOrderStatus
        v-if="!isLoading"
        v-model="modalOrderStatus.value"
        :order="order"
        @success="onStatusUpdated"
      />

      <ModalOrderDelete
        v-if="!isLoading"
        v-model="modalOrderDelete.value"
        :order="order"
        @success="onOrderDeleted"
      />

      <TheOrderHeader
        :order="order"
        :is-loading="isLoading"
        @open-modal="onOpenModalRequest"
      />

      <AppCard
        v-if="!isLoading"
        :color="cardColor"
      >
        <template #header>
          <TheOrderCardHeader
            :order="order"
            :is-order-closed="isOrderClosed"
          />
        </template>

        <template #body>
          <TheOrderCardBody
            :order="order"
            :is-order-pre-registered="isOrderPreRegistered"
            @open-modal="onOpenModalRequest"
          />
        </template>
      </AppCard>

      <TheOrderCardPlaceholder v-else />
    </div>
  </div>
</template>
