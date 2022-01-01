<script>
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import DailyPaymentForm from './DailyPaymentForm'

export default {
  components: {
    DailyPaymentForm
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
    id="dailyPaymentModal"
    :value="value"
    modal-dialog-class="moda"
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
      <DailyPaymentForm @success="onSuccess" />
    </template>
  </AppModal>
</template>
