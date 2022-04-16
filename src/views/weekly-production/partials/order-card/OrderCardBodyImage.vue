<script>
import OrderCardBodyImageEmpty from './OrderCardBodyImageEmpty.vue'
import VueLoadImage from 'vue-load-image'

export default {
  components: {
    VueLoadImage,
    OrderCardBodyImageEmpty
  },
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  computed: {
    orderImage () {
      if (this.order.art_paths) {
        return this.order.art_paths[0]
      }

      if (this.order.isPreCreated) {
        return this.order.image.base64
      }

      return null
    },
  }
}
</script>

<template>
  <div class="img-thumbnail border-0">
    <AppViewer v-if="orderImage">
      <VueLoadImage>
        <img
          slot="image"
          class="img-fluid clickable"
          :src="orderImage"
          alt="Imagem da arte"
        >
        <div
          slot="preloader"
          class="position-relative py-5"
        >
          <AppLoading />
        </div>
      </VueLoadImage>
    </AppViewer>
    <OrderCardBodyImageEmpty v-else />
  </div>
</template>
