<script>
import { faPlus } from '@fortawesome/free-solid-svg-icons'
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
    id="modalNewBranch"
    :value="value"
    color="success"
    centered
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faPlus"
        fixed-width
      />
      Nova Filial
    </template>

    <template #body>
      <BranchForm
        :cities="cities"
        :shipping-companies="shippingCompanies"
        @success="onSuccess"
      />
    </template>
  </AppModal>
</template>
