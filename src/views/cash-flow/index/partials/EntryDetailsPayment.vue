<script>
import { faHandHoldingUsd, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { formatDatetime } from '@/utils/formatters'
import EntryDetailsHeader from './EntryDetailsHeader'

export default {
  components: {
    EntryDetailsHeader
  },
  props: {
    payment: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      icons: {
        faHandHoldingUsd,
        faExclamationCircle
      }
    }
  },
  computed: {
    clientUrl () {
      const resolvedRoute = this.$router.resolve({
        name: 'clients.show',
        params: {
          clientKey: this.payment.order.client.id
        }
      })

      return resolvedRoute.href
    },
    orderUrl () {
      const resolvedRoute = this.$router.resolve({
        name: 'orders.show',
        params: {
          clientKey: this.payment.order.client.id,
          orderKey: this.payment.order.code
        }
      })

      return resolvedRoute.href
    }
  },
  methods: {
    formatDatetime,
    getOrderNameOrCode (order) {
      return order.name || `[CÓD.] ${order.code}`
    }

  }
}
</script>

<template>
  <div>
    <EntryDetailsHeader
      :icon="icons.faHandHoldingUsd"
      :value="payment.value"
      :date="payment.date"
      date-tooltip="Data do pagamento"
      color="success"
    />

    <hr>

    <small
      v-if="payment.note"
      class="d-block text-center text-secondary"
    >
      {{ payment.note }}
    </small>

    <div class="mt-4">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <b>Cliente: </b>
          <a
            class="text-decoration-none"
            :href="clientUrl"
            target="_blank"
          >{{ payment.order.client.name }}</a>
        </li>

        <li class="list-group-item">
          <b>Pedido: </b>
          <a
            class="text-decoration-none"
            :href="orderUrl"
            target="_blank"
          >{{ getOrderNameOrCode(payment.order) }}</a>
        </li>

        <li class="list-group-item">
          <b>Via: </b> {{ payment.payment_via.name }}
        </li>

        <li class="list-group-item d-flex justify-content-between">
          <div><b>Confirmado em: </b> {{ formatDatetime(payment.confirmed_at) }}</div>
          <div>
            <FontAwesomeIcon
              v-tippy
              content="Data em que foi confirmado pela gerência"
              :icon="icons.faExclamationCircle"
              class="text-primary"
            />
          </div>
        </li>

        <li class="list-group-item d-flex justify-content-between">
          <div>
            <b>Registrado em: </b> {{ formatDatetime(payment.created_at, "dd/mm/yyyy HH'h 'mm'm'") }}
          </div>

          <div>
            <FontAwesomeIcon
              v-tippy
              content="Data em que foi registrado no sistema"
              :icon="icons.faExclamationCircle"
              class="text-primary"
            />
          </div>
        </li>
      </ul>
    </div>

    <div class="text-end mt-4">
      <AppButton
        color="light"
        data-bs-dismiss="modal"
      >
        Fechar
      </AppButton>
    </div>
  </div>
</template>
