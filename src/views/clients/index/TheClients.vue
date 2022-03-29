<script>
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { formatPhone } from '@/utils/formatters'

import { GetClients } from '@/graphql/Client.gql'

import TheClientsCard from './TheClientsCard'
import TheClientsHeader from './TheClientsHeader'

export const clientsParams = {
  query: {},
  orderBy: [{ column: 'CREATED_AT', order: 'DESC' }]
}

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
        return { ...clientsParams, page: this.page }
      }
    }
  },
  data () {
    return {
      page: 1,
      clientsParams,
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
      this.clientsParams.query = {
        ...this.clientsParams.query,
        ...query
      }
    },
    onSearchClear () {
      this.page = 1
      this.clientsParams.query = {
        hasCity: null,
        where: null
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
