<script>

import ClientCard from '@/views/clients/partials/ClientCard'
import { faArrowAltCircleLeft, faBoxOpen } from '@fortawesome/free-solid-svg-icons'

import OrderHeader from './OrderHeader'
import OrderCardBody from './OrderCardBody'
import PaymentModal from '../partials/PaymentModal'

export default {
  metaInfo () {
    return {
      title: `${this.client?.name || ''} - Pedidos`
    }
  },
  components: {
    ClientCard,
    OrderHeader,
    OrderCardBody,
    PaymentModal
  },
  chimera: {
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
      client: null,
      modal: {
        payment: null,
        value: false,
        isEdit: false
      },
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
    clientKey () {
      return this.$route.params.clientKey
    },
    orderKey () {
      return this.$route.params.orderKey
    }
  },
  methods: {
    openModal ({ payment, isEdit }) {
      this.modal.isEdit = isEdit
      this.modal.payment = payment || null
      this.modal.value = true
    },
    closeModal () {
      this.modal.value = false
    },
    refresh () {
      this.$chimera._order.fetch()
    },
    redirectToClient () {
      this.$router.push({
        name: 'clients.show',
        params: { clientKey: this.clientKey }
      })
    }
  }
}
</script>

<template>
  <div
    v-if="order"
    class="row mt-5 mx-auto"
  >
    <div class="col-3">
      <AppButton
        class="mb-1"
        outlined
        @click="redirectToClient"
      >
        <FontAwesomeIcon :icon="icons.faArrowAltCircleLeft" />
        Cliente
      </AppButton>

      <ClientCard
        :client-id="clientKey"
        @client="client = $event"
      />
    </div>

    <div class="col-9">
      <PaymentModal
        v-model="modal.value"
        modal-id="paymentModal"
        :total-owing="order.total_owing"
        :is-edit="modal.isEdit"
        :payment="modal.payment"
        @close-modal="closeModal"
        @refresh="refresh"
      />

      <OrderHeader
        :order="order"
        @open-modal="openModal"
      />

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
            @open-modal="openModal"
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
