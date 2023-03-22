<script>
import { GetUsersCommissions } from '@/graphql/Production.gql'

import TheProductionUsersCommission from './TheProductionUsersCommission.vue'
import TheProductionUsersCard from './TheProductionUsersCard.vue'

export const OPTIONS = {
  ALL: 'all',
  CONFIRMED: 'confirmed',
  PENDING: 'pending'
}

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
      query: GetUsersCommissions,
      variables () {
        return {
          page: this.page,
          where: this.where,
          orderBy: this.orderBy
        }
      },
      fetchPolicy: 'network-only'
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

      if (value === OPTIONS.CONFIRMED) {
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

      if (value === OPTIONS.PENDING) {
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
  <div class="py-5">
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
