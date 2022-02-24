<script>
import TheLayout from '../TheLayout'

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
