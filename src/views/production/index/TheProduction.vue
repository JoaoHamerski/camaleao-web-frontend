<script>
import { GetAuthUserCommissions } from '@/graphql/Production.gql'

import TheProductionCard from './TheProductionCard'
import TheProductionCardCommission from './TheProductionCardCommission'

export default {
  metaInfo: {
    title () {
      return 'Produção'
    }
  },
  apollo: {
    commissionsUser: {
      query: GetAuthUserCommissions,
      variables () {
        return {
          page: this.page
        }
      },
      fetchPolicy: 'network-only'
    }
  },
  components: {
    TheProductionCard,
    TheProductionCardCommission
  },
  data () {
    return {
      page: 1,
      commissionsUser: {
        data: [],
        paginatorInfo: {}
      }
    }
  },
  computed: {
    isLoading () {
      return !!this.$apollo.queries.commissionsUser.loading
    }
  }
}
</script>

<template>
  <div class="py-5">
    <TheProductionCardCommission class="mb-2" />
    <TheProductionCard
      :commissions-user="commissionsUser.data"
      :is-loading="isLoading"
    />
    <AppPaginator
      v-model="page"
      class="mt-2"
      :pagination="commissionsUser.paginatorInfo"
      :is-loading="isLoading"
    />
  </div>
</template>
