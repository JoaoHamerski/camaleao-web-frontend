<script>
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { formatCurrencyBRL } from '@/utils/formatters'
import { DateTime } from 'luxon'

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
    getDate(item, { settings }) {
      const dateFormat = settings.date_format.replace('mm', 'MM')
      const date = DateTime.fromFormat(
        item[settings.fields.date],
        dateFormat
      )

      return date.toFormat('dd/MM/yyyy')
    },
    tableRowClass(item, {settings: { fields }}) {
      if (item[fields.value] > 0) {
        return 'table-success'
      }

      return 'table-danger'
    },
    addItemToEntry(item, { settings: { fields }}) {
      this.$emit('add-entry', {
        item,
        fields,
        isExpense: item[fields.value] < 0,
      })
    },
    getHeaders({ settings: { fields } }) {
      return [
        { value: 'action', text: ''},
        { value: fields.value, text: 'Valor', format: 'currencyBRL' },
        { value: fields.date, text: 'Data' },
        { value: fields.description, text: 'Descrição', wrap: true }
      ]
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
          :headers="getHeaders(entry)"
          :items="entry.data"
          :row-class="(item) => tableRowClass(item, entry)"
        >
          <template #[`items.action`]="{ item }">
            <AppButton
              v-tippy
              :content="item.valor > 0 ? 'Entrada' : 'Saída'"
              btn-class="btn-sm"
              :color="item.valor > 0 ? 'success' : 'danger'"
              :icon="icons.faPlus"
              @click.prevent="addItemToEntry(item, entry)"
            />
          </template>

          <template #[`items.${entry.settings.fields.date}`]="{ item }">
            {{ getDate(item, entry) }}
          </template>

          <template #[`items.${entry.settings.fields.value}`]="{ item }">
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
