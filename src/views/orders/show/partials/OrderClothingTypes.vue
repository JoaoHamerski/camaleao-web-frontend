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
        { text: 'TOTAL', value: 'total_value', format: 'currencyBRL' }
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
      <tr
        v-if="order.clothing_types > 1"
        class="fw-bold"
      >
        <td colspan="3">
          TOTAL CAMISAS
        </td>
        <td>
          {{ $helpers.toBRL(order.total_clothings_value) }}
        </td>
      </tr>
      <template v-if="order.shipping_value">
        <tr class="fw-bold">
          <td colspan="3">
            FRETE
          </td>
          <td>{{ $helpers.toBRL(order.shipping_value) }}</td>
        </tr>
      </template>
      <template v-if="hasDiscount">
        <tr
          class="fw-bold"
        >
          <td
            colspan="3"
            nowrap
          >
            DESCONTO
          </td>
          <td nowrap>
            {{ $helpers.toBRL(-order.discount) }}
          </td>
        </tr>
      </template>

      <tr class="fw-bold table-primary">
        <td nowrap>
          VALOR FINAL
        </td>
        <td
          colspan="2"
          nowrap
        >
          {{ order.quantity }}
        </td>
        <td nowrap>
          {{ $helpers.toBRL(order.price) }}
        </td>
      </tr>
    </template>
  </AppTable>
</template>
