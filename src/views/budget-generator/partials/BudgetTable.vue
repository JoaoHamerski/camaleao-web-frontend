<script>
import {
  faEdit,
  faTrashAlt,
  faExternalLinkAlt
} from '@fortawesome/free-solid-svg-icons'

import {
  GetBudgetGeneratedPDF,
  GetBudgets,
  DeleteBudget
} from '@/graphql/Budget.gql'

export default {
  props: {
    budgets: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      budgetToOpen: {
        id: '',
        isLoading: false
      },
      budgetToDelete: {
        id: '',
        isLoading: false,
      },
      icons: {
        faEdit,
        faTrashAlt,
        faExternalLinkAlt
      }
    }
  },
  computed: {
    headers () {
      return [
        { value: 'client', text: 'Cliente' },
        { value: 'product', text: 'Produto' },
        { value: 'date', text: 'Data', format: 'datetime' },
        { value: 'options', text: '', align: 'right'}
      ]
    }
  },
  methods: {
    onEditClick(budget) {
      this.$emit('edit', budget)
    },
    onDeleteClick(budget) {
      this.budgetToDelete.id = budget.id
    },
    onCancelDeleteClick() {
      this.budgetToDelete.id = ''
    },
    async onConfirmDeleteClick({ id }) {
      this.budgetToDelete.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: DeleteBudget,
          variables: { id },
          refetchQueries: [GetBudgets],
          awaitRefetchQueries: true
        })

        this.$toast.success('Orçamento deletado!')
      } catch (error) {
        this.$toast.error('Ops! Algo deu errado.')
      }

      this.budgetToDelete.isLoading = false
    },
    async onOpenBudgetClick (budget) {
      this.budgetToOpen.id = budget.id
      this.budgetToOpen.isLoading = true

      try {
        const { data: { budgetGeneratePDF: budgetUrl } } = await this.$apollo.query({
          query: GetBudgetGeneratedPDF,
          variables: {
            id: budget.id
          }
        })

        this.$helpers.openInNewTab(budgetUrl)
      } catch (error) {
        this.$toast.error('Ops! Algo deu errado.')
      }

      this.budgetToOpen.isLoading = false
    }
  }
}
</script>

<template>
  <AppTable
    :items="budgets"
    :headers="headers"
  >
    <template
      #[`items.options`]="{ item }"
    >
      <div v-if="item.id === budgetToDelete.id">
        <div class="text-end text-subtitle fw-bold">
          DELETAR
        </div>
        <div class="text-end">
          <AppButton
            color="success"
            btn-class="btn-sm fw-bold"
            class="me-2"
            :loading="budgetToDelete.isLoading"
            @click.prevent="onConfirmDeleteClick(item)"
          >
            Confirmar
          </AppButton>
          <AppButton
            color="light"
            btn-class="btn-sm"
            :disable="budgetToDelete.isLoading"
            @click.prevent="onCancelDeleteClick"
          >
            Cancelar
          </AppButton>
        </div>
      </div>
      <div
        v-else
        class="text-end"
      >
        <AppButton
          btn-class="btn-sm"
          outlined
          :icon="icons.faExternalLinkAlt"
          :loading="budgetToOpen.id === item.id && budgetToOpen.isLoading"
          @click.prevent="onOpenBudgetClick(item)"
        />
        <AppButton
          class="mx-2"
          btn-class="btn-sm"
          outlined
          :icon="icons.faEdit"
          @click.prevent="onEditClick(item)"
        />
        <AppButton
          color="danger"
          btn-class="btn-sm"
          outlined
          :icon="icons.faTrashAlt"
          @click.prevent="onDeleteClick(item)"
        />
      </div>
    </template>
  </AppTable>
</template>
