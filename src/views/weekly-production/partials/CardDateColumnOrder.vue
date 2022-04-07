<script>
const OrderSimplified = () => import(
  /* webpackPrefetch: true */
  './order-simplified/OrderSimplified.vue'
)

const OrderExtended = () =>  import(
  /* webpackPrefetch: true */
  './order-extended/OrderExtended.vue'
)

export default {
  components: {
    OrderCreateCard: () => import('./OrderCreateCard.vue')
  },
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
    }
  },
  computed: {
    isOrderExtended () {
      return !this.order.isPreCreated && this.isActive
    },
    getOrderCardComponent () {
      if (this.isOrderExtended) {
        return OrderExtended
      }

      return OrderSimplified
    }
  }
}
</script>

<template>
  <div
    class="card-production-wrapper mb-2"
    :class="{'active': isActive, 'card-compact': isCompact}"
  >
    <OrderCreateCard
      v-if="order.isPreCreated && isActive"
      key="new-order"
      v-bind="$props"
      v-on="$listeners"
    />

    <Component
      :is="getOrderCardComponent"
      :key="`order__${order.id}`"
      v-bind="$props"
      v-on="$listeners"
    />
  </div>
</template>

<style lang="scss" scoped>
@import "@/sass/bootstrap-utilities";

::v-deep {
  &.card-production-wrapper {
    transition: width .15s, font-size .15s;
    @include media-breakpoint-up (sm) {
      &.active {
        width: 25%;
      }
    }

    @include media-breakpoint-down (sm) {
      width: 100%;
    }
  }

  &.card-production-wrapper.card-compact {
    &.active {
      width: 20%;
    }

    .list-group-item {
      font-size: .82rem;
    }

    .card-header {
      font-size: .9rem;
    }

    .btn {
      font-size: .85rem;
    }
  }

  .list-group {
    .list-group-item {
      border: 1px solid  lighten($secondary, 40%);
      border-top: 0;
    }

    .list-group-item:last-child {
      border-radius: 0 0 .15rem .15rem;
    }
  }
}
</style>
