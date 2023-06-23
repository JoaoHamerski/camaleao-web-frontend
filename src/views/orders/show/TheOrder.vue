<script>

import { isEmpty } from 'lodash-es'
import { GetOrder, GetOrderReport } from '@/graphql/Order.gql'
import orderStatesMixin from '../orderStatesMixin'
import { clients } from '@/constants/route-names'

import ClientCard from '@/views/clients/partials/ClientCard.vue'
import TheOrderHeader from './TheOrderHeader.vue'
import TheOrderCard from './TheOrderCard.vue'
import ModalPaymentForm from '@/views/resources/payments/ModalPaymentForm.vue'
import ModalOrderStatus from '../partials/ModalOrderStatus.vue'
import ModalOrderDelete from '../partials/ModalOrderDelete.vue'

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
    TheOrderCard,
    TheOrderHeader,
    ModalPaymentForm,
    ModalOrderStatus,
    ModalOrderDelete
  },
  mixins: [orderStatesMixin],
  apollo: {
    order: {
      query: GetOrder,
      fetchPolicy: 'no-cache',
      variables () {
        const { clientKey, orderKey } = this.$route.params

        return {
          id: orderKey,
          client_id: clientKey
        }
      },
      result ({data: {order}}) {
        if (!order) {
          this.$store.commit('SET_ERROR', 404)
        }
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
      modalOrderReport: {
        value: false,
        src: '',
        loading: false
      }
    }
  },
  computed: {
    isLoading () {
      return isEmpty(this.order)
    }
  },
  methods: {
    openModal (modal) {
      this[modal].value = true
    },
    closeModal (modal) {
      this[modal].value = false
    },
    onModalPaymentHidden () {
      this.modalOrderPayment.payment = null
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
    onOpenModal ({ modal, payload }) {
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
    class="py-5 mx-auto"
  >
    <ModalPaymentForm
      v-if="!isLoading"
      v-model="modalOrderPayment.value"
      v-bind="{...modalOrderPayment, order}"
      @success="onPaymentCreated"
      @hidden="onModalPaymentHidden"
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

    <div>
      <TheOrderHeader
        class="mb-2"
        v-bind="{
          order,
          isLoading,
          isOrderClosed,
          isOrderPaid,
          isOrderPreRegistered,
          isReportLoading: modalOrderReport.loading
        }"
        @open-modal="onOpenModal"
      />
    </div>

    <div class="d-flex row flex-column flex-sm-row">
      <div class="col col-sm-3 mb-2 mb-sm-0">
        <ClientCard
          :is-loading="isLoading"
          :client="order.client"
        />
      </div>

      <div class="col col-sm-9">
        <TheOrderCard
          v-bind="{
            isLoading,
            isOrderClosed,
            isOrderPreRegistered,
            order
          }"
          @on-open-modal="onOpenModal"
        />
      </div>
    </div>
  </div>
</template>
