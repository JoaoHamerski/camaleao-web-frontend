<script>
import TheLayout from '../MainLayout'

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
