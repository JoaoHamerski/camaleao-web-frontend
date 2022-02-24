<script>
import { clientsIndex } from '@/graphql/Client.gql'

export default {
  apollo: {
    clients: {
      query: clientsIndex,
      variables () {
        return {
          page: this.page,
          where: {
            column: 'CITY_ID',
            operator: 'EQ',
            value: this.city.id
          }
        }
      },
      skip () {
        return this.skipQuery
      }
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    city: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      page: 1,
      skipQuery: true,
      clients: {}
    }
  },
  computed: {
    isLoading () {
      return !!this.$apollo.queries.clients.loading
    },
    headers () {
      return [
        { text: 'Nome', value: 'name' },
        { text: 'Telefone', value: 'phone', format: 'phone' }
      ]
    }
  },
  methods: {
    onModalShow () {
      this.skipQuery = false
    },
    onModalHide () {
      this.skipQuery = true
    },
    getClientUrl (client) {
      const resolvedRoute = this.$router.resolve({
        name: 'clients.show',
        params: {
          clientKey: client.id
        }
      })

      return resolvedRoute.href
    }
  }
}
</script>

<template>
  <AppModal
    id="cityClientsModal"
    :value="value"
    v-on="$listeners"
    @show="onModalShow"
  >
    <template #title>
      Clientes de
      <template v-if="value">
        {{ city.name }} - {{ city.state.abbreviation }}
      </template>
    </template>

    <template #body>
      <AppLoading v-show="isLoading" />
      <AppTable
        :items="clients.data"
        :headers="headers"
      >
        <template #[`items.name`]="{ item }">
          <a
            target="_blank"
            :href="getClientUrl(item)"
            class="text-decoration-none"
          >{{ item.name }}</a>
        </template>
      </AppTable>
      <AppPaginator
        v-model="page"
        :pagination="clients.paginatorInfo"
      />

      <div class="mt-3">
        <AppButton
          data-bs-dismiss="modal"
          color="light"
          block
        >
          Fechar
        </AppButton>
      </div>
    </template>
  </AppModal>
</template>
