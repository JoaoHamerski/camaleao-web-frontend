<script>
import OrderClothingTypesTable from './partials/OrderClothingTypesTable'
import OrderPayments from './partials/OrderPayments'
import OrderAttachments from './partials/OrderAttachments'
import { formatDatetime } from '@/utils/formatters'

export default {
  components: {
    OrderPayments,
    OrderAttachments,
    OrderClothingTypesTable
  },
  props: {
    order: {
      type: Object,
      required: true
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
            {{ order.code }}
          </b>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-between mt-3">
      <div>
        <b class="small text-secondary">Status</b>
        <h5
          class="fw-bold"
          :class="order.status.avaliable ? 'text-success' : 'text-warning'"
        >
          {{ order.status.text }}
        </h5>
      </div>
      <div>
        <b class="small text-secondary">Quantidade</b>
        <h5 class="fw-bold text-center">
          {{ order.quantity }}
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

    <div class="mt-3">
      <div>
        <b class="small text-secondary">Tipos de roupa</b>
      </div>
      <OrderClothingTypesTable :order="order" />
    </div>

    <div class="my-3 d-flex justify-content-around">
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

    <OrderPayments
      class="mb-3"
      :payments="order.payments"
      @open-modal="$emit('open-modal', $event)"
    />

    <OrderAttachments
      class="mb-3"
      :order="order"
    />
  </div>
</template>
