<script>
import ClientCard from '../partials/ClientCard'
import { faPlus, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { clientsShow } from '@/graphql/Client.gql'

import 'tippy.js/themes/light-border.css'

import ClientOrdersCard from './ClientOrdersCard'
import ClientOrdersHeader from './ClientOrdersHeader'

export default {
  metaInfo () {
    return {
      title: this.client?.name || ''
    }
  },
  components: {
    ClientCard,
    ClientOrdersCard,
    ClientOrdersHeader
  },
  apollo: {
    client: {
      query: clientsShow,
      variables () {
        return {
          id: this.clientKey,
          orderPage: this.page,
          orderWhere: this.orderWhere
        }
      }
    }
  },
  data () {
    return {
      page: 1,
      code: '',
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
    clientKey () {
      return this.$route.params.clientKey
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

      this.orderWhere = where
    },
    onSearchClear () {
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
        :code="code"
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
