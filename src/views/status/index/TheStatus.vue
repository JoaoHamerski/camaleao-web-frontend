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
  },
  methods: {
    onCreated () {
      console.log('alo')
      window.scrollTo(0, 10000)
    }
  }
}
</script>
<template>
  <div class="py-5">
    <TheStatusHeader />
    <TheStatusCard />
  </div>
</template>
