<script>
import ErrorPage from '@/views/_errors/ErrorPage.vue'

export default {
  components: {
    ErrorPage
  },
  computed: {
    error () {
      return this.$store.state.error
    }
  }
}
</script>
<template>
  <div id="app">
    <ErrorPage
      v-if="error !== null"
      key="app-error"
      :error="error"
    />
    <router-view
      v-else
      key="app-main"
    />
  </div>
</template>
