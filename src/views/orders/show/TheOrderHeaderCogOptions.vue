<script>
import {
  faEdit,
  faTrashAlt,
  faExchangeAlt,
  faTimesCircle,
  faBoxOpen
} from '@fortawesome/free-solid-svg-icons'
import { orders } from '@/constants/route-names'
import { ToggleOrder } from '@/graphql/Order.gql'

export default {
  props: {
    order: {
      type: Object,
      default: null
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
        faEdit,
        faTrashAlt,
        faExchangeAlt,
        faTimesCircle,
        faBoxOpen
      }
    }
  },
  methods: {
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
    onDeleteOrderClick () {
      this.$emit('open-modal', {
        modal: 'delete-order'
      })
    },
    onChangeStatusClick () {
      this.$emit('open-modal', {
        modal: 'change-status'
      })
    }
  }
}
</script>
<template>
  <ul
    v-if="!isLoading"
    class="dropdown-menu"
    aria-labelledby="dropdownOptions"
    @click.stop
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
</template>
