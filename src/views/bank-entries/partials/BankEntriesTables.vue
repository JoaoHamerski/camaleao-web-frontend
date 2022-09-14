<script>
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { formatCurrencyBRL } from '@/utils/formatters'

const HEADERS = {
  'data': {
    value: 'data',
    text: 'Data',
  },
  'valor': {
    value: 'valor',
    text: 'Valor',
    format: 'currencyBRL'
  },
  'descricao': {
    value: 'descricao',
    text: 'Descrição',
    wrap: true
  }
}

export default {
  props: {
    entries: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      icons: {
        faPlus
      }
    }
  },
  methods: {
    formatCurrencyBRL,
    addItemToEntry(item) {
      console.log(item)
    },
    getHeaders(fields) {
      const headers = fields.map((field) => HEADERS[field])
      headers.unshift({
        value: 'entry',
        text: 'Ação'
      })

      return headers.filter(header => !!header)
    }
  }
}
</script>

<template>
  <div>
    <AppContainer
      v-for="(entry, index) in entries"
      :key="index + entry.file.name"
      collapsible
      :value="true"
      class="mb-3"
    >
      <template #title>
        {{ entry.file.name }}
      </template>
      <template #body>
        <AppTable
          :headers="getHeaders(entry.fields)"
          :items="entry.data"
        >
          <template #[`items.entry`]="{ item }">
            <AppButton
              v-tippy
              :content="item.valor > 0 ? 'Entrada' : 'Saída'"
              btn-class="btn-sm"
              :color="item.valor > 0 ? 'success' : 'danger'"
              :icon="icons.faPlus"
              @click.prevent="addItemToEntry(item)"
            />
          </template>

          <template #[`items.valor`]="{ item }">
            <span
              class="fw-bold"
              :class="{
                'text-success': item.valor > 0,
                'text-danger': item.valor < 0,
              }"
            >
              {{ formatCurrencyBRL(item.valor) }}
            </span>
          </template>
        </AppTable>
      </template>
    </AppContainer>
  </div>
</template>
