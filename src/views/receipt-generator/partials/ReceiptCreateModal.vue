<script>
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import ReceiptCreateForm from './ReceiptCreateForm.vue'

export default {
  components: {
    ReceiptCreateForm
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
    id="receiptCreateModal"
    :value="value"
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faPlus"
        fixed-width
      />
      Gerar novo recibo
    </template>

    <template #body>
      <ReceiptCreateForm
        v-if="value"
        @success="onSuccess"
      />
    </template>
  </AppModal>
</template>
