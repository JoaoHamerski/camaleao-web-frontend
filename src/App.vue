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
    },
    getComponent () {
      if (this.error !== null) {
        return ErrorPage
      }

      return 'router-view'
    }
  }
}
</script>
<template>
  <div id="app">
    <SpinnerBootPage
      v-if="!isBooted"
      key="app-booting"
    />

    <AppTransition
      class="h-100"
      enter="fadeIn"
      mode="out-in"
    >
      <Component
        :is="getComponent"
        key="app-main"
        :error="error"
      />
    </AppTransition>
  </div>
</template>
