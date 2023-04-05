<script>
import { ConfirmBankMirrorEntry } from '@/graphql/Entry.gql'
import { GetCashFlowEntries } from '@/graphql/CashFlow.gql'
import { GetExpenses } from '@/graphql/Expense.gql'
import { GetDailyCash } from '@/graphql/DailyCash.gql'
import { apolloClientInstance } from '@/vue-apollo'

import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons'
import { get } from 'lodash-es'
import { formatCurrencyBRL } from '@/utils/formatters'

import { TippyComponent } from 'vue-tippy'

export default {
  components: {
    Tippy: TippyComponent
  },
  props: {
    entries: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      confirmPromptId: '',
      loadingItemId: '',
      icons: {
        faPlus,
        faCheck
      }
    }
  },
  computed: {
    headers () {
      return [
        {value: 'add-option', text: 'Vincular', align: 'center'},
        {value: 'value', text: 'Valor', format: 'currencyBRL'},
        {value: 'date', text: 'Data', format: 'datetime'},
        {value: 'description', text: 'Descrição', wrap: true},
        {value: 'confirm-option', text: 'Confirmar', align: 'center'},
      ]
    }
  },
  methods: {
    get,
    formatCurrencyBRL,
    getEntryColor (entry) {
      if (entry.value > 0) {
        return 'success'
      }

      return 'danger'
    },
    linkEntry (entry) {
      if (entry.value > 0) {
        this.$emit('link-payment', entry)
        return
      }

      this.$emit('link-expense', entry)
    },
    setConfirmEntry ({id}) {
      this.confirmPromptId = id
    },
    async confirmEntry () {
      const id = this.confirmPromptId

      this.loadingItemId = id

      try {
        await this.$apollo.mutate({
          mutation: ConfirmBankMirrorEntry,
          variables: { id }
        })

        this.$helpers.clearCacheFrom([
          {fieldName: 'cashFlowEntries'},
          {fieldName: 'expenses'},
          {fieldName: 'dailyCash'},
          {fieldName: 'dailyCashBalance'},
        ])

        this.$toast.success('Entrada confirmada!')
      } catch (error) {
        console.log((error))
        this.$toast.error('Ops! Algo deu errado.')
      }

      this.loadingItemId = ''
      this.closeConfirmPrompt()
    },
    closeConfirmPrompt () {
      this.confirmPromptId = ''
    },
    rowClass (item) {
      return item.value > 0
        ? 'table-success'
        : 'table-danger'
    }
  }
}
</script>

<template>
  <AppTable
    :row-class="rowClass"
    :headers="headers"
    :items="entries"
  >
    <template #[`items.value`]="{ item }">
      <span
        class="fw-bold"
        :class="`text-${getEntryColor(item)}`"
      >{{ formatCurrencyBRL(item.value) }}</span>
    </template>
    <template #[`items.add-option`]="{ item }">
      <AppButton
        btn-class="btn-sm"
        :icon="icons.faPlus"
        :disabled="item.is_tied"
        :color="item.is_tied ? 'secondary' : getEntryColor(item)"
        @click.prevent="linkEntry(item)"
      />
    </template>

    <template #[`items.confirm-option`]="{ item }">
      <Tippy
        trigger="click"
        placement="left"
        :on-shown="() => setConfirmEntry(item)"
        :on-hidden="() => closeConfirmPrompt()"
        interactive
      >
        <template #trigger>
          <AppButton
            btn-class="btn-sm"
            :color="item.is_confirmed ? 'secondary' : 'success'"
            :icon="icons.faCheck"
            :disabled="item.is_confirmed || item.id === loadingItemId"
            :loading="item.isLoading"
          />
        </template>
        <span v-if="!item.is_confirmed">
          <AppButton
            class="me-1"
            btn-class="btn-sm fw-bold"
            color="success"
            :loading="loadingItemId === item.id"
            :disabled="item.is_confirmed"
            @click.prevent="confirmEntry"
          >
            Confirmar
          </AppButton>
        </span>
        <span v-else>Já confirmado</span>
      </Tippy>
    </template>
  </AppTable>
</template>
