<script>
import { formatDatetime } from '@/utils/formatters'

import OrderReminder from './partials/OrderReminder'
import OrderClothingTypes from './partials/OrderClothingTypes'
import OrderNotes from './partials/OrderNotes'
import OrderPayments from './partials/OrderPayments'
import OrderFiles from './partials/OrderFiles'

export default {
  components: {
    OrderClothingTypes,
    OrderNotes,
    OrderPayments,
    OrderFiles,
    OrderReminder
  },
  props: {
    order: {
      type: Object,
      required: true
    },
    isOrderPreRegistered: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    showReminder () {
      return this.isOrderPreRegistered && this.order.reminder
    },
    /**
     * Compatibilidade com versão antiga do sistema,
     * só exibe a tabela de tipos de roupas
     * se a quantidade não existir (pre-registro) ou houver tipos de roupas
     */
    shouldShowClothingTypes () {
      return !this.order.quantity || this.order.clothing_types.length
    }
  },
  methods: {
    formatDatetime
  }
}
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <div>
    <OrderReminder v-if="showReminder">
      {{ order.reminder }}
    </OrderReminder>

    <AppContainer>
      <template #title>
        Detalhes do Pedido
      </template>
      <template #body>
        <div class="row">
          <div class="col-12 col-sm mb-3 mb-sm-0">
            <div class="fw-bold small text-secondary">
              Nome
            </div>
            <b class="text-subtitle">
              {{ $helpers.fallback(order.name) }}
            </b>
          </div>
          <div class="col text-right text-sm-center">
            <div class="fw-bold small text-secondary">
              Código
            </div>
            <b class="text-subtitle">
              {{ $helpers.fallback(order.code) }}
            </b>
          </div>
          <div class="col text-start text-sm-end">
            <div class="fw-bold small text-secondary">
              Registrado em
            </div>
            <b class="text-subtitle">
              {{ formatDatetime(order.created_at) }}
            </b>
          </div>
        </div>

        <div class="d-flex justify-content-between mt-3">
          <div>
            <b class="small text-secondary">Status</b>
            <h6
              class="fw-bold"
              :class="order.status.is_available ? 'text-success' : 'text-warning'"
            >
              {{ order.status.text }}
            </h6>
          </div>
          <div>
            <b class="small text-secondary">Quantidade</b>
            <h5 class="fw-bold text-center">
              {{ $helpers.fallback(order.quantity) }}
            </h5>
          </div>
        </div>

        <div class="mt-3 d-flex flex-column flex-sm-row justify-content-between">
          <div>
            <b class="small text-secondary">Data de estampa</b>
            <div>
              {{ $helpers.fallback(formatDatetime(order.print_date)) }}
            </div>
          </div>
          <div>
            <b class="small text-secondary">Data de costura</b>
            <div>
              {{ $helpers.fallback(formatDatetime(order.seam_date)) }}
            </div>
          </div>
          <div>
            <b class="small text-secondary">Data de entrega</b>
            <div>
              {{ $helpers.fallback(formatDatetime(order.delivery_date)) }}
            </div>
          </div>
        </div>
      </template>
    </AppContainer>

    <OrderClothingTypes
      v-if="shouldShowClothingTypes"
      :order="order"
      class="mt-3"
    />

    <AppContainer
      v-if="order.price !== null"
      class="mt-3"
    >
      <template #title>
        Valor total
      </template>
      <template #body>
        <div class="my-3 d-flex flex-column flex-sm-row justify-content-around">
          <div>
            <div>
              <b class="small text-secondary">Valor total</b>
            </div>
            <h5
              class="text-primary mb-0"
              v-html="$helpers.toBRL(order.original_price, true)"
            />
            <template v-if="order.discount">
              <div
                class="small text-secondary"
              >
                DESCONTO:
                <b>{{ $helpers.toBRL(-order.discount) }}</b>
              </div>
              <div class="small text-primary">
                VALOR FINAL:
                <b>{{ $helpers.toBRL(order.original_price - order.discount) }}</b>
              </div>
            </template>
          </div>
          <div class="my-2 my-sm-0">
            <div>
              <b class="small text-secondary">Total pago</b>
            </div>
            <h5
              class="mb-0"
              :class="{
                'text-success': order.total_paid >= 0,
              }"
              v-html="$helpers.toBRL(order.total_paid, true)"
            />
            <template v-if="order.has_sponsor">
              <div class="small">
                <span class="text-secondary">PATROCÍNIO:</span> <b class="text-success">{{ $helpers.toBRL(order.total_paid_sponsor) }}</b>
              </div>
            </template>
          </div>
          <div>
            <div>
              <b class="small text-secondary">Faltar pagar</b>
            </div>
            <h5
              :class="{
                'text-success': order.total_owing <= 0,
                'text-danger': order.total_owing > 0
              }"
              v-html="$helpers.toBRL(order.total_owing, true)"
            />
          </div>
        </div>
      </template>
    </AppContainer>

    <OrderNotes
      class="mt-3"
      :order-id="order.id"
      :notes="order.notes"
    />

    <OrderPayments
      class="mt-3"
      :payments="order.payments"
      @open-modal="$emit('open-modal', $event)"
    />

    <OrderFiles
      class="mt-3"
      :order="order"
    />
  </div>
</template>
