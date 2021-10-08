<script>
import ClientCard from '../partials/ClientCard'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import 'tippy.js/themes/light-border.css'

import ClientOrdersCard from './ClientOrdersCard'
import ClientOrdersHeader from './ClientOrdersHeader'

export default {
  components: {
    ClientCard,
    ClientOrdersCard,
    ClientOrdersHeader
  },
  chimera: {
    _orders () {
      return {
        url: `/api/clients/${this.$route.params.client}/orders/`,
        params: {
          page: this.page,
          code: this.code
        }
      }
    }
  },
  data () {
    return {
      page: 1,
      code: '',
      icons: {
        faPlus
      }
    }
  },
  computed: {
    clientId () {
      return this.$route.params.client
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
    },
    onSearchClear () {
      this.code = ''
    }
  }
}
</script>

<template>
  <div class="mt-5 row mx-auto">
    <div class="col-3">
      <ClientCard
        :client-id="clientId"
      />
    </div>

    <div class="col-9">
      <ClientOrdersHeader
        :code="code"
        @search="handleSearch"
        @clear-search="onSearchClear"
      />

      <ClientOrdersCard :orders="orders" />

      <AppPaginator
        class="mt-2"
        :page.sync="page"
        :pagination="pagination"
      />
    </div>
  </div>
</template>
