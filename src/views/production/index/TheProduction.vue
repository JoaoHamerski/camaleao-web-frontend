<script>
import { commissionsUser } from '@/graphql/Production.gql'

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
      query: commissionsUser,
      variables () {
        return {
          page: this.page
        }
      }
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
  <div>
    <TheProductionCardCommission class="mt-5 mb-2" />
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
