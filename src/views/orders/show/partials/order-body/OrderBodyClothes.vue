<script>
const OrderClothingTypes = () => import('../OrderClothingTypes.vue')
import OrderGarments from '../order-garments/OrderGarments.vue'
import OrderBodyClothesIndividualNames from './OrderBodyClothesIndividualNames.vue';
import { faTshirt } from '@fortawesome/free-solid-svg-icons';

export default {
  components: {
    OrderClothingTypes,
    OrderGarments,
    OrderBodyClothesIndividualNames
  },
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    icons: {
      faTshirt
    }
  }),
  computed: {
    shouldShowClothingTypes () {
      return !this.order.quantity || this.order.clothing_types.length
    }
  }
}
</script>

<template>
  <AppContainer class="mt-3">
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faTshirt"
        fixed-width
      />
      Roupas
    </template>
    <template #body>
      <div>
        <OrderClothingTypes
          v-if="shouldShowClothingTypes"
          :order="order"
          class="mt-3"
        />
        <OrderGarments
          :garments="order.garments"
          :has-individual-items="order.has_individual_names"
          class="mt-3"
        />
      </div>
      <div v-if="order.has_individual_names">
        <OrderBodyClothesIndividualNames :order="order" />
      </div>
    </template>
  </AppContainer>
</template>
