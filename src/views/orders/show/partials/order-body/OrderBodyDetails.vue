<script>
import { formatDatetime } from '@/utils/formatters';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';

export default {
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    icons: {
      faFileAlt
    }
  }),
  methods: {
    formatDatetime
  }
}
</script>

<template>
  <AppContainer>
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faFileAlt"
        fixed-width
      />
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
        <div v-if="order.print_date">
          <b class="small text-secondary">Data de estampa</b>
          <div>
            {{ $helpers.fallback(formatDatetime(order.print_date)) }}
          </div>
        </div>
        <div v-if="order.seam_date">
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
        <!-- <div>
          <b class="small text-secondary">Cadastrado por</b>
          <div>
            {{ order.user.name }}
          </div>
        </div> -->
      </div>
    </template>
  </AppContainer>
</template>
