<script>
import { GetSponsoredPayments } from '@/graphql/Payment.gql'

export default {
  apollo: {
    payments: {
      query: GetSponsoredPayments,
      variables () {
        return {
          sponsorship_client_id: this.client.id,
          first: 10,
          page: this.page
        }
      }
    }
  },
  props: {
    client: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      page: 1,
      payments: {
        paginatorInfo: {},
        data: []
      }
    }
  },
  computed: {
    isQueryLoading () {
      return !!this.$apollo.queries.payments.loading
    },
    headers () {
        return [
          { text: 'Cód. ', value: 'order.code' },
          { text: 'Cliente', value: 'order.client.name' },
          { text: 'Patrocínio', value: 'value', format: 'currencyBRL' },
          { text: 'Valor', value: 'order.price', format: 'currencyBRL' },
          { text: 'Falta pagar', value: 'order.total_owing', format: 'currencyBRL' },
          { text: 'Total pago', value: 'order.total_paid', format: 'currencyBRL' },
          { text: 'Registro em', value: 'created_at', format: 'datetime', formatting: 'd/M/y HH:mm'}
        ]
    }
  },
  methods: {
    rowClass(item) {
      if (item.is_confirmed === true) {
        return 'table-success'
      }

      if (item.is_confirmed === false) {
        return 'table-danger'
      }

      return 'table-warning'
    }
  }
}
</script>

<template>
  <div>
    <AppPaginator
      v-model="page"
      :pagination="payments.paginatorInfo"
      :loading="isQueryLoading"
    />

    <AppLoading v-show="isQueryLoading" />
    <AppTable
      :headers="headers"
      :items="payments.data"
      :row-class="rowClass"
    >
      <template #[`items.order.code`]="{ item }">
        <a
          target="_blank"
          class="fw-bold text-decoration-none"
          :href="$helpers.getUrl('orders.show', {order: item.order.id, client: item.order.client.id})"
        >
          {{ item.order.code }}
        </a>
      </template>

      <template #[`items.order.client.name`]="{ item }">
        <a
          target="_blank"
          class="fw-bold text-decoration-none"
          :href="$helpers.getUrl('clients.show', {client: item.order.client.id})"
        >
          {{ item.order.client.name }}
        </a>
      </template>

      <template #[`items.order.total_owing`]="{ item }">
        <span class="fw-bold text-danger">{{ $helpers.toBRL(item.order.total_owing) }}</span>
      </template>

      <template #[`items.order.total_paid`]="{ item }">
        <span class="fw-bold text-success">{{ $helpers.toBRL(item.order.total_paid) }}</span>
      </template>

      <template #[`items.value`]="{ item }">
        <span class="fw-bold text-info">{{ $helpers.toBRL(item.value) }}</span>
      </template>
    </AppTable>
  </div>
</template>
