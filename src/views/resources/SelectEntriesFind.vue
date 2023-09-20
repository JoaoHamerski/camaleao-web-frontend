<script>
import { GetEntries } from '@/graphql/Entry.gql'

import { formatCurrencyBRL } from '@/utils/formatters'

export default {
  props: {
    value: undefined,
    isExpense: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      entries: {
        items: [],
        isLoading: false
      }
    }
  },
  methods: {
    async asyncFindEntry(query) {
      if (!query.length) {
        this.entries.items = []
        return
      }

      this.entries.isLoading = true

      const { data: { entries: { data } } } = await this.$apollo.query({
        query: GetEntries,
        variables: {
          first: 10,
          where: {AND: [
            {
              column: "IS_CANCELED",
              operator: 'equals',
              value: false
            },
            {
              column: 'VALUE',
              operator: this.isExpense ? 'LT' : 'GT',
              value: 0
            },
            {
              column: 'DESCRIPTION',
              operator: 'LIKE',
              value: `%${query}%`
            }
          ]}
        }
      })

      this.entries.isLoading = false
      this.entries.items = data
    },
    getValue(value) {
      if (this.isExpense) {
        return formatCurrencyBRL(Math.abs(value))
      }

      return formatCurrencyBRL(value)
    }
  }
}
</script>

<template>
  <AppSelect
    id="entryPayment"
    :value="value"
    name="entryPayment"
    searchable
    :internal-search="false"
    :options="entries.items"
    :loading="entries.isLoading"
    placeholder="Busque pela descrição..."
    optional
    @search-change="asyncFindEntry"
    v-on="$listeners"
  >
    Entradas bancárias
    <template #[`option`]="{ props }">
      <div class="small">
        <div><b>Valor</b>: {{ getValue(props.option.value) }}</div>
        <div><b>Descrição</b>: {{ props.option.description }}</div>
        <div><b>Data</b>: {{ props.option.date }}</div>
      </div>
    </template>
    <template #hint>
      Selecione um pagamento pelas entradas bancárias
    </template>
  </AppSelect>
</template>
