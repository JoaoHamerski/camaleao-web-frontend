<script>
import { isEmpty } from 'lodash'
import { faPlus, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { GetClientWithOrders } from '@/graphql/Client.gql'

import ClientCard from '../partials/ClientCard'
import ClientOrdersCard from './ClientOrdersCard'
import ClientOrdersHeader from './ClientOrdersHeader'

export default {
  metaInfo () {
    if (isEmpty(this.client)) {
      return {
        title: 'Carregando...'
      }
    }

    return {
      title: this.client.name
    }
  },
  components: {
    ClientCard,
    ClientOrdersCard,
    ClientOrdersHeader
  },
  apollo: {
    client: {
      query: GetClientWithOrders,
      variables () {
        return {
          id: this.$route.params.clientKey,
          orderPage: this.page,
          orderWhere: this.orderWhere
        }
      }
    }
  },
  data () {
    return {
      page: 1,
      client: null,
      orderWhere: {},
      icons: {
        faPlus,
        faArrowAltCircleLeft
      }
    }
  },
  computed: {
    isLoading () {
      return !!this.$apollo.queries.client.loading
    },
    orders () {
      return this.client?.orders || {}
    }
  },
  methods: {
    handleSearch (code) {
      const where = {
        column: 'CODE',
        operator: 'LIKE',
        value: `%${code}%`
      }

      this.page = 1
      this.orderWhere = where
    },
    onSearchClear () {
      this.page = 1
      this.orderWhere = {}
    }
  }
}
</script>

<template>
  <div class="mt-5 row mx-auto">
    <div class="col-3">
      <div class="mb-1">
        <AppButton
          outlined
          @click="$router.push({name: 'clients.index'})"
        >
          <FontAwesomeIcon :icon="icons.faArrowAltCircleLeft" />
          Clientes
        </AppButton>
      </div>

      <ClientCard
        :is-loading="isLoading"
        :client="client"
      />
    </div>

    <div class="col-9">
      <ClientOrdersHeader
        @search="handleSearch"
        @clear-search="onSearchClear"
      />

      <ClientOrdersCard
        :is-loading="isLoading"
        :orders="orders.data"
      />

      <AppPaginator
        v-model="page"
        class="mt-2"
        :pagination="orders.paginatorInfo"
      />
    </div>
  </div>
</template>
