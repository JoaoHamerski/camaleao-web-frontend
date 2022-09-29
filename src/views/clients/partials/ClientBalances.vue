<script>
import { GetClientBalances } from '@/graphql/ClientBalance.gql'
import ClientBalancesItem from './ClientBalancesItem.vue'

export default {
  components: {
    ClientBalancesItem
  },
  props: {
    client: {
      type: Object,
      required: true
    }
  },
  apollo: {
    clientBalances: {
      query: GetClientBalances,
      variables () {
        return {
          clientId: this.client.id,
          first: 10,
          page: this.page,
        }
      }
    }
  },
  data () {
    return {
      page: 1,
      clientBalances: {
        paginatorInfo: {},
        data: []
      }
    }
  },
  computed: {
    isQueryLoading () {
      return !!this.clientBalances.loading
    }
  }
}
</script>

<template>
  <div class="position-relative">
    <AppLoading v-show="isQueryLoading" />

    <ul class="list-group list-group-flush">
      <ClientBalancesItem
        v-for="balance in clientBalances.data"
        :key="balance.id"
        :balance="balance"
      />
    </ul>
    <AppPaginator
      v-model="page"
      :loading="isQueryLoading"
      class="mt-3"
      :pagination="clientBalances.paginatorInfo"
    />
  </div>
</template>
