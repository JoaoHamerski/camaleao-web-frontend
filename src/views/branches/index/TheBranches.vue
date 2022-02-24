<script>
import { faPlus, faTruck } from '@fortawesome/free-solid-svg-icons'
import { branches } from '@/graphql/Branch.gql'
import { shippingCompanies } from '@/graphql/ShippingCompany.gql'
import { cities } from '@/graphql/City.gql'

import TheBranchesCard from './TheBranchesCard'
import ModalShippingCompanies from '../partials/ModalShippingCompanies'
import ModalNewBranch from '../partials/ModalNewBranch'

export default {
  metaInfo: {
    title () {
      return 'Filiais'
    }
  },
  components: {
    TheBranchesCard,
    ModalShippingCompanies,
    ModalNewBranch
  },
  apollo: {
    branches: {
      query: branches
    },
    cities: {
      query: cities
    },
    shippingCompanies: {
      query: shippingCompanies,
      result ({ loading, data }) {
        if (!loading) {
          this.shippingCompanies = data.shippingCompanies.map(
            item => ({ isEdit: false, ...item })
          )
        }
      }
    }
  },
  data () {
    return {
      branches: [],
      shippingCompanies: [],
      cities: [],
      modalShippingCompanies: false,
      modalNewBranch: false,
      icons: {
        faPlus,
        faTruck
      }
    }
  },
  computed: {
    isShippingCompaniesLoading () {
      return !!this.$apollo.queries.shippingCompanies.loading
    },
    isBranchesLoading () {
      return !!this.$apollo.queries.branches.loading
    }
  },
  methods: {
    refreshShippingCompanies () {
      this.$apollo.queries.shippingCompanies.refetch()
    },
    refreshBranches () {
      this.$apollo.queries.branches.refetch()
    },
    onNewBranchClick () {
      this.modalNewBranch = true
    },
    onNewBranch () {
      this.modalNewBranch = false
      this.refreshBranches()
    },
    onShippingCompaniesClick () {
      this.modalShippingCompanies = true
    }
  }
}
</script>

<template>
  <div>
    <div class="d-flex justify-content-between mt-5 mb-2">
      <AppButton
        btn-class="fw-bold"
        color="success"
        :icon="icons.faPlus"
        @click.prevent="onNewBranchClick"
      >
        Nova filial
      </AppButton>
      <AppButton
        btn-class="fw-bold"
        :icon="icons.faTruck"
        @click.prevent="onShippingCompaniesClick"
      >
        Transportadoras
      </AppButton>
    </div>

    <ModalNewBranch
      v-model="modalNewBranch"
      :cities="cities"
      :shipping-companies="shippingCompanies"
      @success="onNewBranch"
    />

    <ModalShippingCompanies
      v-model="modalShippingCompanies"
      :shipping-companies="shippingCompanies"
      :is-loading="isShippingCompaniesLoading"
      @refresh="refreshShippingCompanies"
    />

    <TheBranchesCard
      :branches="branches"
      :cities="cities"
      :shipping-companies="shippingCompanies"
      :is-loading="isBranchesLoading"
      @refresh="refreshBranches"
    />
  </div>
</template>
