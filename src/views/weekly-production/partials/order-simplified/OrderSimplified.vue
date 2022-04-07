<script>
import orderCardMixin from '../../mixins/orderCardMixin'
import orderStatesMixin from '../../../orders/orderStatesMixin'
import OrderSimplifiedTitle from './OrderSimplifiedTitle.vue'
import OrderSimplifiedImage from './OrderSimplifiedImage.vue'
import OrderSimplifiedList from './OrderSimplifiedList.vue'

export default {
  components: {
    OrderSimplifiedTitle,
    OrderSimplifiedImage,
    OrderSimplifiedList
  },
  mixins: [orderCardMixin, orderStatesMixin]
}
</script>

<template>
  <div
    class="order-simplified"
  >
    <OrderSimplifiedTitle
      v-bind="{
        order,
        isOrderPreRegistered,
        orderUrl,
        orderTitle
      }"
    />

    <OrderSimplifiedImage
      v-bind="{
        orderImage
      }"
    />

    <OrderSimplifiedList
      v-bind="{
        order,
        formatDatetime,
        clientUrl
      }"
    />
  </div>
</template>

<style lang="scss" scoped>
::v-deep {
  &.order-simplified {
    .simplified-title {
      text-align: center;
      font-weight: bold;
      font-size: .9rem;
      color: white;
      border-radius: 1.25rem 1.25rem 0 0;
      padding: .25rem .5rem;
    }

    .img-thumbnail {
      border-radius: 0;
    }
  }
}
</style>
