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
import { orderToggle, order } from '@/graphql/Order.gql'

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
    clientKey () {
      return this.$route.params.clientKey
    },
    orderKey () {
      return this.$route.params.orderKey
    },
    paymentBtnDisabledMessage () {
      if (isEmpty(this.order)) {
        return true
      }

      if (this.order.states.includes('PAID')) {
        return 'Pedido já pago'
      }

      if (this.order.states.includes('CLOSED')) {
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
      if (!this.order.client) {
        this.$router.push({
          name: 'orders.edit.pre-registered',
          params: {
            orderKey: this.$route.params.orderKey
          }
        })

        return
      }

      this.$router.push({
        name: 'orders.edit',
        params: {
          clientKey: this.$route.params.clientKey,
          orderKey: this.$route.params.orderKey
        }
      })
    },
    async toggleOrder () {
      const isOrderOpen = this.order.closed_at === null

      const getQueryVariables = () => {
        if (this.order.client) {
          return {
            id: this.order.id,
            client_id: this.order.client.id
          }
        }

        return {
          id: this.order.id
        }
      }

      try {
        await this.$apollo.mutate({
          mutation: orderToggle,
          variables: {
            id: this.order.id
          },
          refetchQueries: [{
            query: order,
            variables: getQueryVariables()
          }]
        })

        this.$toast.success(isOrderOpen ? 'Pedido fechado' : 'Pedido reaberto')
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
          :disabled-message="order.states.includes('CLOSED') && 'Não é possível editar pedidos fechados.'"
          :icon="icons.faEdit"
          :text="order.states.includes('PRE-REGISTERED') ? 'Concluir registro' : 'Editar'"
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
          :disabled-message="order.states.includes('CLOSED') && 'Não é possível alterar status de pedidos fechados.'"
          :icon="icons.faExchangeAlt"
          text="Alterar status"
          icon-color="primary"
          @click="onChangeStatusClick"
        />

        <AppDropdownItem
          :disabled-message="!order.states.includes('PAID') && 'Não é possível fechar pedidos com pendência financeira.'"
          :icon="!order.states.includes('CLOSED') ? icons.faTimesCircle : icons.faBoxOpen"
          :text="!order.states.includes('CLOSED') ? 'Fechar pedido' : 'Reabrir pedido'"
          icon-color="primary"
          @click.prevent="toggleOrder"
        />
      </ul>
    </div>
  </div>
</template>
