<script>
import TheLayout from '../MainLayout.vue'

export default {
  name: 'ProductionLayout',
  components: {
    TheLayout
  }
}
</script>

<template>
  <TheLayout>
    <router-view />
  </TheLayout>
</template>
