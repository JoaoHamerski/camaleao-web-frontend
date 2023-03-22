<script>
import TheProductionTrackHeader from './TheProductionTrackHeader.vue'
import TheProductionTrackBody from './TheProductionTrackBody.vue'

export default {
  metaInfo () {
    return {
      title: 'Esteira de Produção'
    }
  },
  components: {
    TheProductionTrackHeader,
    TheProductionTrackBody
  },
  methods: {
    refresh () {
      this.$refs.productionTrackBody.refresh()
    }
  }
}
</script>
<template>
  <div class="py-2">
    <TheProductionTrackHeader @refresh="refresh" />
    <TheProductionTrackBody ref="productionTrackBody" />
  </div>
</template>
