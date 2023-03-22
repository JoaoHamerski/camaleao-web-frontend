<script>
import { faCog } from '@fortawesome/free-solid-svg-icons'
import BudgetSettingsForm from './BudetSettingsForm.vue'

export default {
  components: {
    BudgetSettingsForm
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      icons: {
        faCog
      }
    }
  }
}
</script>

<template>
  <AppModal
    id="budgetSettingsModal"
    :value="value"
    v-bind="$attrs"
    modal-dialog-class="modal-lg"
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faCog"
        fixed-width
      />

      Configurações do orçamento
    </template>

    <template #body>
      <BudgetSettingsForm v-if="value" />
    </template>
  </AppModal>
</template>
