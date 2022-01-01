<script>
import ViewerFileModal from '@/components/AppViewer/ViewerFileModal'

export default {
  components: {
    ViewerFileModal
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    order: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    clientKey () {
      return this.$route.params.clientKey
    },
    orderKey () {
      return this.$route.params.orderKey
    },
    src () {
      if (this.value) {
        return process.env.VUE_APP_API_URL + `/api/clients/${this.clientKey}/orders/${this.orderKey}/generate-report`
      }

      return ''
    }
  }
}
</script>

<template>
  <ViewerFileModal
    :value="value"
    :src="src"
    modal-dialog-class="modal-fullscreen"
    v-on="$listeners"
  >
    <template #title>
      Relatório de pedido - {{ order.code }}
    </template>
  </ViewerFileModal>
</template>
