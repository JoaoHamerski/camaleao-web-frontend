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
          where: this.where,
          orderBy: this.orderBy
        }
      }
    }
  },
  data () {
    return {
      page: 1,
      where: {},
      orderBy: [],
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
      this.page = 1
      this.where = {}
      this.orderBy = []

      if (value === 'confirmed') {
        this.where = {
          column: 'CONFIRMED_AT',
          operator: 'IS_NOT_NULL'
        }

        this.orderBy = [{
          column: 'CONFIRMED_AT',
          order: 'DESC'
        }]

        return
      }

      if (value === 'pending') {
        this.where = {
          column: 'CONFIRMED_AT',
          operator: 'IS_NULL'
        }
      }
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
