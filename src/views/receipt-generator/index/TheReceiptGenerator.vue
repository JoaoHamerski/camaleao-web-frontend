<script>
import TheReceiptGeneratorHeader from './TheReceiptGeneratorHeader.vue'
import TheReceiptGeneratorBody from './TheReceiptGeneratorBody.vue'

export default {
  metaInfo: {
    title: 'Gerador de recibo'
  },
  components: {
    TheReceiptGeneratorHeader,
    TheReceiptGeneratorBody
  }
}
</script>

<template>
  <div class="py-3">
    <TheReceiptGeneratorHeader />
    <TheReceiptGeneratorBody class="mt-2" />
  </div>
</template>
