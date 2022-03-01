<script>
import { faList, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { formatPhone } from '@/utils/formatters'

import ClientModalNew from '../partials/ClientModalNew'

import { clientsIndex } from '@/graphql/Client.gql'

const COLUMNS = {
  NAME: 'NAME',
  CITY: 'CITY',
  PHONE: 'PHONE'
}

export default {
  components: {
    ClientModalNew
  },
  metaInfo: {
    title: 'Clientes'
  },
  apollo: {
    clients: {
      query: clientsIndex,
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
      newClientModal: false,
      query: {
        page: 1,
        hasCity: null,
        where: null
      },
      clients: {
        data: []
      },
      icons: {
        faList,
        faUserPlus
      },
      form: {
        option: 'NAME',
        search: ''
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
        { text: 'Telefone', value: 'phone' },
        { text: 'Cidade', value: 'city' }
      ]
    },
    selectOptions () {
      return [
        { name: 'Nome', value: COLUMNS.NAME },
        { name: 'Cidade', value: COLUMNS.CITY },
        { name: 'Telefone', value: COLUMNS.PHONE }
      ]
    }
  },
  methods: {
    formatPhone,
    onNewClientClick () {
      this.newClientModal = true
    },
    onNewClientSuccess () {
      this.newClientModal = false
      this.refresh()
    },
    refresh () {
      this.$apollo.queries.clients.refetch()
    },
    getSearchByDDD () {
      const search = this.$helpers.stripNonDigits(this.form.search)

      return `${search}%`
    },
    getValueToSearch () {
      if (this.form.option === COLUMNS.PHONE) {
        if (this.form.search.startsWith('(')) {
          return this.getSearchByDDD()
        }
      }

      return `%${this.form.search}%`
    },
    handleSearch () {
      const value = this.getValueToSearch()
      const column = this.form.option === COLUMNS.CITY
        ? 'NAME'
        : this.form.option

      const options = {
        value,
        operator: 'LIKE',
        column
      }

      this.query.hasCity = this.form.option === COLUMNS.CITY ? options : null
      this.query.where = this.form.option !== COLUMNS.CITY ? options : null

      this.$apollo.queries.clients.refetch()
    },
    clearSearch () {
      this.form.search = ''
      this.query.hasCity = null
      this.query.where = null

      this.handleSearch()
    },
    redirectToClient (client) {
      this.$router.push({
        name: 'clients.show',
        params: { clientKey: client.id }
      })
    },
    clientUrl (client) {
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
  <div class="col-10 mx-auto mt-5">
    <div class="d-flex justify-content-between">
      <AppButton
        color="success"
        class="fw-bold"
        @click.prevent="onNewClientClick"
      >
        <FontAwesomeIcon
          fixed-width
          :icon="icons.faUserPlus"
        />
        Novo cliente
      </AppButton>

      <ClientModalNew
        v-model="newClientModal"
        @success="onNewClientSuccess"
      />

      <div class="col-5">
        <AppInput
          v-model="form.search"
          name="search"
          :default-margin="false"
          placeholder="Digite a busca..."
          @keypress.enter="handleSearch"
        >
          <template #prepend>
            <AppSimpleSelect
              v-model="form.option"
              remove-default-margin
              name="option"
              hide-default-option
              value-prop="value"
              label-prop="name"
              :options="selectOptions"
            />
          </template>

          <template #append>
            <AppButton
              outlined
              @click="handleSearch"
            >
              Buscar
            </AppButton>
          </template>
        </AppInput>
      </div>
    </div>

    <div
      v-show="form.search"
      class="text-end"
    >
      <span
        class="clickable link-primary small"
        @click="clearSearch"
      >
        Limpar busca
      </span>
    </div>

    <AppCard
      :is-loading="isLoading"
      :has-body-padding="false"
      color="primary"
      class="mt-2"
    >
      <template #header>
        <h6 class="fw-bold mb-0">
          <FontAwesomeIcon
            :icon="icons.faList"
            fixed-width
            class="me-1"
          />
          Clientes
        </h6>
      </template>

      <template #body>
        <AppTable
          :headers="headers"
          :items="clients.data"
          :row-url="clientUrl"
          @click:item="redirectToClient"
        >
          <template #[`items.city`]="{ item }">
            {{ $helpers.fallback(item.city, 'name') }}
          </template>

          <template #[`items.phone`]="{ item }">
            {{ $helpers.fallback(formatPhone(item.phone)) }}
          </template>
        </AppTable>
      </template>
    </AppCard>

    <AppPaginator
      v-model="query.page"
      class="mt-2"
      :is-loading="isLoading"
      :pagination="clients.paginatorInfo"
    />
  </div>
</template>
