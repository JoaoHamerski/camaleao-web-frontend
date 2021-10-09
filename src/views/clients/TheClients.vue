<script>
import { faList, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { formatPhone } from '@/utils/formatters'

import ClientModalNew from './ClientModalNew'

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
    redirectToClient (client) {
      this.$router.push({
        name: 'clients.show',
        params: { client: client.id }
      })
    },
    handleSearch () {
      const { option, search } = this.form

      this.$chimera._clients.fetch(true, {
        params: { option, search }
      })
    },
    clearSearch () {
      this.$chimera._clients.reload()
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
          class="fa-fw mr-2"
          :icon="icons.faUserPlus"
        />
        Novo cliente
      </AppButton>
      <ClientModalNew />

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
              :options="[
                { text: 'Nome', value: 'name' },
                { text: 'Cidade', value: 'city' },
                { text: 'Telefone', value: 'phone' },
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
          @click:item="redirectToClient"
        >
          <template #[`items.city`]="{ item }">
            {{ $helpers.fallback(item.city, 'name') }}
          </template>

          <template #[`items.phone`]="{ item }">
            {{ formatPhone(item.phone) }}
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
