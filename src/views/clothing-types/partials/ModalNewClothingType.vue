<script>
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import ClothingTypeForm from './ClothingTypeForm'

export default {
  components: {
    ClothingTypeForm
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
    onSuccess () {
      this.$emit('success')
    }
  }
}
</script>

<template>
  <AppModal
    id="modalNewClothingType"
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
      Novo tipo de camisa
    </template>

    <template #body>
      <ClothingTypeForm
        v-if="value"
        @success="onSuccess"
      />
    </template>
  </AppModal>
</template>
