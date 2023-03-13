<script>
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import BudgetForm from './BudgetForm.vue'

export default {
  components: {
    BudgetForm
  },
  props: {
    budget: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      icons: {
        faEdit
      }
    }
  },
  methods: {
    onSuccess () {
      this.$emit('success')
    }
  }
}
</script>

<template>
  <AppModal
    id="budgetEditModal"
    v-bind="$attrs"
    :value="value"
    modal-dialog-class="modal-xl"
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faEdit"
        fixed-width
      />
      Alterar orçamento
    </template>

    <template #body>
      <BudgetForm
        v-if="value"
        is-edit
        :budget="budget"
        @success="onSuccess"
      />
    </template>
  </AppModal>
</template>
