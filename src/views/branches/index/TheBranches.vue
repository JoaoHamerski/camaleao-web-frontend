<script>
import { faPlus, faTruck } from '@fortawesome/free-solid-svg-icons'
import { GetBranches } from '@/graphql/Branch.gql'
import { GetShippingCompanies } from '@/graphql/ShippingCompany.gql'
import { GetCities } from '@/graphql/City.gql'

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
      query: GetBranches
    },
    cities: {
      query: GetCities
    },
    shippingCompanies: {
      query: GetShippingCompanies
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
    onNewBranchClick () {
      this.modalNewBranch = true
    },
    onNewBranch () {
      this.modalNewBranch = false
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
    />

    <TheBranchesCard
      :branches="branches"
      :cities="cities"
      :shipping-companies="shippingCompanies"
      :is-loading="isBranchesLoading"
    />
  </div>
</template>
