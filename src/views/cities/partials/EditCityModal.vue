<script>
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import CityForm from './CityForm'

export default {
  components: {
    CityForm
  },
  props: {
    city: {
      type: Object,
      default: () => ({})
    },
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
    id="editCityModal"
    :value="value"
    centered
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faEdit"
        fixed-width
      />
      Editar dados de
      <template v-if="value">
        {{ city.name }}
      </template>
    </template>
    <template #body>
      <CityForm
        v-if="value"
        :is-edit="true"
        :city="city"
        :states="states"
        @success="onSuccess"
      />
    </template>
  </AppModal>
</template>
