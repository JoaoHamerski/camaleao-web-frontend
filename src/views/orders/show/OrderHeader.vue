<script>
import { isEmpty } from 'lodash-es'
import { orderToggle } from '@/graphql/Orders.gql'

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

export default {
  props: {
    order: {
      type: Object,
      default: () => {}
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

      return false
    }
  },
  methods: {
    isEmpty,
    redirectToOrderEdit () {
      this.$router.push({
        name: 'orders.edit',
        params: {
          client: this.$route.params.clientKey,
          order: this.$route.params.orderKey
        }
      })
    },
    async toggleOrder () {
      const isOrderOpen = this.order.closed_at === null

      try {
        await this.$apollo.mutate({
          mutation: orderToggle,
          variables: {
            id: this.order.id
          }
        })

        this.$toast.success(isOrderOpen ? 'Pedido fechado' : 'Pedido reaberto')
        this.$emit('refresh')
      } catch (error) {
        this.$toast.error('Ops! Algo deu errado.')
      }
    },
    onDeleteOrderClick () {
      this.$emit('open-delete-order-modal')
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
        @click="$emit('open-payment-modal', {isEdit: false})"
      >
        Adicionar pagamento
      </AppButton>
    </div>
    <div>
      <AppButton
        class="me-1"
        :icon="icons.faFileInvoice"
        :disabled="!order"
        @click="$emit('open-report-modal')"
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
        v-if="order"
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
          @click="$emit('open-status-modal')"
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
