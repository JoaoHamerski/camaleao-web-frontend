<script>
import { faExternalLinkAlt, faPlus } from '@fortawesome/free-solid-svg-icons'
import { GetOrderByPaymentUid } from '@/graphql/Order.gql'

export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      icons: {
        faExternalLinkAlt,
        faPlus
      },
      loading: false
    }
  },
  computed: {
    getContentMessage() {
      return this.item.value > 0
        ? 'Entrada'
        : 'Saída'
    },
    hasRelatedOrder () {
      return this.item.isDuplicated && this.item.value > 0
    },
    isEntryCancelable () {
      return !this.item.isDuplicated && !this.item.isCanceled
    }
  },
  methods: {
    isEntryLoading (item) {
      return this.loading.bank_uid === item.bank_uid
    },
    onAddEntryClick (item) {
      this.$emit('add-entry', item)
    },
    onCancelEntryClick (item) {
      this.$emit('cancel-entry', item)
    },
    async openRelatedOrder() {
      this.loading = true

      const { data: { payment }} = await this.$apollo.query({
        query: GetOrderByPaymentUid,
        variables: {
          where: {
            column: 'BANK_UID',
            operator: 'EQ',
            value: this.item.bank_uid
          }
        }
      })

      this.loading = false

      const url = this.$helpers.getUrl('orders.show', {
        client: payment.order.client.id,
        order: payment.order.id
      })

      this.$helpers.openInNewTab(url)
    },
  }
}
</script>

<template>
  <div class="text-center">
    <div v-if="hasRelatedOrder">
      <AppButton
        v-tippy
        content="Ver pedido relacionado"
        :icon="icons.faExternalLinkAlt"
        btn-class="btn-sm"
        :loading="loading"
        @click.prevent="openRelatedOrder()"
      />
    </div>
    <div v-else>
      <AppButton
        v-tippy
        :content="getContentMessage"
        :disabled="disabled"
        btn-class="btn-sm"
        :color="color"
        :icon="icons.faPlus"
        @click.prevent="onAddEntryClick(item)"
      />

      <div
        v-if="isEntryCancelable"
      >
        <span
          class="link-primary clickable extra-small text-uppercase fw-bold text-decoration-none"
          @click.prevent="onCancelEntryClick(item)"
        >Cancelar
        </span>
      </div>
    </div>
  </div>
</template>
