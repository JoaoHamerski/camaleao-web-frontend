<script>
import orderCardMixin from '../../mixins/orderCardMixin'
import orderStatesMixin from '../../../orders/orderStatesMixin'
import OrderExtendedHeader from './OrderExtendedHeader'
import OrderExtendedImage from './OrderExtendedImage'
import OrderExtendedList from './OrderExtendedList'

export default {
  components: {
    OrderExtendedHeader,
    OrderExtendedImage,
    OrderExtendedList
  },
  mixins: [orderCardMixin, orderStatesMixin]
}
</script>

<template>
  <div>
    <div class="card">
      <OrderExtendedHeader
        v-bind="{
          order,
          orderUrl,
          isOrderPreRegistered,
          orderTitle
        }"
      />

      <div class="card-body p-0">
        <OrderExtendedImage v-bind="{orderImage}" />
      </div>
      <OrderExtendedList
        v-bind="{
          order,
          clientUrl,
          orderUrl,
          isOrderPreRegistered,
          isOrderPaid
        }"
      />
    </div>
  </div>
</template>
