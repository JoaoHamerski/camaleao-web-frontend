<script>
import { faList, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { formatPhone } from '@/utils/formatters'

import ClientModalNew from '../partials/ClientModalNew'

export default {
  components: {
    ClientModalNew
  },
  metaInfo: {
    title: 'Clientes'
  },
  chimera: {
    _clients () {
      return {
        url: '/api/clients',
        params: {
          page: this.page
        }
      }
    }
  },
  data () {
    return {
      icons: {
        faList,
        faUserPlus
      },
      page: 1,
      form: {
        option: 'name',
        search: ''
      }
    }
  },
  computed: {
    clients () {
      return this.$chimera._clients?.data?.data || []
    },
    pagination () {
      return this.$chimera._clients?.data?.meta || ({})
    },
    isLoading () {
      return this.$chimera._clients.loading
    },
    headers () {
      return [
        { text: 'Nome', value: 'name' },
        { text: 'Telefone', value: 'phone' },
        { text: 'Cidade', value: 'city' }
      ]
    }
  },
  methods: {
    formatPhone,
    refresh () {
      this.$chimera._clients.reload()
    },
    handleSearch () {
      const { option, search } = this.form

      this.$chimera._clients.fetch(true, {
        params: { option, search, page: 1 }
      })
    },
    clearSearch () {
      this.$chimera._clients.reload()
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
        class="fw-bold"
        data-bs-toggle="modal"
        data-bs-target="#clientModalNew"
      >
        <FontAwesomeIcon
          fixed-width
          :icon="icons.faUserPlus"
        />
        Novo cliente
      </AppButton>
      <ClientModalNew @refresh="refresh" />

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
              :options="[
                {name: 'Nome', value: 'name'},
                {name: 'Cidade', value: 'city'},
                {name: 'Telefone', value: 'phone'}
              ]"
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
          :items="clients"
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
      class="mt-2"
      :pagination="pagination"
      :page.sync="page"
    />
  </div>
</template>
