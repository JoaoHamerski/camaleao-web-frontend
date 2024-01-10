<script>
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';

const UNITIES = [
  { abbr: 'un', name: 'Unidade' },
  { abbr: 'pc', name: 'Peça' },
  { abbr: 'pct', name: 'Pacote' },
  { abbr: 'cx', name: 'Caixa' },
  { abbr: 'm', name: 'Metro' },
]

export default {
  components: {
    //
  },
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    UNITIES,
    icons: {
      faBoxOpen
    },
    headers: [
      {text: 'Descrição', value: 'description'},
      {text: 'Qtd.', value: 'quantity', align: 'center'},
      {text: 'Unid.', value: 'unity'},
      {text: 'Valor', value: 'value', format: 'currencyBRL'},
      {text: 'Total', value: 'total'},
    ]
  }),
  computed: {
    totalValues () {
      return this.order.products.filter(({ value }) => value > 0).reduce(
        (total, product) => +total + +(product.value * product.quantity).toFixed(),
      0)
    }
  },
  methods: {
    getUnityName (unity) {
      return UNITIES.filter(un => un.abbr === unity)[0].name
    }
  }
}
</script>

<template>
  <AppContainer class="mt-3">
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faBoxOpen"
        fixed-width
      />
      Produtos
    </template>
    <template #body>
      <AppTable
        table-class="table-sm"
        :headers="headers"
        :items="order.products.filter(({ value }) => value > 0)"
      >
        <template #[`items.description`]="{ item }">
          <div
            class="text-wrap"
          >
            {{ item.description }}
          </div>
        </template>
        <template #[`items.unity`]="{ item }">
          <span
            v-tippy
            :content="getUnityName(item.unity)"
          >{{ item.unity.toUpperCase() }}</span>
        </template>
        <template #[`items.total`]="{ item }">
          {{ $helpers.toBRL((item.value * item.quantity).toFixed(2)) }}
        </template>

        <template #bodyAppend>
          <tr class="table-primary">
            <td
              colspan="4"
              class="text-end fw-bold"
            >
              TOTAL
            </td>
            <td class="fw-bold">
              {{ $helpers.toBRL(totalValues) }}
            </td>
          </tr>
        </template>
      </AppTable>
    </template>
  </AppContainer>
</template>

<style scoped lang="scss">
::v-deep {
  table tr td {
    vertical-align: middle;
  }

  table tr:not(:last-child) td:first-child {
    width: 50%;
  }
}
</style>
