<script>

import ClientCard from '@/views/clients/partials/ClientCard'
import { faArrowAltCircleLeft, faBoxOpen } from '@fortawesome/free-solid-svg-icons'
import { formatDatetime } from '@/utils/formatters'

import OrderHeader from './OrderHeader'
import OrderCardBody from './OrderCardBody'
import ModalOrderPayment from '../partials/ModalOrderPayment'
import ModalOrderStatus from '../partials/ModalOrderStatus'
import ModalOrderDelete from '../partials/ModalOrderDelete'
import ModalOrderReport from '../partials/ModalOrderReport'

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
    ModalOrderPayment,
    ModalOrderStatus,
    ModalOrderDelete,
    ModalOrderReport
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
      modalOrderReport: {
        value: false
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
    formatDatetime,
    openModalPaymentOrder ({ payment, isEdit }) {
      this.modalOrderPayment.isEdit = isEdit
      this.modalOrderPayment.payment = payment || null
      this.modalOrderPayment.value = true
    },
    openModalOrderStatus () {
      this.modalOrderStatus.value = true
    },
    openModalOrderDelete () {
      this.modalOrderDelete.value = true
    },
    openModalOrderReport () {
      this.modalOrderReport.value = true
    },
    closeModalOrderPayment () {
      this.modalOrderPayment.value = false
    },
    closeModalOrderStatus () {
      this.modalOrderStatus.value = false
    },
    closeModalOrderDelete () {
      this.modalOrderDelete.value = false
    },
    onPayment () {
      this.closeModalOrderPayment()
      this.refresh()
    },
    onStatusUpdated () {
      this.closeModalOrderStatus()
      this.refresh()
    },
    onOrderDeleted () {
      this.closeModalOrderDelete()
      this.$nextTick(() => {
        this.redirectToClient()
      })
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
      <ModalOrderPayment
        v-if="order"
        v-model="modalOrderPayment.value"
        :total-owing="order.total_owing"
        :is-edit="modalOrderPayment.isEdit"
        :payment="modalOrderPayment.payment"
        @success="onPayment"
      />

      <ModalOrderStatus
        v-if="order"
        v-model="modalOrderStatus.value"
        :order-status="order.status"
        @success="onStatusUpdated"
      />

      <ModalOrderDelete
        v-if="order"
        v-model="modalOrderDelete.value"
        :order="order"
        @success="onOrderDeleted"
      />

      <ModalOrderReport
        v-if="order"
        v-model="modalOrderReport.value"
        :order="order"
      />

      <OrderHeader
        :order="order"
        @open-payment-modal="openModalPaymentOrder"
        @open-status-modal="openModalOrderStatus"
        @open-delete-order-modal="openModalOrderDelete"
        @open-report-modal="openModalOrderReport"
        @refresh="refresh"
      />

      <AppCard
        v-if="order"
        :color="order.states.includes('CLOSED') ? 'secondary' : 'primary'"
      >
        <template #header>
          <h6
            v-if="order"
            class="d-flex justify-content-between fw-bold align-items-center mb-0"
          >
            <div>
              <FontAwesomeIcon
                :icon="icons.faBoxOpen"
                class="me-1"
              />
              Pedido - {{ $helpers.fallback(order.name, null, '[SEM NOME]') }}
            </div>
            <div
              v-if="order.states.includes('CLOSED')"
            >
              PEDIDO FECHADO
              <div class="small">
                Em {{ formatDatetime(order.closed_at) }}
              </div>
            </div>
          </h6>
        </template>

        <template #body>
          <OrderCardBody
            v-if="order"
            :order="order"
            @open-modal="openModalPaymentOrder"
          />

          <div
            v-else
            class="py-5"
          >
            <AppLoading />
          </div>
        </template>
      </AppCard>
      <AppCard v-else>
        <template #header>
          <h6 class="fw-bold">
            <FontAwesomeIcon
              :icon="icons.faBoxOpen"
              class="me-1"
            />Pedido -
          </h6>
        </template>
        <template #body>
          <div class="py-5">
            <AppLoading />
          </div>
        </template>
      </AppCard>
    </div>
  </div>
</template>
