<script>
import { faList, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { maskPhone } from '@/utils/masks'

export default {
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
      maskPhone,
      page: 2
    }
  },
  computed: {
    clients () {
      return this.$chimera._clients?.data?.data || []
    },
    pagination () {
      return this.$chimera._clients?.data?.meta || ({})
    },
    headers () {
      return [
        { value: 'name', text: 'Nome' },
        { value: 'phone', text: 'Telefone' },
        { value: 'city', text: 'Cidade' }
      ]
    }
  }
}
</script>

<template>
  <div class="col-10 mx-auto mt-5">
    <div class="d-flex justify-content-between">
      <AppButton class="fw-bold">
        <FontAwesomeIcon
          class="fa-fw mr-2"
          :icon="icons.faUserPlus"
        />
        Novo cliente
      </AppButton>

      <AppInput
        name="search"
        :default-margin="false"
        placeholder="Nome ou número..."
      >
        <template #prepend>
          <select
            class="form-select"
            aria-label="Opção de busca"
          >
            <option selected>
              Nome
            </option>
            <option value="1">
              Cidade
            </option>
            <option value="2">
              Telefone
            </option>
          </select>
        </template>
        <template #append>
          <AppButton outlined>
            Buscar
          </AppButton>
        </template>
      </AppInput>
    </div>

    <AppCard
      :has-body-padding="false"
      color="primary"
      class="mt-2"
    >
      <AppLoading v-if="$chimera._clients.loading" />
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
        >
          <template #[`items.city`]="{ item }">
            {{ $helpers.fallback(item.city, 'name') }}
          </template>

          <template #[`items.phone`]="{item}">
            {{ maskPhone(item.phone) }}
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
