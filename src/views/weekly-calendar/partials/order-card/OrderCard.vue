<script>
import { GetWeeklyCalendarOrders } from '@/graphql/WeeklyCalendar.gql'
import { ConcludeOrderStatus } from '@/graphql/WeeklyCalendar.gql'
import orderStatesMixin from '../../../orders/orderStatesMixin'

import OrderCardHeader from './OrderCardHeader.vue'
import OrderCardBodyImage from './OrderCardBodyImage.vue'
import OrderCardItems from './OrderCardItems.vue'
export default {
  components: {
    OrderCardHeader,
    OrderCardBodyImage,
    OrderCardItems
  },
  mixins: [orderStatesMixin],
  props: {
    isCompact: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: false
    },
    order: {
      type: Object,
      default: null
    },
    field: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    isOrderExpanded () {
      return !this.order.isPreCreated && this.isActive
    },
    cardColor () {
      if (this.order.isPreCreated) {
        return 'camaleao'
      }

      if (this.isOrderPreRegistered) {
        return 'warning'
      }

      if(this.order.is_concluded) {
        return 'secondary'
      }

      return 'primary'
    },
    orderHeaderClass () {
      if (this.order.isPreCreated) {
        return `bg-${this.cardColor}`
      }

      return `clickable bg-link-${this.cardColor}`
    }
  },
  methods: {
    async onConcludeStatus () {
      this.isLoading = true

      try {
        const { data: { orderConcludeStatus: { status } } } = await this.$apollo.mutate({
          mutation: ConcludeOrderStatus,
          variables: {
            id: this.order.id,
            field: this.field
          },
          refetchQueries: [GetWeeklyCalendarOrders],
          awaitRefetchQueries: true
        })

        this.$helpers.clearCacheFrom({ fieldName: 'orders' })
        this.$toast.success(`Status do pedido concluído para ${status.text}`)
      } catch (error) {
        this.$toast.error('Ops! Algo deu errado!')
      }

      this.isLoading = false
    }
  }
}
</script>

<template>
  <div
    class="card"
    :class="!isOrderExpanded && 'card-shrink'"
  >
    <OrderCardHeader
      :order="order"
      :class="orderHeaderClass"
      :is-expanded="isOrderExpanded"
    />
    <div class="card-body">
      <OrderCardBodyImage :order="order" />
      <OrderCardItems
        :order="order"
        :is-expanded="isOrderExpanded"
        :loading-button="isLoading"
        @conclude-status="onConcludeStatus"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
::v-deep {
  &.card.card-shrink {
    .card-header {
      font-size: .9rem;
      padding: .25rem .5rem;
    }

    .card-body {
      .list-group {
        .list-group-item {
          padding: .25rem .5rem;
          font-size: .8rem;
        }
      }
    }
  }

  &.card {
    .card-header {
      word-break: break-all;
      padding: .5rem 1rem;
    }

    .card-body {
      padding: 0;
      .list-group {
        .list-group-item {
          font-size: .9rem;
        }
      }
    }
  }
}
</style>
