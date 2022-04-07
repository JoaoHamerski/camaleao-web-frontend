<script>
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import CityForm from './CityForm.vue'

export default {
  components: {
    CityForm
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    states: {
      type: Array,
      default: () => ([])
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
    onSuccess () {
      this.$emit('success')
    }
  }
}
</script>

<template>
  <AppModal
    id="newCityModal"
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
      Cadastrar nova cidade
    </template>
    <template #body>
      <CityForm
        :states="states"
        @success="onSuccess"
      />
    </template>
  </AppModal>
</template>
