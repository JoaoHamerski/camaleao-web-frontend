<script>
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { formatPhone } from '@/utils/formatters'

import { GetClients } from '@/graphql/Client.gql'

import TheClientsCard from './TheClientsCard.vue'
import TheClientsHeader from './TheClientsHeader.vue'

export const COLUMNS = {
  NAME: 'NAME',
  CITY: 'CITY',
  PHONE: 'PHONE'
}

export default {
  components: {
    TheClientsCard,
    TheClientsHeader
  },
  metaInfo: {
    title: 'Clientes'
  },
  apollo: {
    clients: {
      query: GetClients,
      variables () {
        return {
          ...this.clientsVariables,
          orderBy:  [{ column: 'CREATED_AT', order: 'DESC' }],
          page: this.page
        }
      }
    }
  },
  data () {
    return {
      page: 1,
      clientsVariables: {
        where: {},
        hasCity: null,
      },
      clients: {
        data: [],
        paginatorInfo: {}
      },
      icons: {
        faUserPlus
      }
    }
  },
  computed: {
    isLoading () {
      return !!this.$apollo.queries.clients.loading
    }
  },
  methods: {
    formatPhone,
    onSearch (query) {
      this.page = 1
      this.clientsVariables = query
    },
    onSearchClear () {
      this.page = 1
      this.clientsVariables = {
        hasCity: null,
        where: {}
      }
    }
  }
}
</script>

<template>
  <div class="col col-sm-10 mx-auto py-5">
    <TheClientsHeader
      @search="onSearch"
      @search-clear="onSearchClear"
    />

    <TheClientsCard
      :clients="clients.data"
      :is-loading="isLoading"
    />

    <AppPaginator
      v-model="page"
      class="mt-2"
      :is-loading="isLoading"
      :pagination="clients.paginatorInfo"
    />
  </div>
</template>
