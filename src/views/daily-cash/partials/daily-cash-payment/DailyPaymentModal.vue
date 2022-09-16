<script>
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import DailyPaymentForm from './DailyPaymentForm.vue'

export default {
  components: {
    DailyPaymentForm
  },
  props: {
    payment: {
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
    id="dailyPaymentModal"
    color="success"
    :value="value"
    v-on="$listeners"
  >
    <template #title>
      <h6 class="fw-bold mb-0">
        <FontAwesomeIcon
          :icon="icons.faPlus"
          fixed-width
        />
        Nova entrada
      </h6>
    </template>

    <template #body>
      <DailyPaymentForm
        :payment="payment"
        @success="onSuccess"
      />
    </template>
  </AppModal>
</template>
