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
        <html>
          <head>
            <title>${this.orderImage}</title>
            <style>
              @media print { @page { size: landscape } }
            </style>
          </head>
          <body>
            <img
              src="${this.orderImage}"
              alt="Imagem da arte"
              onload="window.print();window.close()"
            />
          </body>
        </html>
      `)

      win.focus()
    },
    openImage(event) {
      event.stopPropagation()

      const ref = this.$refs[`viewer_${this.orderId}`]
      const viewer = ref.$refs.viewer.$viewer

      viewer.options.toolbar['print'] = () => this.print()
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
      :image="{src: orderImage, alt: 'Imagem da arte'}"
      :extra-toolbar="['print']"
      :print="print"
    >
      <VueLoadImage>
        <img
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
