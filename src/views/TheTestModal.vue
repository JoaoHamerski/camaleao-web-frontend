<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<template>
  <AppModal
    id="testModal"
    :value="value"
    v-on="$listeners"
  >
    <template #title>
      Título
    </template>
    <template #body>
      Corpo
    </template>
  </AppModal>
</template>
