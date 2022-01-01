<script>
import TheLayout from '../TheLayout'

export default {
  name: 'ExpensesLayout',
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
