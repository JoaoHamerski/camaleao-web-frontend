<script>
import ErrorPage from '@/views/_errors/ErrorPage.vue'
import SpinnerBootPage from '@/components/SpinnerBootPage.vue'

export default {
  components: {
    ErrorPage,
    SpinnerBootPage
  },
  computed: {
    error () {
      return this.$store.state.error
    },
    isBooted () {
      return this.$store.state.booted
    }
  }
}
</script>
<template>
  <div id="app">
    <SpinnerBootPage
      v-show="!isBooted"
      key="app-booting"
    />

    <AppTransition
      enter="fadeIn"
      mode="out-in"
    >
      <ErrorPage
        v-if="error !== null"
        key="app-error"
        :error="error"
      />

      <RouterView
        v-else
        key="app-main"
      />
    </AppTransition>
  </div>
</template>
