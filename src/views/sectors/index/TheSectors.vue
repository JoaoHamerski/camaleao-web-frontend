<script>
import TheSectorsHeader from './TheSectorsHeader.vue'
import TheSectorsBody from './TheSectorsBody.vue'

export default {
  metaInfo () {
    return {
      title: 'Setores'
    }
  },
  components: {
    TheSectorsHeader,
    TheSectorsBody
  }
}
</script>
<template>
  <div class="py-5">
    <TheSectorsHeader />
    <TheSectorsBody />
  </div>
</template>
