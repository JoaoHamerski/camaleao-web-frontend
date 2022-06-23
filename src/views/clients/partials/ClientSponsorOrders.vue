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
    headers () {
        return [
          { text: 'Cód. ', value: 'order.code' },
          { text: 'Cliente', value: 'order.client.name' },
          { text: 'Valor', value: 'order.price', format: 'currencyBRL' },
          { text: 'Falta pagar', value: 'order.total_owing', format: 'currencyBRL' },
          { text: 'Total pago', value: 'order.total_paid', format: 'currencyBRL' },
          { text: 'Patrocínio', value: 'value', format: 'currencyBRL'}
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
    />

    <AppTable
      :headers="headers"
      :items="payments.data"
      :row-class="rowClass"
    />
  </div>
</template>
