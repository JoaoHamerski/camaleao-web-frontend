<script>
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import SectorForm from './SectorForm.vue'

export default {
  components: {
    SectorForm
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    sector: {
      type: Object,
      default: () => {}
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
    id="sectorEditModal"
    centered
    :value="value"
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faEdit"
        fixed-width
      />
      Editar setor
    </template>

    <template #body>
      <SectorForm
        v-if="value"
        :is-edit="true"
        :sector="sector"
        @success="onSuccess"
      />
    </template>
  </AppModal>
</template>
