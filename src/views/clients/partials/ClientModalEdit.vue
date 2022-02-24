<script>
import ClientForm from './ClientForm'

export default {
  components: {
    ClientForm
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    client: {
      type: Object,
      default: null
    }
  },
  methods: {
    onSuccess () {
      this.$emit('success')
    }
  }
}
</script>

<template>
  <AppModal
    id="clientModalEdit"
    :value="value"
    v-on="$listeners"
  >
    <template #title>
      Editar dados de
    </template>
    <template #body>
      <ClientForm
        v-if="value"
        :is-edit="true"
        :client="client"
        @success="onSuccess"
      />
    </template>
  </AppModal>
</template>
