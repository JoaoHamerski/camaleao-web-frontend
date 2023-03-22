<script>
import OrderCard from './order-card/OrderCard.vue'

export default {
  components: {
    OrderCard,
    OrderCreateCard: () => import('./OrderCreateCard.vue')
  },
  props: {
    isOrderable: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: 0
    },
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
    },
    orders: {
      type: Array,
      default: () => []
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

    <OrderCard
      v-else
      :key="`order__${order.id}`"
      v-bind="$props"
      v-on="$listeners"
    />
  </div>
</template>

<style lang="scss" scoped>
@import "@/sass/bootstrap-utilities";

::v-deep {
  .orderable-overflow {
    position: absolute;
    top: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .5);
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
    line-height: 1;
    padding: .7rem;
    border-bottom-left-radius: 50%;
  }

  &.card-production-wrapper {
    &, .list-group-item, .card-header {
      transition: width .05s, font-size .05s;
    }

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

      @include media-breakpoint-down (sm) {
        width: 100%;
      }
    }


    .card {
      .card-header {
        font-size: .85rem;
      }

      .card-body {
        .list-group {
          .list-group-item {
            padding: .3rem .7rem;
            font-size: .8rem;

            .btn {
              font-size: .6rem;
            }
          }
        }
      }

      .btn {
        font-size: .85rem;
      }
    }
  }
}
</style>
