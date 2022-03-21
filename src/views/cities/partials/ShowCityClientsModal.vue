<script>
import { get } from 'lodash-es'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { GetClientsForCityModal } from '@/graphql/Resources.gql'
import { clients as clientsRoutes } from '@/constants/route-names'

export default {
  apollo: {
    clients: {
      query: GetClientsForCityModal,
      variables () {
        return {
          page: this.page,
          orderBy: [{
            column: 'NAME',
            order: 'ASC'
          }],
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
      clientsRoutes,
      clients: {},
      icons: {
        faUsers
      }
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
    get,
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
      <FontAwesomeIcon
        :icon="icons.faUsers"
        fixed-width
      />
      Clientes de
      <template v-if="value">
        {{ city.name }} - {{ get(city, 'state.abbreviation', 'N/A') }}
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
            :href="$helpers.getUrl(clientsRoutes.show, {client: item})"
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
