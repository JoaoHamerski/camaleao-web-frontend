<script>
import VueLoadImage from 'vue-load-image'

export default {
  components: {
    VueLoadImage
  },
  props: {
    orderId: {
      type: [String, Number],
      required: true
    },
    image: undefined
  },
  computed: {
    orderImage () {
      if (!this.image) {
        return null
      }

      return this.image[0]
    }
  }
}
</script>

<template>
  <div class="d-flex h-100 justify-content-center align-items-center">
    <AppViewer
      v-if="orderImage"
      :ref="`viewer_${orderId}`"
      :extra-toolbar="['print']"
    >
      <VueLoadImage>
        <img
          ref="image"
          :key="orderImage"
          slot="image"
          class="img-fluid img-thumbnail clickable"
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
    <div
      v-else
      class="img-thumbnail d-flex justify-content-center align-items-center text-secondary h-100 w-100 fw-bold"
    >
      <span>[SEM IMAGEM]</span>
    </div>
  </div>
</template>
