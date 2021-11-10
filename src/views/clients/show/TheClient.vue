<script>
import ClientCard from '../partials/ClientCard'
import { faPlus, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
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
  chimera: {
    _orders () {
      return {
        url: `/api/clients/${this.$route.params.clientKey}/orders/`,
        params: { page: this.page }
      }
    }
  },
  data () {
    return {
      page: 1,
      code: '',
      client: null,
      icons: {
        faPlus,
        faArrowAltCircleLeft
      }
    }
  },
  computed: {
    isLoading () {
      return this.$chimera._orders.loading
    },
    clientKey () {
      return this.$route.params.clientKey
    },
    orders () {
      return this.$chimera._orders?.data?.data || []
    },
    pagination () {
      return this.$chimera._orders?.data?.meta || ({})
    }
  },
  methods: {
    handleSearch (code) {
      this.code = code

      this.$chimera._orders.fetch(true, {
        params: { code, page: 1 }
      })
    },
    onSearchClear () {
      this.code = ''

      this.$chimera._orders.fetch(true, {
        params: { code: '', page: 1 }
      })
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
        :client-id="clientKey"
        @client="client = $event"
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
        :orders="orders"
      />

      <AppPaginator
        class="mt-2"
        :page.sync="page"
        :pagination="pagination"
      />
    </div>
  </div>
</template>
