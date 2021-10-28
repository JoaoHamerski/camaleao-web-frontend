<script>
export default {
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  computed: {
    hasDiscount () {
      return this.order.discount > 0
    },
    headers () {
      return [
        { text: 'TIPO', value: 'name' },
        { text: 'QUANTIDADE', value: 'quantity' },
        { text: 'VALOR UNIT.', value: 'value', format: 'currencyBRL' },
        { text: 'TOTAL', value: 'total', format: 'currencyBRL' }
      ]
    }
  }
}
</script>

<template>
  <AppTable
    table-class="table-sm"
    :headers="headers"
    :items="order.clothing_types"
  >
    <template #[`items.total`]="{ item }">
      <span
        v-tippy
        :content="`(${item.quantity} x ${$helpers.toBRL(item.value)})`"
      >
        {{ $helpers.toBRL(item.total) }}
      </span>
    </template>
    <template #bodyAppend>
      <template v-if="hasDiscount">
        <tr class="fw-bold">
          <td colspan="3">
            TOTAL
          </td>
          <td>
            {{ $helpers.toBRL(order.total_clothings_value) }}
          </td>
        </tr>
        <tr
          class="fw-bold"
        >
          <td colspan="3">
            DESCONTO
          </td>
          <td>
            - {{ $helpers.toBRL(order.discount) }}
          </td>
        </tr>
      </template>

      <tr class="fw-bold table-primary">
        <td>VALOR FINAL</td>
        <td colspan="2">
          {{ order.quantity }}
        </td>
        <td>{{ $helpers.toBRL(order.price) }}</td>
      </tr>
    </template>
  </AppTable>
</template>
