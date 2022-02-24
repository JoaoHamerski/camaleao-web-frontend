<script>
import { commissionsUsers } from '@/graphql/Production.gql'

import TheProductionUsersCommission from './TheProductionUsersCommission'
import TheProductionUsersCard from './TheProductionUsersCard'

export default {
  metaInfo: {
    title () {
      return 'Produção'
    }
  },
  components: {
    TheProductionUsersCommission,
    TheProductionUsersCard
  },
  apollo: {
    commissionsUsers: {
      query: commissionsUsers,
      variables () {
        return {
          page: this.page,
          where: this.where
        }
      }
    }
  },
  data () {
    return {
      page: 1,
      where: {},
      commissionsUsers: {
        data: [],
        paginatorInfo: {}
      }
    }
  },
  computed: {
    isLoading () {
      return !!this.$apollo.queries.commissionsUsers.loading
    }
  },
  methods: {
    onTabChanged (value) {
      if (value === 'confirmed') {
        this.where = {
          column: 'CONFIRMED_AT',
          operator: 'IS_NOT_NULL'
        }

        return
      }

      if (value === 'pending') {
        this.where = {
          column: 'CONFIRMED_AT',
          operator: 'IS_NULL'
        }

        return
      }

      this.where = {}
    }
  }
}
</script>

<template>
  <div class="mt-5">
    <TheProductionUsersCommission class="mb-2" />

    <TheProductionUsersCard
      :commissions="commissionsUsers.data"
      :is-loading="isLoading"
      @tab-changed="onTabChanged"
    />

    <AppPaginator
      v-model="page"
      class="mt-2"
      :pagination="commissionsUsers.paginatorInfo"
      :is-loading="isLoading"
    />
  </div>
</template>
