<script>
import OrderGarmentsInfo from './OrderGarmentsInfo.vue'

export default {
  components: {
    OrderGarmentsInfo,
  },
  props: {
    order: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <AppContainer>
    <template #title>
      Roupas
    </template>
    <template #body>
      <OrderGarmentsInfo :garments="order.garments" />
    </template>
  </AppContainer>
</template>
