<script>
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import ReceiptForm from './ReceiptForm.vue'

export default {
  components: {
    ReceiptForm
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    receipt: {
      type: Object,
      default: () => ({})
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
    id="receiptEditModal"
    :value="value"
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faEdit"
        fixed-width
      />
      Editar recibo
    </template>

    <template #body>
      <ReceiptForm
        v-if="value"
        :receipt="receipt"
        is-edit
        @success="onSuccess"
      />
    </template>
  </AppModal>
</template>
