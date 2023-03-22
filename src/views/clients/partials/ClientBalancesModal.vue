<script>
import ClientBalances from './ClientBalances.vue'

export default {
  components: {
    ClientBalances
  },
  props: {
    client: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<template>
  <AppModal
    id="clientBalacesModal"
    :value="value"
    v-on="$listeners"
  >
    <template #title>
      Histórico de saldo do cliente
    </template>

    <template #body>
      <ClientBalances
        v-if="value"
        :client="client"
      />
    </template>
  </AppModal>
</template>
