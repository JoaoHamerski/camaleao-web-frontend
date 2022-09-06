<script>
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import SectorForm from './SectorForm.vue'

export default {
  components: {
    SectorForm
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      icons: {
        faPlus
      }
    }
  },
  methods: {
    onSuccess() {
      this.$emit('success')
    }
  }
}
</script>

<template>
  <AppModal
    id="sectorModal"
    color="success"
    :value="value"
    centered
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faPlus"
        fixed-width
      />
      Cadastrar novo setor
    </template>

    <template #body>
      <SectorForm
        v-if="value"
        @success="onSuccess"
      />
    </template>
  </AppModal>
</template>
