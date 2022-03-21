<script>
import {
  faCog,
  faFileInvoice,
  faDollarSign,
  faEdit,
  faTrashAlt,
  faTimesCircle,
  faExchangeAlt,
  faBoxOpen
} from '@fortawesome/free-solid-svg-icons'

import { isEmpty } from 'lodash-es'
import { ToggleOrder } from '@/graphql/Order.gql'
import { orders } from '@/constants/route-names'

export default {
  props: {
    order: {
      type: Object,
      default: () => {}
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    isReportLoading: {
      type: Boolean,
      default: false
    },
    isOrderClosed: {
      type: Boolean,
      required: true
    },
    isOrderPaid: {
      type: Boolean,
      required: true
    },
    isOrderPreRegistered: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      icons: {
        faCog,
        faFileInvoice,
        faDollarSign,
        faEdit,
        faTrashAlt,
        faTimesCircle,
        faExchangeAlt,
        faBoxOpen
      }
    }
  },
  computed: {
    isReportDisabled () {
      return !this.order || !this.order.code
    },
    paymentBtnDisabledMessage () {
      if (isEmpty(this.order)) {
        return true
      }

      if (this.isOrderPaid) {
        return 'Pedido já pago'
      }

      if (this.isOrderClosed) {
        return 'Não é possível registrar pagamento em pedidos fechados.'
      }

      if (this.order.price === null) {
        return 'Pedido em pré-registro sem preço, impossível efetuar pagamentos.'
      }

      return false
    }
  },
  methods: {
    isEmpty,
    redirectToOrderEdit () {
      const { clientKey, orderKey } = this.$route.params

      if (!this.order.client) {
        this.$helpers.redirectTo(
          orders.editPreRegistered,
          { order: this.order }
        )

        return
      }

      this.$helpers.redirectTo(orders.edit, {
        client: clientKey,
        order: orderKey
      })
    },
    async toggleOrder () {
      const isOrderOpen = this.order.closed_at === null

      try {
        await this.$apollo.mutate({
          mutation: ToggleOrder,
          variables: {
            id: this.order.id
          }
        })

        this.$toast.success(
          isOrderOpen
            ? 'Pedido fechado'
            : 'Pedido reaberto'
        )
      } catch (error) {
        this.$toast.error('Ops! Algo deu errado.')
      }
    },
    onAddPaymentClick () {
      this.$emit('open-modal', {
        modal: 'payment',
        payload: {
          isEdit: false
        }
      })
    },
    onDeleteOrderClick () {
      this.$emit('open-modal', {
        modal: 'delete-order'
      })
    },
    onChangeStatusClick () {
      this.$emit('open-modal', {
        modal: 'change-status'
      })
    },
    onGenerateReportClick () {
      this.$emit('open-modal', {
        modal: 'report'
      })
    }
  }
}
</script>

<template>
  <div class="mb-1 d-flex justify-content-between">
    <div>
      <AppButton
        color="success"
        outlined
        :icon="icons.faDollarSign"
        :disabled-message="paymentBtnDisabledMessage"
        @click="onAddPaymentClick"
      >
        Adicionar pagamento
      </AppButton>
    </div>
    <div>
      <AppButton
        class="me-1"
        :icon="icons.faFileInvoice"
        :disabled="isReportDisabled"
        :loading="isReportLoading"
        @click.prevent="onGenerateReportClick"
      >
        Gerar relatório
      </AppButton>

      <AppButton
        id="dropdownOptions"
        data-bs-toggle="dropdown"
        :icon="icons.faCog"
        :disabled="!order"
      />

      <ul
        v-if="!isLoading"
        class="dropdown-menu"
        aria-labelledby="dropdownOptions"
      >
        <AppDropdownItem
          :disabled-message="isOrderClosed && 'Não é possível editar pedidos fechados.'"
          :icon="icons.faEdit"
          :text="isOrderPreRegistered ? 'Concluir cadastro' : 'Editar'"
          icon-color="primary"
          @click.prevent="redirectToOrderEdit"
        />

        <AppDropdownItem
          :icon="icons.faTrashAlt"
          text="Excluir"
          icon-color="danger"
          @click="onDeleteOrderClick"
        />

        <div class="dropdown-divider" />

        <AppDropdownItem
          :disabled-message="isOrderClosed && 'Não é possível alterar status de pedidos fechados.'"
          :icon="icons.faExchangeAlt"
          text="Alterar status"
          icon-color="primary"
          @click="onChangeStatusClick"
        />

        <AppDropdownItem
          :disabled-message="!isOrderPaid && 'Não é possível fechar pedidos com pendência financeira.'"
          :icon="!isOrderClosed ? icons.faTimesCircle : icons.faBoxOpen"
          :text="!isOrderClosed ? 'Fechar pedido' : 'Reabrir pedido'"
          icon-color="primary"
          @click.prevent="toggleOrder"
        />
      </ul>
    </div>
  </div>
</template>
