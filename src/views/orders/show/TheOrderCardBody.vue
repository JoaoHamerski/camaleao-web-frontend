<script>
import { formatDatetime } from '@/utils/formatters'

import OrderReminder from './partials/OrderReminder'
import OrderClothingTypesTable from './partials/OrderClothingTypesTable'
import OrderNotes from './partials/OrderNotes'
import OrderPayments from './partials/OrderPayments'
import OrderFiles from './partials/OrderFiles'

export default {
  components: {
    OrderClothingTypesTable,
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

    <div>
      <h5 class="fw-bold text-secondary">
        Detalhes do Pedido
      </h5>
      <div class="d-flex justify-content-between">
        <div>
          <div class="fw-bold small text-secondary">
            Nome
          </div>
          <b class="text-subtitle">
            {{ $helpers.fallback(order.name) }}
          </b>
        </div>
        <div>
          <div class="fw-bold small text-secondary">
            Código
          </div>
          <b class="text-subtitle">
            {{ $helpers.fallback(order.code) }}
          </b>
        </div>
        <div>
          <div class="fw-bold small text-secondary">
            Registrado em
          </div>
          <b class="text-subtitle">
            {{ formatDatetime(order.created_at) }}
          </b>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-between mt-3">
      <div>
        <b class="small text-secondary">Status</b>
        <h5
          class="fw-bold"
          :class="order.status.is_available ? 'text-success' : 'text-warning'"
        >
          {{ order.status.text }}
        </h5>
      </div>
      <div>
        <b class="small text-secondary">Quantidade</b>
        <h5 class="fw-bold text-center">
          {{ $helpers.fallback(order.quantity) }}
        </h5>
      </div>
    </div>

    <div class="mt-3 d-flex justify-content-between">
      <div>
        <b class="small text-secondary">Data de produção</b>
        <div>
          {{ $helpers.fallback(formatDatetime(order.production_date)) }}
        </div>
      </div>
      <div>
        <b class="small text-secondary">Data de entrega</b>
        <div>
          {{ $helpers.fallback(formatDatetime(order.delivery_date)) }}
        </div>
      </div>
    </div>

    <div
      v-if="shouldShowClothingTypes"
      class="mt-3"
    >
      <div>
        <b class="small text-secondary">Tipos de roupa</b>
      </div>
      <OrderClothingTypesTable :order="order" />
    </div>

    <div
      v-if="order.price !== null"
      class="my-3 d-flex justify-content-around"
    >
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
      <div>
        <div>
          <b class="small text-secondary">Total pago</b>
        </div>
        <h5
          :class="{
            'text-success': order.total_paid >= 0,
          }"
          v-html="$helpers.toBRL(order.total_paid, true)"
        />
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

    <OrderNotes
      class="mb-3"
      :order-id="order.id"
      :notes="order.notes"
    />

    <OrderPayments
      class="mb-3"
      :payments="order.payments"
      @open-modal="$emit('open-modal', $event)"
    />

    <OrderFiles
      class="mb-3"
      :order="order"
    />
  </div>
</template>
