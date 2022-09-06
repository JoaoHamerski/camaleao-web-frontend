<script>
import TheOrderControlHeader from './TheOrderControlHeader.vue'
import TheOrderControlBody from './TheOrderControlBody.vue'

export default {
  metaInfo () {
    return {
      title: 'Controle de Pedidos'
    }
  },
  components: {
    TheOrderControlHeader,
    TheOrderControlBody
  }
}
</script>
<template>
  <div class="py-2">
    <TheOrderControlHeader />
    <TheOrderControlBody />
  </div>
</template>
