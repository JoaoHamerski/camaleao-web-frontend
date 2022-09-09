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
  },
  methods: {
    refresh () {
      this.$refs.orderControlBody.refresh()
    }
  }
}
</script>
<template>
  <div class="py-2">
    <TheOrderControlHeader @refresh="refresh" />
    <TheOrderControlBody ref="orderControlBody" />
  </div>
</template>
