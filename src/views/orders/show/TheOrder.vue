<script>
import { order } from '@/graphql/Orders.gql'
import ClientCard from '@/views/clients/partials/ClientCard'
import { faArrowAltCircleLeft, faBoxOpen } from '@fortawesome/free-solid-svg-icons'
import { formatDatetime } from '@/utils/formatters'
import { isEmpty } from 'lodash-es'

import OrderHeader from './OrderHeader'
import OrderCardBody from './OrderCardBody'
import ModalOrderPayment from '../partials/ModalOrderPayment'
import ModalOrderStatus from '../partials/ModalOrderStatus'
import ModalOrderDelete from '../partials/ModalOrderDelete'
import ModalReport from '../partials/ModalReport'

const getOrderPathUrl = (clientKey, orderKey) => {
  return `/api/clients/${clientKey}/orders/${orderKey}/generate-report`
}

export default {
  metaInfo () {
    return {
      title: `${this.order?.client?.name || ''} - Pedidos`
    }
  },
  components: {
    ClientCard,
    OrderHeader,
    OrderCardBody,
    ModalOrderPayment,
    ModalOrderStatus,
    ModalOrderDelete,
    ModalReport
  },
  apollo: {
    order: {
      query: order,
      variables () {
        return {
          code: this.orderKey,
          clientId: this.clientKey
        }
      }
      // fetchPolicy: 'network-only'
    }
  },
  data () {
    return {
      order: null,
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
        value: false,
        src: ''
      },
      icons: {
        faArrowAltCircleLeft,
        faBoxOpen
      }
    }
  },
  computed: {
    client () {
      return this.order?.client || {}
    },
    clientKey () {
      return this.$route.params.clientKey
    },
    orderKey () {
      return this.$route.params.orderKey
    },
    apiUrl () {
      return this.$store.getters.apiURL
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
    formatDatetime,
    isEmpty,
    generateURL () {
      const url = new URL(this.apiUrl + getOrderPathUrl(this.clientKey, this.orderKey))

      return url.toString()
    },
    onGenerateReportClick () {
      const url = this.generateURL()

      this.modalOrderReport.src = url
      this.modalOrderReport.value = true
    },
    openModalPaymentOrder ({ payment, isEdit }) {
      this.modalOrderPayment.isEdit = isEdit
      this.modalOrderPayment.payment = payment || null
      this.modalOrderPayment.value = true
    },
    openModal (modal) {
      this[modal].value = true
    },
    closeModal (modal) {
      this[modal].value = false
    },
    onModalOrderReportHidden () {
      this.modalOrderReport.src = ''
    },
    onPayment () {
      this.closeModal('modalOrderPayment')
      this.refresh()
    },
    onStatusUpdated () {
      this.closeModal('modalOrderStatus')
      this.refresh()
    },
    onOrderDeleted () {
      this.closeModal('modalOrderDelete')

      this.$nextTick(() => {
        this.redirectToClient()
      })
    },
    refresh () {
      this.$apollo.queries.order.refetch()
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
        :client="client"
      />
    </div>

    <div class="col-9">
      <ModalOrderPayment
        v-if="order"
        v-model="modalOrderPayment.value"
        :is-edit="modalOrderPayment.isEdit"
        :order="order"
        :payment="modalOrderPayment.payment"
        @success="onPayment"
      />

      <ModalOrderStatus
        v-if="order"
        v-model="modalOrderStatus.value"
        :order="order"
        @success="onStatusUpdated"
      />

      <ModalOrderDelete
        v-if="order"
        v-model="modalOrderDelete.value"
        :order="order"
        @success="onOrderDeleted"
      />

      <ModalReport
        v-if="order"
        id="orderShow"
        v-model="modalOrderReport.value"
        :src="modalOrderReport.src"
        :order="order"
        @hidden="onModalOrderReportHidden"
      />

      <OrderHeader
        :order="order"
        @open-payment-modal="openModalPaymentOrder"
        @open-status-modal="openModal('modalOrderStatus')"
        @open-delete-order-modal="openModal('modalOrderDelete')"
        @open-report-modal="onGenerateReportClick"
        @refresh="refresh"
      />

      <AppCard
        v-if="order"
        :color="cardColor"
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
            @open-payment-modal="openModalPaymentOrder"
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
