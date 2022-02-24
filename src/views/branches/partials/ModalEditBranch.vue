<script>
import BranchForm from './BranchForm'

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
    v-on="$listeners"
  >
    <template #title>
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
