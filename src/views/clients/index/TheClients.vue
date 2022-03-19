<script>
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { formatPhone } from '@/utils/formatters'

import { GetClients } from '@/graphql/Client.gql'

import TheClientsCard from './TheClientsCard'
import TheClientsHeader from './TheClientsHeader'

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
          ...this.query,
          orderBy: [{ column: 'CREATED_AT', order: 'DESC' }]
        }
      }
    }
  },
  data () {
    return {
      query: {
        page: 1,
        hasCity: null,
        where: null
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
      this.query = { ...this.query, ...query, page: 1 }
    },
    onSearchClear () {
      this.query.hasCity = null
      this.query.where = null
      this.query.page = 1
    }
  }
}
</script>

<template>
  <div class="col-10 mx-auto mt-5">
    <TheClientsHeader
      @search="onSearch"
      @search-clear="onSearchClear"
    />

    <TheClientsCard
      :clients="clients.data"
      :is-loading="isLoading"
    />

    <AppPaginator
      v-model="query.page"
      class="mt-2"
      :is-loading="isLoading"
      :pagination="clients.paginatorInfo"
    />
  </div>
</template>
