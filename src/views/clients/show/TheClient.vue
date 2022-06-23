<script>
import { isEmpty } from 'lodash'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { GetClientWithOrders } from '@/graphql/Client.gql'

import ClientCard from '../partials/ClientCard.vue'
import ClientOrdersCard from './ClientOrdersCard.vue'
import ClientOrdersHeader from './ClientOrdersHeader.vue'
import ClientSponsorOrdersModal from '../partials/ClientSponsorOrdersModal.vue'

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
    ClientOrdersHeader,
    ClientSponsorOrdersModal
  },
  apollo: {
    client: {
      query: GetClientWithOrders,
      variables () {
        return {
          id: this.$route.params.clientKey,
          orderWhere: this.ordersQuery.where,
          orderPage: this.ordersQuery.page
        }
      },
      result ({data: {client}}) {
        if (!client) {
          this.$store.commit('SET_ERROR', 404)
        }
      }
    }
  },
  data () {
    return {
      clientSponsorOrdersModal: false,
      ordersQuery: {
        where: {},
        page: 1
      },
      client: null,
      icons: {
        faPlus
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

      this.ordersQuery.page = 1
      this.ordersQuery.where = where
    },
    onSearchClear () {
      this.ordersQuery.page = 1
      this.ordersQuery.where = {}
    },
    onSponsorsClick () {
      this.clientSponsorOrdersModal = true
    }
  }
}
</script>

<template>
  <div class="py-5 mx-auto">
    <ClientSponsorOrdersModal
      v-model="clientSponsorOrdersModal"
      :client="client"
    />

    <div>
      <ClientOrdersHeader
        class="mb-3 mb-sm-0"
        :client="client"
        @search="handleSearch"
        @clear-search="onSearchClear"
        @client-sponsors-click="onSponsorsClick"
      />
    </div>

    <div class="d-flex row flex-column flex-sm-row">
      <div class="col col-sm-3 mb-2 mb-sm-0">
        <ClientCard
          :is-loading="isLoading"
          :client="client"
        />
      </div>

      <div class="col col-sm-9">
        <ClientOrdersCard
          :is-loading="isLoading"
          :orders="orders.data"
        />
        <AppPaginator
          v-model="ordersQuery.page"
          class="mt-2"
          :pagination="orders.paginatorInfo"
        />
      </div>
    </div>
  </div>
</template>
