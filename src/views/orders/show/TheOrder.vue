<script>
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'

import { isEmpty } from 'lodash-es'
import { GetOrder, GetOrderReport } from '@/graphql/Order.gql'
import orderStatesMixin from '../orderStatesMixin'
import { clients } from '@/constants/route-names'

import ClientCard from '@/views/clients/partials/ClientCard'
import TheOrderHeader from './TheOrderHeader'
import TheOrderCardBody from './TheOrderCardBody'
import TheOrderCardHeader from './TheOrderCardHeader'
import TheOrderCardPlaceholder from './TheOrderCardPlaceholder'
import ModalOrderPayment from '../partials/ModalOrderPayment'
import ModalOrderStatus from '../partials/ModalOrderStatus'
import ModalOrderDelete from '../partials/ModalOrderDelete'

export default {
  metaInfo () {
    if (isEmpty(this.order)) {
      return {
        title: 'Carregando...'
      }
    }

    if (this.isOrderPreRegistered) {
      return {
        title: 'PRE-REGISTRO'
      }
    }

    if (this.order) {
      return {
        title: this.order.code
      }
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
      order: {},
      clients,
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
        src: '',
        loading: false
      },
      icons: {
        faArrowAltCircleLeft
      }
    }
  },
  computed: {
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
    openModal (modal) {
      this[modal].value = true
    },
    closeModal (modal) {
      this[modal].value = false
    },
    async openModalReport () {
      this.modalOrderReport.loading = true

      const { data } = await this.$apollo.query({
        query: GetOrderReport,
        variables: {
          id: this.order.id
        },
        fetchPolicy: 'network-only'
      })

      this.modalOrderReport.loading = false
      this.modalOrderReport.src = data.orderReport
      this.openModal('modalOrderReport')
    },
    onCloseModalReport () {
      this.modalOrderReport.src = ''
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
          this.$helpers.redirectTo(clients.index)
          return
        }

        this.$helpers.redirectTo(
          clients.show,
          { client: this.order.client }
        )
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

      if (modal === 'report') {
        this.openModalReport()
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
        @click="$helpers.redirectTo(clients.show, {client: order.client})"
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

      <AppFileModal
        v-if="!isLoading"
        id="orderReport"
        v-model="modalOrderReport.value"
        :src="modalOrderReport.src"
        title="Relatório do pedido"
        @hidden="onCloseModalReport"
      />

      <TheOrderHeader
        :order="order"
        :is-loading="isLoading"
        :is-report-loading="modalOrderReport.loading"
        :is-order-closed="isOrderClosed"
        :is-order-paid="isOrderPaid"
        :is-order-pre-registered="isOrderPreRegistered"
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
