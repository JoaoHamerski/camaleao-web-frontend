<script>
import PaymentExpenseStatus from '@/views/resources/payments-expenses/PaymentExpenseStatus.vue'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import roles from '@/constants/roles'

export default {
  components: {
    PaymentExpenseStatus
  },
  props: {
    payment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      icons: {
        faEdit
      }
    }
  },
  computed: {
    isEditEnabled () {
      if (this.payment.is_confirmed === null) {
        return true
      }

      if (this.payment.is_confirmed === true && this.$helpers.canView(roles.GERENCIA)) {
        return true
      }

      return false
    }
  }
}
</script>
<template>
  <div class="d-flex flex-row align-items-center">
    <PaymentExpenseStatus
      :entry="payment"
      :is-expense="false"
      class="me-2"
    />

    <AppButton
      :disabled="!isEditEnabled"
      :color="isEditEnabled ? 'primary' : 'secondary'"
      :tooltip="isEditEnabled ? 'Editar' : 'Não é possível editar'"
      :icon="icons.faEdit"
      btn-class="btn-sm px-3"
      outlined
      @click.prevent="$emit('edit', payment)"
    />
  </div>
</template>
