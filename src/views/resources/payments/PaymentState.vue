<script>
import PaymentStateInfo from './PaymentStateInfo.vue'
import PaymentStateActions from './PaymentStateActions.vue'

export default {
  components: {
    PaymentStateInfo,
    PaymentStateActions
  },
  props: {
    payment: {
      type: Object,
      required: true
    },
    confirmation: {
      type: undefined,
      required: true
    },
    showActions: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    showConfirmationButtons () {
      return this.showActions && this.confirmation === null
    }
  },
  methods: {
    onEdit (payment) {
      this.$emit('edit', payment)
    },
    onError (payment) {
      this.$emit('error', payment)
    },
    onSuccess() {
      this.$emit('success')
    }
  }
}
</script>

<template>
  <PaymentStateActions
    v-if="showConfirmationButtons"
    v-bind="{payment, confirmation}"
    @success="onSuccess"
    @edit="onEdit"
    @error="onError"
  />

  <PaymentStateInfo
    v-else
    :confirmation="confirmation"
  />
</template>
