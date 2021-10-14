<script>
import TheLayout from '../TheLayout'

export default {
  name: 'ClientsLayout',
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
