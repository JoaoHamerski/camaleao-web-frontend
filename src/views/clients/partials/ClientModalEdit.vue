<script>
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import ClientForm from './ClientForm.vue'

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
  data () {
    return {
      icons: {
        faEdit
      }
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
    centered
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon :icon="icons.faEdit" />
      Editar dados de {{ client ? client.name : '' }}
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
