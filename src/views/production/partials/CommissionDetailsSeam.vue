<script>
export default {
  props: {
    commission: {
      type: Object,
      default: null
    }
  },
  computed: {
    clothingCommissions () {
      return JSON.parse(this.commission.seam_commission)
    },
    headers () {
      return [
        { text: 'Tipo de peça', value: 'name' },
        { text: 'Quantidade', value: 'quantity' },
        { text: 'Comissão por peça', value: 'commission', format: 'currencyBRL' },
        { text: 'Total', value: 'total' }
      ]
    }
  },
  methods: {
    evaluateCommissionPerClothing (commission, quantity) {
      return (quantity * commission).toFixed(2)
    }
  }
}
</script>

<template>
  <div>
    <AppTable
      :headers="headers"
      :items="clothingCommissions"
    >
      <template #[`items.total`]="{ item }">
        {{ $helpers.toBRL(evaluateCommissionPerClothing(item.commission, item.quantity)) }}
      </template>

      <template #bodyAppend>
        <tr class="text-start fw-bold">
          <td colspan="3">
            TOTAL
          </td>
          <td>{{ $helpers.toBRL(commission.seam_total_commission) }}</td>
        </tr>
      </template>
    </AppTable>
  </div>
</template>
