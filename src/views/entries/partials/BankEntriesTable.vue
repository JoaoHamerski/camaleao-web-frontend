<script>
import { faPlus, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { formatCurrencyBRL } from '@/utils/formatters'

export default {
  props: {
    fileEntry: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      hideDuplicates: false,
      icons: {
        faPlus,
        faExclamationCircle
      }
    }
  },
  computed: {
    duplicatesCount () {
      return this.fileEntry.entries.filter(entry => entry.isDuplicated).length
    },
    headers () {
      return [
        { value: 'action', text: '' },
        { value: 'value', text: 'Valor' },
        { value: 'date', text: 'Data' },
        { value: 'description', text: 'Descrição', wrap: true }
      ]
    }
  },
  watch: {
    fileEntry () {
      this.hideDuplicates = false
    }
  },
  methods: {
    formatCurrencyBRL,
    onAddEntryClick(item) {
      this.$emit('add-entry', item)
    },
    onHideDuplicatesClick () {
      this.$emit('hide-duplicates-toggle', !this.hideDuplicates)
    },
    tableRowClass(item) {
      if (item.isDuplicated) {
        return 'table-secondary'
      }
      if (item.value > 0) {
        return 'table-success'
      }

      return 'table-danger'
    },
    getItemColor(item) {
      if (item.isDuplicated) {
        return 'secondary'
      }

      return item.value > 0 ? 'success' : 'danger'
    },
    isItemDisabled(item) {
      return item.isDuplicated
    },
    getContentMessage(item) {
      if (item.isDuplicated) {
        return 'Item duplicado'
      }

      if (item.value > 0) {
        return 'Entrada'
      }

      if (item.value < 0) {
        return 'Saída'
      }

      return 'Como isso foi parar ai?'
    }
  }
}
</script>

<template>
  <div>
    <span class="badge bg-primary mb-2">
      {{ fileEntry.entries.length }} entradas carregadas
    </span>

    <span
      v-tippy
      content="Já constam no banco de dados"
      class="badge bg-secondary ms-1 mb-2"
    >
      {{ duplicatesCount }} entradas duplicadas
    </span>

    <AppCheckboxSwitch
      id="hideDuplicatesCheckbox"
      v-model="hideDuplicates"
      @input="onHideDuplicatesClick"
    >
      Ocultar duplicatas
    </AppCheckboxSwitch>
    <div
      class="small text-secondary"
    >
      <span
        v-tippy
        content="Significa que ela já consta no banco de dados de Pagamentos ou Despesas do sistema."
      >
        <FontAwesomeIcon
          :icon="icons.faExclamationCircle"
          fixed-width
        />
        Entradas duplicadas são marcadas em cinza.
      </span>
    </div>
    <AppTable
      :row-class="tableRowClass"
      :headers="headers"
      :items="fileEntry.entries"
    >
      <template #[`items.action`]="{ item }">
        <AppButton
          v-tippy
          :content="getContentMessage(item)"
          :disabled="isItemDisabled(item)"
          btn-class="btn-sm"
          :color="getItemColor(item)"
          :icon="icons.faPlus"
          @click.prevent="onAddEntryClick(item)"
        />
      </template>
      <template #[`items.description`]="{ item }">
        <span :class="isItemDisabled(item) && 'text-secondary'">{{ item.description }}</span>
      </template>
      <template #[`items.date`]="{ item }">
        <span :class="isItemDisabled(item) && 'text-secondary'">{{ item.date }}</span>
      </template>
      <template #[`items.value`]="{ item }">
        <b :class="`text-${getItemColor(item)}`">{{ formatCurrencyBRL(item.value) }}</b>
      </template>
    </AppTable>
  </div>
</template>
