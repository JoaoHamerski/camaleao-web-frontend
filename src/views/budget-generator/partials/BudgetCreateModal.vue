<script>
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import BudgetForm from './BudgetForm.vue'

export default {
  components: {
    BudgetForm
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
        faPlus
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
    id="budgetCreateModal"
    v-bind="$attrs"
    :value="value"
    modal-dialog-class="modal-xl"
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faPlus"
        fixed-width
      />
      Gerar novo orçamento
    </template>

    <template #body>
      <KeepAlive>
        <BudgetForm
          v-if="value"
          @success="onSuccess"
        />
      </KeepAlive>
    </template>
  </AppModal>
</template>
