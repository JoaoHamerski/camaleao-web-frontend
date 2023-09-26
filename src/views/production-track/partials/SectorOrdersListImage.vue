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
  },
  methods: {
    print() {
      const win = window.open('')

      win.document.write(`
        <style>
          @media print { @page { size: landscape } }
        </style>
        <img
          src="${this.orderImage}"
          alt="Imagem da arte"
          onload="window.print(); window.close()"
        />
      `)

      win.document.close()
      win.focus()
    },
    openImage() {
      const viewer = this.$refs[`viewer_${this.orderId}`].$refs.viewer.$viewer

      viewer.options.toolbar['print'] = () => this.print()
      viewer.images[0] = this.$refs.image

      viewer.show()
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
          @click.prevent.stop="openImage"
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
