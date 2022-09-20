<script>
import { faPlus, faSyncAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { DateTime } from 'luxon'
import { formatCurrencyBRL } from '@/utils/formatters'
import { GetDuplicatedEntries } from '@/graphql/OrderControl.gql'

export default {
  props: {
    entry: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isLoading: false,
      icons: {
        faPlus,
        faSyncAlt,
        faTrashAlt
      }
    }
  },
  computed: {
    hasDuplicates () {
      return this.entry.data.some(item => item.isDuplicated)
    },
    headers () {
      const fields = this.entry.settings.fields

      return [
        { value: 'action', text: '' },
        { value: fields.value, text: 'Valor', format: 'currencyBRL'},
        { value: fields.date, text: 'Data' },
        { value: fields.description, text: 'Descrição', wrap: true}
      ]
    },
    fields () {
      return this.entry.settings.fields
    }
  },
  methods: {
    formatCurrencyBRL,
    onRemoveDuplicatesClick () {
      this.$emit('remove-duplicates', { id: this.entry.id })
    },
    async onCheckDuplicatesClick () {
      const bank_uids = this.entry.data.map(item => item[this.fields.bank_uid])
      this.isLoading = true

      try {
        const {
          data: {
            bankCheckDuplicatedEntries: duplicates
          }
        } = await this.$apollo.mutate({
          mutation: GetDuplicatedEntries,
          variables: {
            bank_uids
          }
        })

        const duplicatesCount = duplicates.length

        if (duplicatesCount) {
          this.$toast.info(`Foi encontrado ${duplicatesCount} ${duplicatesCount > 1 ? 'itens duplicados' : 'item duplicado'}`)
        } else {
          this.$toast.info('Nenhum item duplicado encontrado')
        }

        this.$emit('duplicated-entries', {id: this.entry.id, duplicates})
      } catch (error) {
        this.$toast.error('Ops! Algo deu errado.')
      }

      this.isLoading = false
    },
    getDate(item) {
      const settings = this.entry.settings
      const dateFormat = settings.date_format.replace('mm', 'MM')
      const date = DateTime.fromFormat(
        item[this.fields.date],
        dateFormat
      )

      return date.toFormat('dd/MM/yyyy')
    },
    onAddClick(item) {
      this.$emit('register-entry', {
        item,
        fields: this.fields,
        isExpense: item[this.fields.value] < 0,
      })
    },
    tableRowClass(item) {
      if (item.isDuplicated) {
        return 'table-secondary'
      }
      if (item[this.fields.value] > 0) {
        return 'table-success'
      }

      return 'table-danger'
    },
    getItemColor(item) {
      if (item.isDuplicated) {
        return 'secondary'
      }

      return item[this.fields.value] > 0 ? 'success' : 'danger'
    }
  }
}
</script>

<template>
  <div>
    <div class="mb-2">
      <AppButton
        color="success"
        btn-class="fw-bold"
        :icon="icons.faSyncAlt"
        :loading="isLoading"
        @click.prevent="onCheckDuplicatesClick"
      >
        Verificar duplicatas
      </AppButton>
      <AppButton
        v-show="hasDuplicates"
        class="ms-2"
        color="danger"
        btn-class="fw-bold"
        outlined
        :icon="icons.faTrashAlt"
        @click.prevent="onRemoveDuplicatesClick"
      >
        Remover duplicatas
      </AppButton>
    </div>
    <AppTable
      :headers="headers"
      :items="entry.data"
      :row-class="(item) => tableRowClass(item)"
    >
      <template #[`items.action`]="{ item }">
        <AppButton
          v-tippy
          :disabled="item.isDuplicated"
          :content="item.valor > 0 ? 'Entrada' : 'Saída'"
          btn-class="btn-sm"
          :color="getItemColor(item)"
          :icon="icons.faPlus"
          @click.prevent="onAddClick(item)"
        />
      </template>
      <template #[`items.${entry.settings.fields.date}`]="{ item }">
        {{ getDate(item) }}
      </template>
      <template #[`items.${entry.settings.fields.value}`]="{ item }">
        <span
          class="fw-bold"
          :class="`text-${getItemColor(item)}`"
        >
          {{ formatCurrencyBRL(item.valor) }}
        </span>
      </template>
    </AppTable>
  </div>
</template>
