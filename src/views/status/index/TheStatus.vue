<script>
import TheStatusCard from './TheStatusCard.vue'
import TheStatusHeader from './TheStatusHeader.vue'

export default {
  metaInfo: {
    title: 'Status'
  },
  components: {
    TheStatusCard,
    TheStatusHeader
  }
}
</script>
<template>
  <div class="py-5">
    <TheStatusHeader />
    <TheStatusCard />
  </div>
</template>
