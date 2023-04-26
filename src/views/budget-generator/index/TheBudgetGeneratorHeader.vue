<script>
import { faPlus, faCog } from '@fortawesome/free-solid-svg-icons'

import BudgetSettingsModal from '../partials/BudgetSettingsModal.vue'
import BudgetCreateModal from '../partials/BudgetCreateModal.vue'

export default {
  components: {
    BudgetCreateModal,
    BudgetSettingsModal
  },
  data () {
    return {
      budgetSettingsModal: false,
      budgetCreateModal: false,
      icons: {
        faPlus,
        faCog
      }
    }
  },
  methods: {
    onNewBudgetClick () {
      this.budgetCreateModal = true
    },
    onSettingsClick () {
      this.budgetSettingsModal = true
    },
    onNewBudgetCreated () {
      this.budgetCreateModal = false
    },
    onEditBudget () {
      this.budgetE
    }
  }
}
</script>
<template>
  <div>
    <div class="d-flex justify-content-between mt-3">
      <AppButton
        btn-class="fw-bold"
        color="success"
        :icon="icons.faPlus"
        @click.prevent="onNewBudgetClick"
      >
        Novo orçamento
      </AppButton>
      <AppButton
        btn-class="fw-bold"
        :icon="icons.faCog"
        @click="onSettingsClick"
      >
        Configurações
      </AppButton>
    </div>

    <BudgetCreateModal
      v-model="budgetCreateModal"
      @success="onNewBudgetCreated"
    />

    <BudgetSettingsModal
      v-model="budgetSettingsModal"
    />
  </div>
</template>
