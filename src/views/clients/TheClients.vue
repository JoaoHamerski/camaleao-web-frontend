<script>
import { faList } from '@fortawesome/free-solid-svg-icons'
import { maskPhone } from '@/utils/masks'

export default {
  metaInfo: {
    title: 'Clientes'
  },
  chimera: {
    clients: '/api/clients',
    params () { return { page: this.page } }
  },
  data () {
    return {
      maskPhone,
      faList,
      isLoading: false,
      clients: [],
      pagination: {},
      page: 2
    }
  },
  computed: {
    headers () {
      return [
        { value: 'name', text: 'Nome' },
        { value: 'phone', text: 'Telefone' },
        { value: 'city', text: 'Cidade' }
      ]
    }
  },
  methods: {
    paginate (page) {
      this.page = page
    }
  }
}
</script>

<template>
  <div class="col-10 mx-auto">
    <AppCard
      :has-body-padding="false"
      color="camaleao"
      class="mt-5"
    >
      <template #header>
        <h6 class="fw-bold mb-0">
          <FontAwesomeIcon
            :icon="faList"
            fixed-width
            class="me-1"
          />
          Lista de clientes
        </h6>
      </template>

      <template #body>
        <AppTable
          v-if="clients.length"
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

        <nav aria-label="...">
          <ul class="pagination">
            <li
              v-for="(link, index) in pagination.links"
              :key="index"
              class="page-item"
              :class="{
                'active': link.active,
                'disabled': link.url === null
              }"
            >
              <a
                class="page-link clickable"
                @click="paginate(link.label)"
              >{{ link.label }}</a>
            </li>
          </ul>
        </nav>
      </template>
    </AppCard>
  </div>
</template>
