<script>
import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import BranchForm from './BranchForm.vue'

export default {
  components: {
    BranchForm
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    branch: {
      type: Object,
      default: null
    },
    shippingCompanies: {
      type: Array,
      default: () => []
    },
    cities: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      icons: {
        faBuilding
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
    id="modalEditBranch"
    :value="value"
    centered
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faBuilding"
        fixed-width
      />
      Editar filial
    </template>
    <template #body>
      <BranchForm
        v-if="value"
        :is-edit="true"
        :branch="branch"
        :cities="cities"
        :shipping-companies="shippingCompanies"
        @success="onSuccess"
      />
    </template>
  </AppModal>
</template>
