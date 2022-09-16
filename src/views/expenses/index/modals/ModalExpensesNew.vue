<script>

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import ExpensesForm from '../ExpensesForm.vue'

export default {
  components: {
    ExpensesForm
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    expense: {
      type: Object,
      default: () => ({})
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
    id="expensesRegisterModal"
    color="success"
    :value="value"
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faPlus"
        fixed-width
      />
      Nova despesa
    </template>

    <template #body>
      <ExpensesForm
        v-if="value"
        key="registerForm"
        :expense="expense"
        @success="onSuccess"
      />
    </template>
  </AppModal>
</template>
