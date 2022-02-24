<script>
import { faBuilding } from '@fortawesome/free-solid-svg-icons'

import TheBranchesCardTable from './TheBranchesCardTable'
import ModalEditBranch from '../partials/ModalEditBranch'
import ModalDeleteBranch from '../partials/ModalDeleteBranch'

export default {
  components: {
    TheBranchesCardTable,
    ModalEditBranch,
    ModalDeleteBranch
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    branches: {
      type: Array,
      default: () => []
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
      modalDeleteBranch: {
        value: false,
        branch: null
      },
      modalEditBranch: {
        value: false,
        branch: null
      },
      icons: {
        faBuilding
      }
    }
  },
  methods: {
    onDeleteSuccess () {
      this.modalDeleteBranch.value = false
      this.modalDeleteBranch.branch = null
      this.$emit('refresh')
    },
    onEditSuccess () {
      this.modalEditBranch.value = false
      this.modalEditBranch.branch = null
      this.$emit('refresh')
    },
    onActionClicked ({ item, action }) {
      if (action === 'edit') {
        this.modalEditBranch.branch = item
        this.modalEditBranch.value = true
      }

      if (action === 'delete') {
        this.modalDeleteBranch.branch = item
        this.modalDeleteBranch.value = true
      }
    }
  }
}
</script>
<template>
  <AppCard color="camaleao">
    <template #header>
      <h6 class="fw-bold mb-0">
        <FontAwesomeIcon
          :icon="icons.faBuilding"
          fixed-width
        />
        Gerenciamento de filiais
      </h6>
    </template>

    <template #body>
      <AppLoading v-show="isLoading" />

      <ModalEditBranch
        v-model="modalEditBranch.value"
        :branch="modalEditBranch.branch"
        :cities="cities"
        :shipping-companies="shippingCompanies"
        @success="onEditSuccess"
      />

      <ModalDeleteBranch
        v-model="modalDeleteBranch.value"
        :branch="modalDeleteBranch.branch"
        @success="onDeleteSuccess"
      />

      <TheBranchesCardTable
        :items="branches"
        @action="onActionClicked"
      />
    </template>
  </AppCard>
</template>
